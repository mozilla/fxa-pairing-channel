/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

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


import { VERSION_TLS_1_2, VERSION_TLS_1_0 } from './constants.js';
import { BufferReader, BufferWriter, EMPTY } from './utils.js';
import { ALERT_DESCRIPTION, TLSError } from './alerts.js';
import {
  encrypt,
  decrypt,
  prepareKey,
  hkdfExpandLabel,
  AEAD_SIZE_INFLATION,
  IV_LENGTH,
  KEY_LENGTH,
} from './crypto.js';

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

// These are some helper classes to manage the encryption/decryption state
// for a particular key.

export class CipherState {
  constructor(key, iv) {
    this.key = key;
    this.iv = iv;
    this.seqnum = 0;
  }

  static async create(baseKey, mode) {
    // Derive key and iv per https://tools.ietf.org/html/rfc8446#section-7.3
    const key = await prepareKey(await hkdfExpandLabel(baseKey, 'key', EMPTY, KEY_LENGTH), mode);
    const iv = await hkdfExpandLabel(baseKey, 'iv', EMPTY, IV_LENGTH);
    return new this(key, iv);
  }

  nonce() {
    // Ref https://tools.ietf.org/html/rfc8446#section-5.3:
    // * left-pad the sequence number with zeros to IV_LENGTH
    // * xor with the provided iv
    // Our sequence numbers are always less than 2^24, so fit in a Uint32
    // in the last 4 bytes of the nonce.
    const nonce = this.iv.slice();
    const dv = new DataView(nonce.buffer, nonce.byteLength - 4, 4);
    dv.setUint32(0, dv.getUint32(0) ^ this.seqnum);
    this.seqnum += 1;
    if (this.seqnum > MAX_SEQUENCE_NUMBER) {
      throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
    }
    return nonce;
  }
}

export class EncryptionState extends CipherState {
  static async create(key) {
    return super.create(key, 'encrypt');
  }

  async encrypt(plaintext, additionalData) {
    return await encrypt(this.key, this.nonce(), plaintext, additionalData);
  }
}

export class DecryptionState extends CipherState {
  static async create(key) {
    return super.create(key, 'decrypt');
  }

  async decrypt(ciphertext, additionalData) {
    return await decrypt(this.key, this.nonce(), ciphertext, additionalData);
  }
}

// The main RecordLayer class.

export class RecordLayer {
  constructor(sendCallback) {
    this.sendCallback = sendCallback;
    this._sendEncryptState = null;
    this._sendError = null;
    this._recvDecryptState = null;
    this._recvError = null;
    this._pendingRecordType = 0;
    this._pendingRecordBuf = null;
  }

  async setSendKey(key) {
    await this.flush();
    this._sendEncryptState = await EncryptionState.create(key);
  }

  async setRecvKey(key) {
    this._recvDecryptState = await DecryptionState.create(key);
  }

  async setSendError(err) {
    this._sendError = err;
  }

  async setRecvError(err) {
    this._recvError = err;
  }

  async send(type, data) {
    if (this._sendError !== null) {
      throw this._sendError;
    }
    // Forbid sending data that doesn't fit into a single record.
    // We do not support fragmentation over multiple records.
    if (data.byteLength > MAX_RECORD_SIZE) {
      throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
    }
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
    // If there's nothing to flush, bail out early.
    // Don't throw `_sendError` if we're not sending anything, because `flush()`
    // can be called when we're trying to transition into an error state.
    const buf = this._pendingRecordBuf;
    let type = this._pendingRecordType;
    if (! type) {
      if (buf !== null) {
        throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
      }
      return;
    }
    if (this._sendError !== null) {
      throw this._sendError;
    }
    // If we're encrypting, turn the existing buffer contents into a `TLSInnerPlaintext` by
    // appending the type. We don't do any zero-padding, although the spec allows it.
    let inflation = 0, innerPlaintext = null;
    if (this._sendEncryptState !== null) {
      buf.writeUint8(type);
      innerPlaintext = buf.slice(RECORD_HEADER_SIZE);
      inflation = AEAD_SIZE_INFLATION;
      type = RECORD_TYPE.APPLICATION_DATA;
    }
    // Write the common header for either `TLSPlaintext` or `TLSCiphertext` record.
    const length = buf.tell() - RECORD_HEADER_SIZE + inflation;
    buf.seek(0);
    buf.writeUint8(type);
    buf.writeUint16(VERSION_TLS_1_2);
    buf.writeUint16(length);
    // Followed by different payload depending on encryption status.
    if (this._sendEncryptState !== null) {
      const additionalData = buf.slice(0, RECORD_HEADER_SIZE);
      const ciphertext = await this._sendEncryptState.encrypt(innerPlaintext, additionalData);
      buf.writeBytes(ciphertext);
    } else {
      buf.incr(length);
    }
    this._pendingRecordBuf = null;
    this._pendingRecordType = 0;
    await this.sendCallback(buf.flush());
  }

  async recv(data) {
    if (this._recvError !== null) {
      throw this._recvError;
    }
    // For simplicity, we assume that the given data contains exactly one record.
    // Peers using this library will send one record at a time over the websocket
    // connection, and we can assume that the server-side websocket bridge will split
    // up any traffic into individual records if we ever start interoperating with
    // peers using a different TLS implementation.
    // Similarly, we assume that handshake messages will not be fragmented across
    // multiple records. This should be trivially true for the PSK-only mode used
    // by this library, but we may want to relax it in future for interoperability
    // with e.g. large ClientHello messages that contain lots of different options.
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
    // The spec says legacy_record_version "MUST be ignored for all purposes",
    // but we know TLS1.3 implementations will only ever emit two possible values,
    // so it seems useful to bail out early if we receive anything else.
    const version = buf.readUint16();
    if (version !== VERSION_TLS_1_2) {
      // TLS1.0 is only acceptable on initial plaintext records.
      if (this._recvDecryptState !== null || version !== VERSION_TLS_1_0) {
        throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
      }
    }
    const length = buf.readUint16();
    let plaintext;
    if (this._recvDecryptState === null || type === RECORD_TYPE.CHANGE_CIPHER_SPEC) {
      [type, plaintext] = await this._readPlaintextRecord(type, length, buf);
    } else {
      [type, plaintext] = await this._readEncryptedRecord(type, length, buf);
    }
    // Sanity-check that we received exactly one record.
    if (buf.hasMoreBytes()) {
      throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
    }
    return [type, plaintext];
  }

  // Helper to read an unencrypted `TLSPlaintext` struct

  async _readPlaintextRecord(type, length, buf) {
    if (length > MAX_RECORD_SIZE) {
      throw new TLSError(ALERT_DESCRIPTION.RECORD_OVERFLOW);
    }
    return [type, buf.readBytes(length)];
  }

  // Helper to read an encrypted `TLSCiphertext` struct,
  // decrypting it into plaintext.

  async _readEncryptedRecord(type, length, buf) {
    if (length > MAX_ENCRYPTED_RECORD_SIZE) {
      throw new TLSError(ALERT_DESCRIPTION.RECORD_OVERFLOW);
    }
    // The outer type for encrypted records is always APPLICATION_DATA.
    if (type !== RECORD_TYPE.APPLICATION_DATA) {
      throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
    }
    // Decrypt and decode the contained `TLSInnerPlaintext` struct:
    //
    //    struct {
    //        opaque content[TLSPlaintext.length];
    //        ContentType type;
    //        uint8 zeros[length_of_padding];
    //    } TLSInnerPlaintext;
    //
    // The additional data for the decryption is the `TLSCiphertext` record
    // header, which is a fixed size and immediately prior to current buffer position.
    buf.incr(-RECORD_HEADER_SIZE);
    const additionalData = buf.readBytes(RECORD_HEADER_SIZE);
    const ciphertext = buf.readBytes(length);
    const paddedPlaintext = await this._recvDecryptState.decrypt(ciphertext, additionalData);
    // We have to scan backwards over the zero padding at the end of the struct
    // in order to find the non-zero `type` byte.
    let i;
    for (i = paddedPlaintext.byteLength - 1; i >= 0; i--) {
      if (paddedPlaintext[i] !== 0) {
        break;
      }
    }
    if (i < 0) {
      throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
    }
    type = paddedPlaintext[i];
    // `change_cipher_spec` records must always be plaintext.
    if (type === RECORD_TYPE.CHANGE_CIPHER_SPEC) {
      throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
    }
    return [type, paddedPlaintext.slice(0, i)];
  }
}
