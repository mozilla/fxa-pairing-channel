/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

//
// This file implements the "record layer" for TLS1.3, as defined in
// https://tools.ietf.org/html/rfc8446#section-5.
//
// The record layer is responsible for encrypting/decrypting bytes to be
// sent over the wire, including stateful management of sequence numbers
// for the incoming and outgoing stream.
//
// For simplicity, we assume that the application receives whole records
// from the peer and receives them one at a time, and likewise that is
// prepares and sends messages that fit in an individual record.  It would
// not be too complicated to add some buffering to deal with fragementation,
// but it's not needed for now.
//
// To read incoming data from the peer, use the `RecordReceiver` class
// like this:
//
//    receiver = new RecordReceiver()
//
//    // Specify the decryption key to use, if any.
//    receiver.setContentKey(key, iv)
//
//    // Decode/decrypt a record
//    [type, buf] = await receiver.recv(dataReceivedFromPeer)
//    switch (type) {
//      // Handle the received data based on its type tag.
//    }
//
// To prepare outgoing data to send to the peer, use the `RecordSender` class
// like this:
//
//    sender = new RecordSender()
//
//    // Specify the encryption key to use, if any.
//    receiver.setContentKey(key, iv)
//
//    // Write data into the pending record.
//    sender.withBufferWriter(TYPE_TAG, buf => {
//      buf.writeBytes('data here')
//    })
//
//    // You can concatenate several things in the buffer,
//    // as long as they belong to the same record type.
//    sender.withBufferWriter(TYPE_TAG, buf => {
//      buf.writeBytes('more data here')
//    })
//
//    // When ready to send, flush the pending record.
//    record = await sender.flush()
//    send_record_to_peer(record)
//

import {
  AEADEncrypt,
  AEADDecrypt,
  AEAD_SIZE_INFLATION,
} from './crypto.js';
import {
  assert,
  assertIsBytes,
  BufferReader,
  BufferWriter,
} from './utils.js';

/* eslint-disable sorting/sort-object-props */
const RECORD_TYPES = {
  21: 'ALERT',
  22: 'HANDSHAKE',
  23: 'APPLICATION_DATA',
};

export const RECORD_TYPE = {
  ALERT: 21,
  HANDSHAKE: 22,
  APPLICATION_DATA: 23,
};
/* eslint-enable sorting/sort-object-props */

const MAX_SEQUENCE_NUMBER = Math.pow(2, 32);
const MAX_RECORD_SIZE = Math.pow(2, 14);
const MAX_ENCRYPTED_RECORD_SIZE = MAX_RECORD_SIZE + 256;
const RECORD_HEADER_SIZE = 5;
const RECORD_BUFFER_SIZE = MAX_ENCRYPTED_RECORD_SIZE + RECORD_HEADER_SIZE;


export class RecordReceiver {
  constructor() {
    this.contentKey = null;
    this.contentIV = null;
    this.sequenceNumber = 0;
  }

  // Call this to set the encryption key, or to change
  // to a newly-derived key.  Any records read before calling
  // this method are treated as plaintext.

  setContentKey(key, iv) {
    assertIsBytes(key);
    assertIsBytes(iv);
    this.contentKey = key;
    this.contentIV = iv;
    this.sequenceNumber = 0;
  }

  // Call this method when a record is received from the peer.
  // It will decode and decrypt the record and return its contents
  // as a `[type, reader]` pair, where `type` is the record type tag
  // and `reader` is a `BufferReader` instance that can be used for
  // structured reading of the record contents.

  async recv(data) {
    const buf = new BufferReader(data);
    // The data to read is either a TLSPlaintext or TLSCiphertext struct,
    // depending on whether record protection has been enabled yet:
    //
    //    struct {
    //        ContentType type;
    //        ProtocolVersion legacy_record_version;
    //        uint16 length;
    //        opaque fragment[TLSPlaintext.length];
    //    } TLSPlaintext;
    //
    //    struct {
    //        ContentType opaque_type = application_data; /* 23 */
    //        ProtocolVersion legacy_record_version = 0x0303; /* TLS v1.2 */
    //        uint16 length;
    //        opaque encrypted_record[TLSCiphertext.length];
    //    } TLSCiphertext;
    //
    let type = buf.readUint8();
    assert(type in RECORD_TYPES, 'unrecognized record type');
    assert(buf.readUint16() === 0x0303, 'unexpected legacy_record_version');
    const length = buf.readUint16();
    let plaintext;
    if (this.contentKey === null) {
      // An unencrypted `TLSPlaintext` struct.
      assert(type !== RECORD_TYPE.APPLICATION_DATA, 'must encrypt application data');
      assert(length < MAX_RECORD_SIZE, 'record_overflow');
      plaintext = buf.readBytes(length);
    } else {
      // An encrypted `TLSCiphertext` struct.
      assert(length < MAX_ENCRYPTED_RECORD_SIZE, 'record_overflow');
      assert(type === RECORD_TYPE.APPLICATION_DATA, 'outer opaque_type should always be application data');
      // Decrypt and decode the contained `TLSInnerPlaintext` struct:
      //
      //    struct {
      //        opaque content[TLSPlaintext.length];
      //        ContentType type;
      //        uint8 zeros[length_of_padding];
      //    } TLSInnerPlaintext;
      //
      // The additional data for the decryption is the `TLSCiphertext` record
      // header that we just read over, which we know to be the previous `RECORD_HEADER_SIZE` bytes.
      const additionalData = buf.slice(-RECORD_HEADER_SIZE, RECORD_HEADER_SIZE);
      const ciphertext = buf.readBytes(length);
      const paddedPlaintext = await this._decrypt(ciphertext, additionalData);
      // We have to scan backwards over the zero padding at the end of the struct
      // in order to find the non-zero `type` byte.
      let i;
      for (i = paddedPlaintext.byteLength - 1; i >= 0; i--) {
        if (paddedPlaintext[i] !== 0) {
          break;
        }
      }
      assert(i >= 0, 'failed to find content-type byte in TLSInnerPlaintext');
      type = paddedPlaintext[i];
      plaintext = new Uint8Array(paddedPlaintext.buffer, paddedPlaintext.byteOffset, i);
    }
    assert(! buf.hasMoreBytes(), 'record contained trailing data');
    return [type, new BufferReader(plaintext)];
  }

  async _decrypt(ciphertext, additionalData) {
    const plaintext = await AEADDecrypt(this.contentKey, this.contentIV, this.sequenceNumber, ciphertext, additionalData);
    this.sequenceNumber += 1;
    assert(this.sequenceNumber < MAX_SEQUENCE_NUMBER, 'sequence number overflow');
    return plaintext;
  }
}

//
// This class is a simple fixed-sized buffer for accumulating outgoing messages,
// allowing multiple messages to be coalesced into a single record for the application
// to send.
//
// For simplicity we assume that the application will not try to accumulate
// more data than can fit in a single record, and so we can work with a fixed-size
// buffer. (But for safety, we'll throw a hard error if it does write too much
// data into the record).
//

export class RecordSender {
  constructor() {
    this.contentKey = null;
    this.contentIV = null;
    this.sequenceNumber = 0;
    this._pendingRecordType = 0;
    this._pendingRecordBuf = null;
  }

  // Call this to set the encryption key, or to change
  // to a newly-derived key.  Any records written before calling
  // this method will be transmitted as plaintext.

  setContentKey(key, iv) {
    assertIsBytes(key);
    assertIsBytes(iv);
    this.contentKey = key;
    this.contentIV = iv;
    this.sequenceNumber = 0;
  }

  // Call this method to obtain a `BufferWriter` that can be used to
  // add more data to the outgoing record.  The provided callback will
  // receive the `BufferWriter` as its only argument.
  // You must specify the intended record type in order to prevent mixing
  // different types in the one record.

  async withBufferWriter(type, cb) {
    if (this._pendingRecordBuf === null) {
      this._pendingRecordType = type;
      this._pendingRecordBuf = new BufferWriter(RECORD_BUFFER_SIZE);
      // Reserve space at the start of the buffer for the record header,
      // which is conveniently always a fixed size.
      this._pendingRecordBuf.seek(RECORD_HEADER_SIZE);
    } else {
      assert(this._pendingRecordType === type, 'different record type already in progress');
    }
    return await cb(this._pendingRecordBuf);
  }

  // When you're finished writing to the record via `withBufferWriter` above,
  // call `flush()` to produce an encrypted record to send to the peer.

  async flush() {
    const buf = this._pendingRecordBuf;
    const type = this._pendingRecordType;
    this._pendingRecordBuf = null;
    assert(type !== null, 'no messages written to buffer');
    let length = buf.tell() - RECORD_HEADER_SIZE;
    if (this.contentKey === null) {
      // Generate an unencrypted `TLSPlaintext` struct by just
      // filling in an appropriate record header.
      assert(type !== RECORD_TYPE.APPLICATION_DATA, 'must encrypt application data');
      buf.seek(0);
      buf.writeUint8(type);
      buf.writeUint16(0x0303);
      buf.writeUint16(length);
    } else {
      // Generate an encrypted `TLSCiphertext` struct.
      // First, turn the existing buffer contents into a `TLSInnerPlaintext` by
      // appending the type.  We don't do any zero-padding, although the spec allows it.
      buf.writeUint8(type);
      length += 1;
      // Write the record header, knowing that we will inflate the plaintext
      // by some fixed additional amount due to the encryption.
      buf.seek(0);
      buf.writeUint8(RECORD_TYPE.APPLICATION_DATA);
      buf.writeUint16(0x0303);
      buf.writeUint16(length + AEAD_SIZE_INFLATION);
      // The additional data for the encryption is the `TLSCiphertext` record
      // header that  we just wrote, which we know to be the previous `RECORD_HEADER_SIZE` bytes.
      const additionalData = buf.slice(-RECORD_HEADER_SIZE, RECORD_HEADER_SIZE);
      const ciphertext = await this._encrypt(buf.slice(0, length), additionalData);
      length += AEAD_SIZE_INFLATION;
      assert(ciphertext.byteLength === length, 'unexpected ciphertext length');
      buf.writeBytes(ciphertext);
    }
    buf.seek(0);
    return buf.slice(0, length + RECORD_HEADER_SIZE);
  }

  async _encrypt(plaintext, additionalData) {
    const ciphertext = await AEADEncrypt(this.contentKey, this.contentIV, this.sequenceNumber, plaintext, additionalData);
    this.sequenceNumber += 1;
    assert(this.sequenceNumber < MAX_SEQUENCE_NUMBER, 'sequence number overflow');
    return ciphertext;
  }
}
