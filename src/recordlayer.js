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
// The main interface is the RecordLayer class, which takes a callback function
// sending data and can be used like so:
//
//    rl = new RecordLayer(async function send_encrypted_data(data) {
//      // application-specific sending logic here.
//    });
//
//    // Records are sent and received in plaintext by default,
//    // until you specify the key to use.
//    await rl.setSendKey(key)
//
//    // Send some data by specifying the record type and the bytes.
//    // Where allowed by the record type, it will be buffered until
//    // explicitly flushed, and then sent by calling the callback.
//    await rl.send(RECORD_TYPE.HANDSHAKE, <bytes for a handshake message>)
//    await rl.send(RECORD_TYPE.HANDSHAKE, <bytes for another handshake message>)
//    await rl.flush()
//
//    // Separate keys are used for sending and receiving.
//    rl.setRecvKey(key);
//
//    // When data is received, push it into the RecordLayer
//    // and pass a callback that will be called with a [type, bytes]
//    // pair for each message parsed from the data.
//    rl.recv(dataReceivedFromPeer, async (type, bytes) => {
//      switch (type) {
//        case RECORD_TYPE.APPLICATION_DATA:
//          // do something with application data
//        case RECORD_TYPE.HANDSHAKE:
//          // do something with a handshake message
//        default:
//          // etc...
//      }
//    });
//


import { VERSION_TLS_1_2 } from './constants.js';
import {
  encrypt,
  decrypt,
  prepareKey,
  hkdfExpandLabel,
  AEAD_SIZE_INFLATION,
  IV_LENGTH,
  KEY_LENGTH,
} from './crypto.js';
import {
  assert,
  assertIsBytes,
  BufferReader,
  BufferWriter,
  bytesToHex,
  EMPTY,
} from './utils.js';

/* eslint-disable sorting/sort-object-props */
export const RECORD_TYPE = {
  CHANGE_CIPHER_SPEC: 20,
  ALERT: 21,
  HANDSHAKE: 22,
  APPLICATION_DATA: 23,
};
/* eslint-enable sorting/sort-object-props */

// Encrypting at most 2^24 records will force us to stay
// below data limits on AES-GCM encryption key use, and also
// means we can accurately represent the sequence number as
// a javascript double.
const MAX_SEQUENCE_NUMBER = Math.pow(2, 24);
const MAX_RECORD_SIZE = Math.pow(2, 14);
const MAX_ENCRYPTED_RECORD_SIZE = MAX_RECORD_SIZE + 256;
const RECORD_HEADER_SIZE = 5;

// This is a helper class to manage the encryption/decryption state
// for a particular key.

class CipherState {
  constructor() {
    this.key = null;
    this.iv = null;
    this.seqnum = 0;
  }

  async setKey(key, mode) {
    assertIsBytes(key);
    // Derive key and iv per https://tools.ietf.org/html/rfc8446#section-7.3
    this.key = await prepareKey(await hkdfExpandLabel(key, 'key', EMPTY, KEY_LENGTH), mode);
    this.iv = await hkdfExpandLabel(key, 'iv', EMPTY, IV_LENGTH);
    this.seqnum = 0;
  }

  nonce() {
    // Ref https://tools.ietf.org/html/rfc8446#section-5.3:
    // * left-pad the sequence number with zeros to IV_LENGTH
    // * xor with the provided iv
    const nonce = new Uint8Array(IV_LENGTH);
    // Our sequence numbers are always less than 2^24, so fit in a Uint32.
    (new DataView(nonce.buffer)).setUint32(IV_LENGTH - 4, this.seqnum);
    for (let i = 0; i < IV_LENGTH; i++) {
      nonce[i] ^= this.iv[i];
    }
    this.seqnum += 1;
    assert(this.seqnum < MAX_SEQUENCE_NUMBER, 'sequence number overflow');
    return nonce;
  }

  async encrypt(plaintext, additionalData) {
    return await encrypt(this.key, this.nonce(), plaintext, additionalData);
  }

  async decrypt(ciphertext, additionalData) {
    return await decrypt(this.key, this.nonce(), ciphertext, additionalData);
  }
}

// The main RecordLayer class.

export class RecordLayer {
  constructor(sendCallback) {
    this.sendCallback = sendCallback;
    this._sendCipherState = new CipherState();
    this._recvCipherState = new CipherState();
    this._pendingRecordType = 0;
    this._pendingRecordBuf = null;
  }

  async setSendKey(key) {
    // XXX TODO: flush any pending records.
    await this._sendCipherState.setKey(key, 'encrypt');
  }

  async setRecvKey(key) {
    // XXX TODO: check that we weren't part-way through reading a record.
    await this._recvCipherState.setKey(key, 'decrypt');
  }

  async send(type, data) {
    assertIsBytes(data);
    // Flush if we're switching to a different record type.
    if (this._pendingRecordType && this._pendingRecordType !== type) {
      await this.flush();
    }
    // Flush if we would overflow the max size of a record.
    if (this._pendingRecordBuf !== null) {
      if (this._pendingRecordBuf.tell() + data.byteLength > MAX_RECORD_SIZE) {
        await this.flush();
      }
    }
    // Forbid sending data that doesn't fit into a single record.
    // XXX TODO: implement fragmentation of data across multiple records.
    // This is not necessary for current use-cases, but it should at least fail cleanly.
    assert(data.byteLength < MAX_RECORD_SIZE, 'data too large to fit in a single record');
    // Start a new pending record if necessary.
    // We reserve space at the start of the buffer for the record header,
    // which is conveniently always a fixed size.
    if (this._pendingRecordBuf === null) {
      this._pendingRecordType = type;
      this._pendingRecordBuf = new BufferWriter();
      this._pendingRecordBuf.incr(RECORD_HEADER_SIZE);
    }
    this._pendingRecordBuf.writeBytes(data);
  }

  async flush() {
    const buf = this._pendingRecordBuf;
    const type = this._pendingRecordType;
    // If there's nothing to flush, bail out early.
    // Note that it *is* possible to send an empty record of type APPLICATION_DATA.
    if (! type) {
      return;
    }
    let length = buf.tell() - RECORD_HEADER_SIZE;
    if (this._sendCipherState.key === null) {
      // Generate an unencrypted `TLSPlaintext` struct by just
      // filling in an appropriate record header.
      assert(type !== RECORD_TYPE.APPLICATION_DATA, 'must encrypt application data');
      buf.seek(0);
      buf.writeUint8(type);
      buf.writeUint16(VERSION_TLS_1_2);
      buf.writeUint16(length);
      buf.incr(length);
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
      buf.writeUint16(VERSION_TLS_1_2);
      buf.writeUint16(length + AEAD_SIZE_INFLATION);
      // The additional data for the encryption is the `TLSCiphertext` record header
      // that  we just wrote, which we know to be the first `RECORD_HEADER_SIZE` bytes.
      const additionalData = buf.slice(0, RECORD_HEADER_SIZE);
      const ciphertext = await this._sendCipherState.encrypt(buf.slice(RECORD_HEADER_SIZE, RECORD_HEADER_SIZE + length), additionalData);
      length += AEAD_SIZE_INFLATION;
      assert(ciphertext.byteLength === length, 'unexpected ciphertext length');
      buf.writeBytes(ciphertext);
    }
    this._pendingRecordBuf = null;
    this._pendingRecordType = 0;
    await this.sendCallback(buf.slice());
  }

  async recv(data, messageCallback) {
    // The given data may contain multiple records concatenated together, but for the initial
    // version we will assume that:
    //  * it does not contain partial records
    //  * handshake messages are not fragmented across multiple records.
    // We can add the code to handle these cases, but it's fiddly and is not
    // necessary for our initial implementation since we never emit such data ourselves.
    // XXX TODO: record fragmentation, message fragmentation.
    const buf = new BufferReader(data);
    while (buf.hasMoreBytes()) {
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
      // The legacy_record_version "MUST be ignored for all purposes".
      buf.readUint16();
      const length = buf.readUint16();
      let plaintext;
      if (this._recvCipherState.key === null || type === RECORD_TYPE.CHANGE_CIPHER_SPEC) {
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
        const additionalData = buf.slice(buf.tell() - RECORD_HEADER_SIZE, buf.tell());
        const ciphertext = buf.readBytes(length);
        const paddedPlaintext = await this._recvCipherState.decrypt(ciphertext, additionalData);
        // We have to scan backwards over the zero padding at the end of the struct
        // in order to find the non-zero `type` byte.
        let i;
        for (i = paddedPlaintext.byteLength - 1; i >= 0; i--) {
          if (paddedPlaintext[i] !== 0) {
            break;
          }
        }
        assert(i >= 0, 'failed to find type byte in TLSInnerPlaintext');
        type = paddedPlaintext[i];
        assert(type !== RECORD_TYPE.CHANGE_CIPHER_SPEC, 'change_cipher_spec records must be plaintext');
        plaintext = paddedPlaintext.slice(0, i);
      }
      // Several handshake messages may be coalesced into a single record.
      // Parse them out and dispatch them individually.
      if (type !== RECORD_TYPE.HANDSHAKE) {
        await messageCallback(type, plaintext);
      } else {
        const mbuf = new BufferReader(plaintext);
        do {
          // Each handshake messages has a type and length prefix, per
          // https://tools.ietf.org/html/rfc8446#appendix-B.3
          // XXX TODO: This will get more complicated when we handle messages
          // fragmented across multiple records.
          mbuf.readUint8();
          const mlength = mbuf.readUint24();
          mbuf.incr(-4);
          await messageCallback(type, mbuf.readBytes(mlength + 4));
        } while (mbuf.hasMoreBytes());
      }
    }
  }
}
