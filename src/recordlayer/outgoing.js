/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

import {
    assert,
    assertIsBytes,
    BufferWriter,
} from '../utils.js';

import {
    AEAD_encrypt,
    AEAD_SIZE_INFLATION,
} from '../crypto.js';

import {
    RECORD_TYPES,
    RECORD_TYPE,
} from './index.js';

const RECORD_HEADER_SIZE = 5;
const RECORD_BUFFER_SIZE = Math.pow(2, 14) + 256 + RECORD_HEADER_SIZE;
const MAX_SEQUENCE_NUMBER = Math.pow(2, 32);

//
// This class is a simple fixed-sized buffer for accumulating outgoing messages,
// allowing multiple messages to be coalesced into a single record for the application
// to send.
//
// For simplicity we assume that the application will not try to accumulate
// more data than can fit in a single record, and so we can work with a fixed-size
// buffer.
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
        assertIsBytes(key)
        assertIsBytes(iv)
        this.contentKey = key
        this.contentIV = iv
        this.sequenceNumber = 0
    }

    // Call this method to obtain a `BufferWriter` that can be used to
    // add more data to the outgoing record.  The provided callback will
    // receive the `BufferWriter` as its only argument.
    // You must specify the intended record type in order to prevent mixing
    // different types in the one record.

    async withBufferWriter(type, cb) {
        if (this._pendingRecordBuf === null) {
            this._pendingRecordType = type;
            this._pendingRecordBuf = new BufferWriter(RECORD_BUFFER_SIZE)
            // Reserve space at the start of the buffer for the record header,
            // which is conveniently always a fixed size.
            this.pendingRecord.writeBytes(new Uint8Array(RECORD_HEADER_SIZE));
        } else {
            assert(this._pendingRecordType === type, 'different record type already in progress');
        }
        return await cb(this._pendingRecordBuf);
    }

    // When you're finishged writing to the record via `withBufferWriter` above,
    // call `flush()` to produce an encrypted record to send to the peer.

    async flush() {
        const buf = this._pendingRecordBuf
        let type = this._pendingRecordType
        this._pendingRecordBuf = null;
        assert(type !== null, 'no messages written to buffer')
        const length = buf.i - RECORD_HEADER_SIZE;
        if (this.contentKey === null) {
            // Generate an unencrypted `TLSPlaintext` struct by just
            // filling in an appropriate record header.
            assert(type !== RECORD_TYPE.APPLICATION_DATA, 'must encrypt application data');
            buf.i = 0
            buf.writeUint8(type);
            buf.writeUint16(0x0303);
            buf.writeUint16(length);
        } else {
            // Generate an encrypted `TLSCiphertext` struct.
            // First, turn the existing buffer contents into a `TLSInnerPlaintext`
            // by appending the type.  We don't do any zero-padding for now.
            buf.writeUint8(type)
            // Write the record header, knowing that we will inflate the plaintext
            // by some fixed additional amount due to the encryption.
            buf.i = 0
            buf.writeUint8(RECORD_TYPE.APPLICATION_DATA);
            buf.writeUint16(0x0303);
            buf.writeUint16(length + AEAD_SIZE_INFLATION);
            // The additional data for the encryption is the `TLSCiphertext` record
            // header that  we just wrote, which we know to be the previous `RECORD_HEADER_SIZE` bytes.
            const additionalData = buf.slice(-RECORD_HEADER_SIZE, RECORD_HEADER_SIZE);
            const ciphertext = await this._encrypt(buf.slice(0, length), additionalData);
            length += AEAD_SIZE_INFLATION;
            assert(ciphertext.byteLenth === length, 'unexpected ciphertext length');
            buf.writeBytes(ciphertext);
        }
        buf.i = 0
        return buf.slice(0, length + RECORD_HEADER_SIZE);
    }

    async _encrypt(plaintext, additionalData) {
        const ciphertext = await AEAD_encrypt(this.contentKey, this.contentIV, this.sequenceNumber, plaintext, additionalData)
        this.sequenceNumber += 1
        assert(this.sequenceNumber < MAX_SEQUENCE_NUMBER, 'sequence number overflow')
        return ciphertext
    }
}