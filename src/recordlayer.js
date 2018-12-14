/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

import {
    assert,
    assertIsBytes,
    bytesAreEqual,
    utf8ToBytes
} from './utils.js';

//
// This class provides structured reading of binary data received
// from the connected peer.  It's modelled as a kind of rolling buffer
// so we can accumulate multiple chunks of received data, but we assume
// that individual messages will not be split across chunks.
//
// If you imagine a much richer set of `readXYZ()` methods, this is
// not too far removed from the machinery we might use to parse real
// TLS1.3 messages.
//



export class IncomingRecordBuffer {
    constructor() {
        this.EMPTY = new Uint8Array(0)
        this.pending = []
        this.head = this.EMPTY
        this.i = 0
    }

    append(data) {
        assertIsBytes(data)
        if (this.head === this.EMPTY) {
            this.head = data
            this.i = 0
        } else {
            this.pending.push(data)
        }
    }

    hasMoreBytes() {
        if (this.head === this.EMPTY) {
            return false
        }
        return this.i < this.head.byteLength
    }

    _incr(length) {
        this.i += length
        assert(this.i <= this.head.byteLength, "should not have read past end of buffer")
        if (this.i == this.head.byteLength) {
            this.i = 0
            if (this.pending.length > 0) {
                this.head = this.pending.unshift()
            } else {
                this.head = this.EMPTY
            }
        }
    }

    readBytes(length) {
        let slice = new Uint8Array(this.head.buffer, this.head.byteOffset + this.i, length)
        this._incr(length)
        return slice
    }

    expectBytes(data) {
        const found = this.readBytes(data.byteLength)
        assert(bytesAreEqual(found, data), `unexpected data: ${found} !== ${data}`)
    }

    expectStr(data) {
        this.expectBytes(utf8ToBytes(data))
    }

    readUint16(n) {
        n = (this.head[this.i] << 8) | this.head[this.i + 1]
        this._incr(2)
        return n
    }
}

//
// This class is a simple fixed-sized buffer for accumulating outgoing messages,
// allowing multiple messages to be coalesced into a single chunk of data for
// the application to send.
//
// If you imagine a much richer set of `writeXYZ()` methods, this is
// not too far removed from the machinery we might use to write out real
// TLS1.3 messages.
//

export class OutgoingRecordBuffer {
    constructor(size = 65535) {
        this.i = 0
        this.size = size
        this.buf = new Uint8Array(size)
    }

    _incr(length) {
        this.i += length
        assert(this.i <= this.size, "do not write past end of buffer")
    }

    writeBytes(data) {
        assertIsBytes(data)
        this.buf.set(data, this.i)
        this._incr(data.byteLength)
    }

    writeStr(data) {
        this.writeBytes(utf8ToBytes(data))
    }

    writeUint16(n) {
        this.buf[this.i] = n >> 8
        this.buf[this.i + 1] = n & 0xFF
        this._incr(2)
    }

    finalize() {
        return new Uint8Array(this.buf.buffer, 0, this.i)
    }
}