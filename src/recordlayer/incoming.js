/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

import {
    assert,
    assertIsBytes,
    BufferReader,
} from '../utils.js';

import {
    AEAD_decrypt
} from '../crypto.js';

import {
    RECORD_TYPES,
    RECORD_TYPE,
} from './index.js';

const RECORD_HEADER_SIZE = 5;
const MAX_SEQUENCE_NUMBER = Math.pow(2, 32);

//
// This class provides structured reading of binary record data received
// from the connected peer.  It assumes that the application receives
// individual records, one at a time.
//


export class RecordReceiver {
    constructor() {
        this.contentKey = null
        this.contentIV = null
        this.sequenceNumber = 0
    }

    // Call this to set the encryption key, or to change
    // to a newly-derived key.  Any records read before calling
    // this method are assumed to be in plaintext.

    setContentKey(key, iv) {
        assertIsBytes(key)
        assertIsBytes(iv)
        this.contentKey = key
        this.contentIV = iv
        this.sequenceNumber = 0
    }

    // Call this method when a record is received from the peer.
    // It will decode and decrypt the record and return its contents
    // as a `[type, reader]` pair, where `type` is the record type tag
    // and `reader` is a `BufferReader` instance that can be used for
    // structured reading of the record contents.

    async recv(data) {
        console.log("RecordReceiver.recv", data);
        buf = new BufferReader(data);
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
        let type = buf.readUint8()
        assert(type in RECORD_TYPES, 'unrecognized record type');
        assert(buf.readUint16() === 0x0303, 'unexpected legacy_record_version');
        const length = buf.readUint16();
        let plaintext;
        if (this.contentKey === null) {
            // An unencrypted `TLSPlaintext` struct.
            assert(type !== RECORD_TYPE.APPLICATION_DATA, 'must encrypt application data');
            assert(length < Math.pow(2, 14), 'record_overflow');
            plaintext = buf.readBytes(length)
        } else {
            // An encrypted `TLSCiphertext` struct.
            assert(length < Math.pow(2, 14) + 256, 'record_overflow');
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
            const paddedPlaintext = await this._decrypt(buf.readBytes(length), additionalData);
            // We have to scan backwards over the zero padding at the end of the struct
            // in order to find the non-zero `type` byte.
            for (let i = paddedPlaintext.length; i >= 0; i--) {
                if (paddedPlaintext[i] !== 0) {
                    break;
                }
            }
            assert(i >= 0, 'failed to find content-type byte in TLSInnerPlaintext')
            type = paddedPlaintext[i];
            plaintext = new Uint8Array(paddedPlaintext.buffer, 0, i);
        }
        assert(! buf.hasMoreBytes(), 'did not read entire record contents');
        return [type, new BufferReader(plaintext)];
    }

    async _decrypt(ciphertext, additionalData) {
        const plaintext = await AEAD_decrypt(this.contentKey, this.contentIV, this.sequenceNumber, ciphertext, additionalData)
        this.sequenceNumber += 1
        assert(this.sequenceNumber < MAX_SEQUENCE_NUMBER, 'sequence number overflow')
        return plaintext
    }
}