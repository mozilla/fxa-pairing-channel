/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ALERT_DESCRIPTION, TLSError } from './alerts';

//
// Various low-level utility functions.
//
// These are mostly conveniences for working with Uint8Arrays as
// the primitive "bytes" type.
//

const UTF8_ENCODER = new TextEncoder();
const UTF8_DECODER = new TextDecoder();

export function noop() {}

export function assert(cond, msg) {
  if (! cond) {
    throw new Error('assert failed: ' + msg);
  }
}

export function assertIsBytes(value, msg = 'value must be a Uint8Array') {
  // Using `value instanceof Uint8Array` seems to fail in Firefox chrome code
  // for inscrutable reasons, so we do a less direct check.
  assert(ArrayBuffer.isView(value), msg);
  assert(value.BYTES_PER_ELEMENT === 1, msg);
  return value;
}

export const EMPTY = new Uint8Array(0);

export function zeros(n) {
  return new Uint8Array(n);
}

export function arrayToBytes(value) {
  return new Uint8Array(value);
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
  return UTF8_DECODER.decode(bytes);
}

export function utf8ToBytes(str) {
  return UTF8_ENCODER.encode(str);
}

export function bytesToBase64url(bytes) {
  // XXX TODO: try to use something constant-time, in case calling code
  // uses it to encode secrets?
  const charCodes = String.fromCharCode.apply(String, bytes);
  return btoa(charCodes).replace(/\+/g, '-').replace(/\//g, '_');
}

export function base64urlToBytes(str) {
  // XXX TODO: try to use something constant-time, in case calling code
  // uses it to decode secrets?
  str = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}

export function bytesAreEqual(v1, v2) {
  assertIsBytes(v1);
  assertIsBytes(v2);
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
    if (pos < 0) {
      throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
    }
    if (pos > this.length()) {
      throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
    }
    this._pos = pos;
  }

  incr(offset) {
    this.seek(this._pos + offset);
  }
}

// The `BufferReader` class helps you read structured data from a byte array.
// It offers methods for reading both primitive values, and the variable-length
// vector structures defined in https://tools.ietf.org/html/rfc8446#section-3.4.
//
// Such vectors are represented as a length followed by the concatenated
// bytes of each item, and the size of the length field is determined by
// the maximum allowed number of bytes in the vector.  For example
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
// The various `read` will throw `DECODE_ERROR` if you attempt to read path
// the end of the buffer, or past the end of a variable-length list.
//
export class BufferReader extends BufferWithPointer {

  hasMoreBytes() {
    return this.tell() < this.length();
  }

  readBytes(length) {
    // This avoids copies by returning a view onto the existing buffer.
    const start = this._buffer.byteOffset + this.tell();
    this.incr(length);
    return new Uint8Array(this._buffer.buffer, start, length);
  }

  _rangeErrorToAlert(cb) {
    try {
      return cb(this);
    } catch (err) {
      if (err instanceof RangeError) {
        throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
      }
      throw err;
    }
  }

  readUint8() {
    return this._rangeErrorToAlert(() => {
      const n = this._dataview.getUint8(this._pos);
      this.incr(1);
      return n;
    });
  }

  readUint16() {
    return this._rangeErrorToAlert(() => {
      const n = this._dataview.getUint16(this._pos);
      this.incr(2);
      return n;
    });
  }

  readUint24() {
    return this._rangeErrorToAlert(() => {
      let n = this._dataview.getUint16(this._pos);
      n = (n << 8) | this._dataview.getUint8(this._pos + 2);
      this.incr(3);
      return n;
    });
  }

  readUint32() {
    return this._rangeErrorToAlert(() => {
      const n = this._dataview.getUint32(this._pos);
      this.incr(4);
      return n;
    });
  }

  _readVector(length, cb) {
    const contentsBuf = new BufferReader(this.readBytes(length));
    const expectedEnd = this.tell();
    // Keep calling the callback until we've consumed the expected number of bytes.
    let n = 0;
    while (contentsBuf.hasMoreBytes()) {
      const prevPos = contentsBuf.tell();
      cb(contentsBuf, n);
      // Check that the callback made forward progress, otherwise we'll infinite loop.
      if (contentsBuf.tell() <= prevPos) {
        throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
      }
      n += 1;
    }
    // Check that the callback correctly consumed the vector's entire contents.
    if (this.tell() !== expectedEnd) {
      throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
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

  readVectorBytes8() {
    return this.readBytes(this.readUint8());
  }

  readVectorBytes16() {
    return this.readBytes(this.readUint16());
  }

  readVectorBytes24() {
    return this.readBytes(this.readUint24());
  }
}


export class BufferWriter extends BufferWithPointer {
  constructor(size = 1024) {
    super(new Uint8Array(size));
  }

  _maybeGrow(n) {
    const curSize = this._buffer.byteLength;
    const newPos = this._pos + n;
    const shortfall = newPos - curSize;
    if (shortfall > 0) {
      // Classic grow-by-doubling, up to 4kB max increment.
      // This formula was not arrived at by any particular science.
      const incr = Math.min(curSize, 4 * 1024);
      const newbuf = new Uint8Array(curSize + Math.ceil(shortfall / incr) * incr);
      newbuf.set(this._buffer, 0);
      this._buffer = newbuf;
      this._dataview = new DataView(newbuf.buffer, newbuf.byteOffset, newbuf.byteLength);
    }
  }

  slice(start = 0, end = this.tell()) {
    if (end < 0) {
      end = this.tell() + end;
    }
    if (start < 0) {
      throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
    }
    if (end < 0) {
      throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
    }
    if (end > this.length()) {
      throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
    }
    return this._buffer.slice(start, end);
  }

  flush() {
    const slice = this.slice();
    this.seek(0);
    return slice;
  }

  writeBytes(data) {
    this._maybeGrow(data.byteLength);
    this._buffer.set(data, this.tell());
    this.incr(data.byteLength);
  }

  writeUint8(n) {
    this._maybeGrow(1);
    this._dataview.setUint8(this._pos, n);
    this.incr(1);
  }

  writeUint16(n) {
    this._maybeGrow(2);
    this._dataview.setUint16(this._pos, n);
    this.incr(2);
  }

  writeUint24(n) {
    this._maybeGrow(3);
    this._dataview.setUint16(this._pos, n >> 8);
    this._dataview.setUint8(this._pos + 2, n & 0xFF);
    this.incr(3);
  }

  writeUint32(n) {
    this._maybeGrow(4);
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
    if (length >= maxLength) {
      throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
    }
    // Backfill the actual length field.
    this.seek(lengthPos);
    writeLength(length);
    this.incr(length);
    return length;
  }

  writeVector8(cb) {
    return this._writeVector(Math.pow(2, 8), len => this.writeUint8(len), cb);
  }

  writeVector16(cb) {
    return this._writeVector(Math.pow(2, 16), len => this.writeUint16(len), cb);
  }

  writeVector24(cb) {
    return this._writeVector(Math.pow(2, 24), len => this.writeUint24(len), cb);
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
}
