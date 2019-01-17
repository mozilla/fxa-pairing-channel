/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

//
// Various low-level utility functions.
//
// These are mostly conveniences for working with Uint8Arrays as
// the primitive "bytes" type.
//

export function noop() {}

export function assert(cond, msg) {
  if (! cond) {
    throw new Error('assert failed: ' + msg);
  }
}

export function assertIsBytes(value, msg = 'value must be a Uint8Array') {
  // XXX: Disabled until Gecko problems are resolved
  //assert(value instanceof Uint8Array, msg);
  return value;
}

export function bytesToHex(bytes) {
  return Array.prototype.map.call(bytes, byte => {
    let s = byte.toString(16);
    if (s.length === 1) {
      s = '0' + s;
    }
    return s;
  }).join('');
}

export function hexToBytes(hexstr) {
  assert(hexstr.length % 2 === 0, 'hexstr.length must be even');
  return new Uint8Array(Array.prototype.map.call(hexstr, (c, n) => {
    if (n % 2 === 1) {
      return hexstr[n - 1] + c;
    } else {
      return '';
    }
  }).filter(s => {
    return !! s;
  }).map(s => {
    return parseInt(s, 16);
  }));
}

export function bytesToUtf8(bytes) {
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(bytes);
}

export function utf8ToBytes(str) {
  const encoder = new TextEncoder('utf-8');
  return encoder.encode(str);
}

export function bytesAreEqual(v1, v2) {
  if (v1.length !== v2.length) {
    return false;
  }
  for (let i = 0; i < v1.length; i++) {
    if (v1[i] !== v2[i]) {
      return false;
    }
  }
  return true;
}

// The `BufferReader` and `BufferWriter` classes are helpers for dealing with the
// binary struct format that's used for various TLS message.  Think of them as a
// buffer with a pointer to the "current position" and a bunch of helper methods
// to read/write structured data and advance said pointer.

class BufferWithPointer {
  constructor(buf) {
    assertIsBytes(buf);
    this._buffer = buf;
    this._dataview = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    this._pos = 0;
  }

  length() {
    return this._buffer.byteLength;
  }

  tell() {
    return this._pos;
  }

  seek(pos) {
    this._pos = pos;
    assert(this._pos <= this.length(), 'do not seek past end of buffer');
  }

  incr(offset) {
    this.seek(this._pos + offset);
  }

  slice(offset, length) {
    const start = this._buffer.byteOffset + this._pos + offset;
    if (typeof length === 'undefined') {
      length = this.length() - this._pos;
    } else {
      assert(this._pos + length <= this.length(), 'do not slice past end of buffer');
    }
    return new Uint8Array(this._buffer.buffer, start, length);
  }
}


export class BufferReader extends BufferWithPointer {

  hasMoreBytes() {
    return this.tell() < this.length();
  }

  readBytes(length) {
    const slice = this.slice(0, length);
    this.incr(length);
    return slice;
  }

  readUint8() {
    const n = this._dataview.getUint8(this._pos);
    this.incr(1);
    return n;
  }

  readUint16() {
    const n = this._dataview.getUint16(this._pos);
    this.incr(2);
    return n;
  }

  readUint24() {
    let n = this._dataview.getUint16(this._pos);
    n = (n << 16) + this._dataview.getUint8(this._pos + 2);
    this.incr(3);
    return n;
  }

  readUint32() {
    const n = this._dataview.getUint32(this._pos);
    this.incr(4);
    return n;
  }

  //
  // These are helpers for reading the variable-length vector structure
  // defined in https://tools.ietf.org/html/rfc8446#section-3.4.
  //
  // Such vectors are represented as a length followed by the concatenated
  // bytes of each item, and the size of the length field is determined by
  // the maximum allowed size of the vector.  The size of the length field
  // is determined by the maximum number of bytes in the vecctor.  For example
  // to read a vector that may contain up to 65535 bytes, use `readVector16`.
  //
  // To read a variable-length vector of between 1 and 100 uint16 values,
  // defined in the RFC like this:
  //
  //    uint16 items<2..200>;
  //
  // You would do something like this:
  //
  //    const items = []
  //    buf.readVector8(buf => {
  //      items.push(buf.readUint16())
  //    })
  //

  _readVector(length, cb) {
    const limit = this.tell() + length;
    // Keep calling the callback until we've consumed the expected number of bytes.
    // It can return `true` to indicate we should stop iterating and skip the remainder.
    let n = 0;
    do {
      if (cb(this, length, n)) {
        break;
      }
      n += 1;
    } while (this.tell() < limit);
    if (this.tell() < limit) {
      this.seek(limit);
    } else {
      assert(this.tell() === limit, 'read past end of vector');
    }
  }

  readVector8(cb) {
    const length = this.readUint8();
    return this._readVector(length, cb);
  }

  readVector16(cb) {
    const length = this.readUint16();
    return this._readVector(length, cb);
  }

  readVector24(cb) {
    const length = this.readUint24();
    return this._readVector(length, cb);
  }

  readVector32(cb) {
    const length = this.readUint32();
    return this._readVector(length, cb);
  }

  // If you want to read a single length-prefixed struct rather than
  // a variable number of items, use these variants which will error out
  // if you fail to consume all the data on first read.

  readWithLengthPrefix24(cb) {
    let called = false;
    this.readVector24((...args) => {
      assert(! called, 'failed to read entire length-prefixed data');
      called = true;
      cb(...args);
    });
  }

  // If you just want to get the bytes from a variable-length vector
  // then you can use these shortcuts.

  readVectorBytes8() {
    let bytes;
    this.readVector8((buf, length) => {
      bytes = buf.readBytes(length);
    });
    return bytes;
  }

  readVectorBytes16() {
    let bytes;
    this.readVector16((buf, length) => {
      bytes = buf.readBytes(length);
    });
    return bytes;
  }

  readVectorBytes24() {
    let bytes;
    this.readVector24((buf, length) => {
      bytes = buf.readBytes(length);
    });
    return bytes;
  }

  readVectorBytes32() {
    let bytes;
    this.readVector32((buf, length) => {
      bytes = buf.readBytes(length);
    });
    return bytes;
  }
}


export class BufferWriter extends BufferWithPointer {
  constructor(size) {
    super(new Uint8Array(size));
  }

  writeBytes(data) {
    assertIsBytes(data);
    this._buffer.set(data, this.tell());
    this.incr(data.byteLength);
  }

  writeUint8(n) {
    this._dataview.setUint8(this._pos, n);
    this.incr(1);
  }

  writeUint16(n) {
    this._dataview.setUint16(this._pos, n);
    this.incr(2);
  }

  writeUint24(n) {
    this._dataview.setUint16(this._pos, n >> 8);
    this._dataview.setUint8(this._pos + 2, n & 0xFF);
    this.incr(3);
  }

  writeUint32(n) {
    this._dataview.setUint32(this._pos, n);
    this.incr(4);
  }

  // These are helpers for writing the variable-length vector structure
  // defined in https://tools.ietf.org/html/rfc8446#section-3.4.
  //
  // Such vectors are represented as a length followed by the concatenated
  // bytes of each item, and the size of the length field is determined by
  // the maximum allowed size of the vector.  For example to write a vector
  // that may contain up to 65535 bytes, use `writeVector16`.
  //
  // To write a variable-length vector of between 1 and 100 uint16 values,
  // defined in the RFC like this:
  //
  //    uint16 items<2..200>;
  //
  // You would do something like this:
  //
  //    buf.writeVector8(buf => {
  //      for (let item of items) {
  //          buf.writeUint16(item)
  //      }
  //    })
  //
  // The helper will automatically take care of writing the appropriate
  // length field once the callback completes.

  _writeVector(maxLength, writeLength, cb) {
    // Initially, write the length field as zero.
    const lengthPos = this.tell();
    writeLength(0);
    // Call the callback to write the vector items.
    const bodyPos = this.tell();
    cb(this);
    const length = this.tell() - bodyPos;
    assert(length <= maxLength, 'wrote too many bytes for vector');
    // Backfill the actual length field.
    this.seek(lengthPos);
    writeLength(length);
    this.incr(length);
    return length;
  }

  writeVector8(cb) {
    return this._writeVector(Math.pow(2, 8), this.writeUint8.bind(this), cb);
  }

  writeVector16(cb) {
    return this._writeVector(Math.pow(2, 16), this.writeUint16.bind(this), cb);
  }

  writeVector24(cb) {
    return this._writeVector(Math.pow(2, 24), this.writeUint24.bind(this), cb);
  }

  writeVector32(cb) {
    return this._writeVector(Math.pow(2, 32), this.writeUint32.bind(this), cb);
  }

  writeVectorBytes8(bytes) {
    return this.writeVector8(buf => {
      buf.writeBytes(bytes);
    });
  }

  writeVectorBytes16(bytes) {
    return this.writeVector16(buf => {
      buf.writeBytes(bytes);
    });
  }

  writeVectorBytes24(bytes) {
    return this.writeVector24(buf => {
      buf.writeBytes(bytes);
    });
  }

  writeVectorBytes32(bytes) {
    return this.writeVector32(buf => {
      buf.writeBytes(bytes);
    });
  }
}
