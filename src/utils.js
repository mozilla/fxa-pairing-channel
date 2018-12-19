/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

//
// Various low-level utility functions.
//
// These are mostly conveniences for working with Uint8Arrays as
// the primitive "bytes" type.
//

export function assert(cond, msg) {
    if (!cond) { throw new Error("assert failed: " + msg) }
}

export function assertIsBytes(value, msg='value must be a Uint8Array') {
    assert(value instanceof Uint8Array, msg)
    return value
}

export function bytesToHex(bytes) {
    return Array.prototype.map.call(bytes, byte => {
        let s = byte.toString(16)
        if (s.length === 1) {
            s = '0' + s
        }
        return s
    }).join('')
}

export function hexToBytes(hexstr) {
    assert(hexstr.length % 2 === 0, 'hexstr.length must be even')
    return new Uint8Array(Array.prototype.map.call(hexstr, (c, n) => {
        if (n % 2 === 1) {
            return hexstr[n - 1] + c
        } else {
            return ''
        }
    }).filter(s => {
        return !!s
    }).map(s => {
        return parseInt(s, 16)
    }))
}

export function bytesToUtf8(bytes) {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes)
}

export function utf8ToBytes(str) {
    const encoder = new TextEncoder('utf-8')
    return encoder.encode(str)
}

export function bytesAreEqual(v1, v2) {
    if (v1.length !== v2.length) {
        return false
    }
    for (let i = 0; i < v1.length; i++) {
        if (v1[i] !== v2[i]) {
            return false
        }
    }
    return true
}


// The `BufferReader` is a helper class to parse the binary struct format
// that's used for various TLS message.  Think of it as a buffer with a pointer
// to the "current position" and a bunch of helper methods to read structured
// data and advance said pointer.

export class BufferReader {
    constructor(buf) {
        assertIsBytes(buf)
        this.buf = buf
        this.i = 0
    }

    _incr(length) {
        this.i += length
        assert(this.i <= this.buf.byteLength, "should not have read past end of buffer")
    }

    hasMoreBytes() {
        return this.i < this.buf.byteLength;
    }

    clamp(length) {
        return new BufferReader(this.slice(0, length))
    }

    slice(offset, length) {
        const start = this.buf.byteOffset + this.i + offset;
        return new Uint8Array(this.buf.buffer, start, length);
    }

    readBytes(length) {
        let slice = this.slice(0, length);
        this._incr(length);
        return slice;
    }

    readUint8(n) {
        n = this.buf[this.i]
        this._incr(1)
        return n
    }

    readUint16(n) {
        n = (this.buf[this.i] << 8) | this.buf[this.i + 1]
        this._incr(2)
        return n
    }

    readUint24(n) {
        n = (this.buf[this.i] << 16) | (this.buf[this.i + 1] << 8) | this.buf[this.i + 2]
        this._incr(3)
        return n
    }
    
    readUint32(n) {
        n = (this.buf[this.i] << 24) | (this.buf[this.i + 1] << 16) | (this.buf[this.i + 2] << 24) | this.buf[this.i + 3]
        this._incr(4)
        return n
    }

    //
    // This is a helper for reading the variable-length vector structure
    // defined in https://tools.ietf.org/html/rfc8446#section-3.4.
    // Such vectors are represented as a length followed by the concatenated
    // bytes of each item, and the size of the length field is determined by
    // the maximum allowed size of the vector.
    //
    // To read a variable-length vector of between 1 and 100 uint16 values,
    // defined in the RFC like this:
    //
    //    uint16 items<2..200>;
    //
    // You would do something like this:
    //
    //    const items = []
    //    buf.readVectorItems(2, 200, buf => {
    //      items.push(buf.readUint16())
    //    })
    //

    readVectorItems(minBytes, maxBytes, cb) {
        let length;
        // XXX TODO: there's probably a better way to do this...
        if (maxBytes < Math.pow(2, 8)) {
            length = this.readUint8();
        } else if (maxBytes < Math.pow(2, 16)) {
            length = this.readUint16();
        } else if (maxBytes < Math.pow(2, 24)) {
            length = this.readUint24();
        } else {
            assert(maxBytes < Math.pow(2, 32), 'maxBytes too large');
            length = this.readUint32();
        }
        assert(length >= minBytes, 'vector contains too few items');
        const limit = this.i + length;
        // Keep calling the callback until we've consumed the expected number of bytes.
        // It can return `true` to indicate we should stop iterating.
        let n = 0;
        while (this.i < limit) {
            if(cb(this, n)) {
                break;
            }
            n += 1;
        }
        // Check that we didn't read too many bytes.
        if (this.i < limit) {
            this.i = limit;
        } else {
            assert(this.i <= limit, 'read past end of vector')
        }
    }

    readVectorBytes(minBytes, maxBytes) {
        let length;
        // XXX TODO: there's probably a better way to do this...
        if (maxBytes < Math.pow(2, 8)) {
            length = this.readUint8();
        } else if (maxBytes < Math.pow(2, 16)) {
            length = this.readUint16();
        } else if (maxBytes < Math.pow(2, 24)) {
            length = this.readUint24();
        } else {
            assert(maxBytes < Math.pow(2, 32), 'maxBytes too large');
            length = this.readUint32();
        }
        assert(length >= minBytes, 'vector contains too few bytes');
        return this.readBytes(length);
    }

    skipBytes(n) {
        this.readBytes(n)
    }

    skipVector(minBytes, maxBytes) {
        this.readVectorItems(minBytes, maxBytes, () => true)
    }
}


// The `BufferWriter` is a helper class to write out the binary struct format
// that's used for various TLS message.  Think of it as a buffer with a pointer
// to the "current position" and a bunch of helper methods to write structured
// data and advance said pointer.

export class BufferWriter {
    constructor(size) {
        this.size = size;
        this.buf = new Uint8Array(this.size)
        this.i = 0;
    }

    _incr(length) {
        this.i += length
        assert(this.i <= this.size, "do not write past end of buffer")
    }

    slice(offset, length) {
        const start = this.buf.byteOffset + this.i + offset;
        return new Uint8Array(this.buf.buffer, start, length);
    }

    writeBytes(data) {
        assertIsBytes(data)
        this.buf.set(data, this.i)
        this._incr(data.byteLength)
    }

    writeUint8(n) {
        this.buf[this.i] = n & 0xFF;
        this._incr(1);
    }

    writeUint16(n) {
        this.buf[this.i] = n >> 8;
        this.buf[this.i + 1] = n & 0xFF;
        this._incr(2);
    }

    writeUint24(n) {
        this.buf[this.i] = n >> 16;
        this.buf[this.i + 1] = n >> 8;
        this.buf[this.i + 2] = n & 0xFF;
        this._incr(3);
    }

    writeUint32(n) {
        this.buf[this.i] = n >> 24;
        this.buf[this.i + 1] = n >> 16;
        this.buf[this.i + 2] = n >> 8;
        this.buf[this.i + 3] = n & 0xFF;
        this._incr(4);
    }
    
    //
    // This is a helper for writing the variable-length vector structure
    // defined in https://tools.ietf.org/html/rfc8446#section-3.4.
    // Such vectors are represented as a length followed by the concatenated
    // bytes of each item, and the size of the length field is determined by
    // the maximum allowed size of the vector.
    //
    // To write a variable-length vector of between 1 and 100 uint16 values,
    // defined in the RFC like this:
    //
    //    uint16 items<2..200>;
    //
    // You would do something like this:
    //
    //    buf.writeVectorItems(2, 200, buf => {
    //      for (let item of items) {
    //          buf.writeUint16(item)
    //      }
    //    })
    //
    // The helper will automatically take care of writing the appropriate
    // length field once the callback completes.

    writeVectorItems(minBytes, maxBytes, cb) {
        let writeLength;
        if (maxBytes < Math.pow(2, 8)) {
            writeLength = this.writeUint8.bind(this);
        } else if (maxBytes < Math.pow(2, 16)) {
            writeLength = this.writeUint16.bind(this);
        } else if (maxBytes < Math.pow(2, 24)) {
            writeLength = this.writeUint24.bind(this);
        } else {
            assert(maxBytes < Math.pow(2, 32), 'maxBytes too large')
            writeLength = this.writeUint32.bind(this);
        }
        // Initially, write the length field as zero.
        const lengthPos = this.i;
        writeLength(0);
        // Call the callback to write the vector items.
        const startPos = this.i;
        cb(this)
        const length = this.i - startPos;
        assert(length >= minBytes, 'vector contains too few items');
        assert(length <= maxBytes, 'vector contains too many items');
        // Backfill the actual length field.
        this.i = lengthPos;
        writeLength(length);
        this.i = startPos + length;
    }

    writeVectorBytes(minBytes, maxBytes, value) {
        let writeLength;
        if (maxBytes < Math.pow(2, 8)) {
            writeLength = this.writeUint8.bind(this);
        } else if (maxBytes < Math.pow(2, 16)) {
            writeLength = this.writeUint16.bind(this);
        } else if (maxBytes < Math.pow(2, 24)) {
            writeLength = this.writeUint24.bind(this);
        } else {
            assert(maxBytes < Math.pow(2, 32), 'maxBytes too large')
            writeLength = this.writeUint32.bind(this);
        }
        assert(value.byteLength >= minBytes, 'vector contains too few bytes');
        assert(value.byteLength <= maxBytes, 'vector contains too many bytes');
        writeLength(value.byteLength);
        this.writeBytes(value)
    }

    async writeWithLengthPrefix(minBytes, maxBytes, cb) {
        let writeLength;
        if (maxBytes < Math.pow(2, 8)) {
            writeLength = this.writeUint8.bind(this);
        } else if (maxBytes < Math.pow(2, 16)) {
            writeLength = this.writeUint16.bind(this);
        } else if (maxBytes < Math.pow(2, 24)) {
            writeLength = this.writeUint24.bind(this);
        } else {
            assert(maxBytes < Math.pow(2, 32), 'maxBytes too large')
            writeLength = this.writeUint32.bind(this);
        }
        // Initially, write the length field as zero.
        const lengthPos = this.i;
        writeLength(0);
        // Call the callback to write the vector items.
        const startPos = this.i;
        await cb(this)
        const length = this.i - startPos;
        assert(length >= minBytes, 'wrote too few bytes');
        assert(length <= maxBytes, 'wrote too many bytes');
        // Backfill the actual length field.
        this.i = lengthPos;
        writeLength(length);
        this.i = startPos + length;
    }
}