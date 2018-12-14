/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

//
// Message parsing.
//
// Herein we need code for reading and writing the various Handshake
// messages involved in the protocol.
//
// For TLS1.3-proper, there's quite a bit of complexity in parsing
// each message type.  We're hoping it's manageable, but need to work
// through a lot of details.
//
// For now, we just send the raw data, prefixied with a length field
// and a simple ascii type indicator.  This forces the calling code to
// deal with binary bytes for the messages but avoids complicated
// parsing code for now.
//

import {
    assert,
    bytesAreEqual,
    bytesToUtf8
} from './utils.js';


export class ClientHello {
    static async read(buf, expectedPskID) {
        const len = buf.readUint16()
        buf.expectStr('CH')
        const foundPskID = buf.readBytes(len - 2)
        assert(bytesAreEqual(foundPskID, expectedPskID), 'unexpected pskID')
    }
    static async write(buf, pskID) {
        buf.writeUint16(pskID.byteLength + 2)
        buf.writeStr('CH')
        buf.writeBytes(pskID)
    }
}

export class ServerHello {
    static async read(buf, expectedPskId) {
        const len = buf.readUint16()
        buf.expectStr('SH')
        const foundPskID = buf.readBytes(len - 2)
        assert(bytesAreEqual(foundPskID, expectedPskId), 'unexpected pskID')
    }
    static async write(buf, pskID) {
        buf.writeUint16(pskID.byteLength + 2)
        buf.writeStr('SH')
        buf.writeBytes(pskID)
    }
}

export class Finished {
    static async read(buf) {
        assert(buf.readUint16() === 8, 'incorrect Finished length')
        buf.expectStr('FINISHED')
    }
    static async write(buf) {
        buf.writeUint16(8)
        buf.writeStr('FINISHED')
    }
}

export class ApplicationData {
    static async read(buf) {
        const len = buf.readUint16()
        buf.expectStr('AD')
        return buf.readBytes(len - 2)
    }
    static async write(buf, data) {
        buf.writeUint16(data.byteLength + 2)
        buf.writeStr('AD')
        buf.writeBytes(data)
    }
}