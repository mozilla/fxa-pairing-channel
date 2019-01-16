/*!
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * 
 * Bundle generated from https://github.com/mozilla/fxa-pairing-tls.git. Hash:f683649640c4bc3b464e, Chunkhash:322d7cb20dead4861fc0.
 * 
 */
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/utils.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



//
// Various low-level utility functions.
//
// These are mostly conveniences for working with Uint8Arrays as
// the primitive "bytes" type.
//

function noop() {}

function assert(cond, msg) {
  if (! cond) {
    throw new Error('assert failed: ' + msg);
  }
}

function assertIsBytes(value, msg = 'value must be a Uint8Array') {
  assert(value instanceof Uint8Array, msg);
  return value;
}

function assertIsString(value, msg = 'value must be a string') {
  assert(typeof value === 'string', msg);
  return value;
}

function bytesToHex(bytes) {
  return Array.prototype.map.call(bytes, byte => {
    let s = byte.toString(16);
    if (s.length === 1) {
      s = '0' + s;
    }
    return s;
  }).join('');
}

function hexToBytes(hexstr) {
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

function bytesToUtf8(bytes) {
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(bytes);
}

function utf8ToBytes(str) {
  const encoder = new TextEncoder('utf-8');
  return encoder.encode(str);
}

function bytesAreEqual(v1, v2) {
  if (v1.length !== v2.length) {
    return false;
  }
  let mismatch = false;
  for (let i = 0; i < v1.length; i++) {
    mismatch &= v1[i] !== v2[i]
  }
  return ! mismatch;
}

function zeros(n) {
  return new Uint8Array(n);
}

const EMPTY = new Uint8Array(0);

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

  resize(size) {
    assert(size > this.length(), 'cant resize BufferWithPointer to be smaller');
    const newbuf = new Uint8Array(size);
    newbuf.set(this._buffer.slice(0, this.tell()), 0);
    this._buffer = newbuf;
    this._dataview = new DataView(newbuf.buffer, newbuf.byteOffset, newbuf.byteLength);
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

  slice(start = 0, end = this.tell()) {
    return this._buffer.slice(start, end);
  }
}


class BufferReader extends BufferWithPointer {

  hasMoreBytes() {
    return this.tell() < this.length();
  }

  readBytes(length) {
    const slice = this.slice(this.tell(), this.tell() + length);
    this.incr(length);
    return slice;
  }

  readRemainingBytes() {
    return this.readBytes(this.length() - this.tell());
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
    n = (n << 8) | this._dataview.getUint8(this._pos + 2);
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


class BufferWriter extends BufferWithPointer {
  constructor(size = 1024) {
    super(new Uint8Array(size));
  }

  _maybeResize(n) {
    const newPos = this._pos + n;
    if (newPos > this.length()) {
      // Classic grow-by-doubling, up to 16kB max increment.
      let incr = Math.min(this._buffer.byteLength, 16 * 1024);
      incr = Math.max(incr, this.length() - newPos);
      this.resize(this.length() + incr);
    }
  }

  flush() {
    const length = this.tell();
    this.seek(0);
    return this.slice(0, length);
  }

  writeBytes(data) {
    assertIsBytes(data);
    this._maybeResize(data.byteLength);
    this._buffer.set(data, this.tell());
    this.incr(data.byteLength);
  }

  writeUint8(n) {
    this._maybeResize(1);
    this._dataview.setUint8(this._pos, n);
    this.incr(1);
  }

  writeUint16(n) {
    this._maybeResize(2);
    this._dataview.setUint16(this._pos, n);
    this.incr(2);
  }

  writeUint24(n) {
    this._maybeResize(3);
    this._dataview.setUint16(this._pos, n >> 8);
    this._dataview.setUint8(this._pos + 2, n & 0xFF);
    this.incr(3);
  }

  writeUint32(n) {
    this._maybeResize(4);
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

// CONCATENATED MODULE: ./src/crypto.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



//
// Low-level crypto primitives.
//
// This file implements the AEAD encrypt/decrypt and hashing routines
// for the TLS_AES_128_GCM_SHA256 ciphersuite.
//



const AEAD_SIZE_INFLATION = 16;
const KEY_LENGTH = 16;
const IV_LENGTH = 12;
const HASH_LENGTH = 32;

async function prepareKey(key, mode) {
  return window.crypto.subtle.importKey('raw', key, { name: 'AES-GCM' }, false, [mode]);
}

async function encrypt(key, iv, plaintext, additionalData) {
  const ciphertext = await window.crypto.subtle.encrypt({
    additionalData,
    iv,
    name: 'AES-GCM',
    tagLength: AEAD_SIZE_INFLATION * 8
  }, key, plaintext);
  assert(plaintext.byteLength + AEAD_SIZE_INFLATION === ciphertext.byteLength, 'incorrect AEAD_SIZE_INFLATION');
  return new Uint8Array(ciphertext);
}

async function decrypt(key, iv, ciphertext, additionalData) {
  const plaintext = await window.crypto.subtle.decrypt({
    additionalData,
    iv,
    name: 'AES-GCM',
    tagLength: AEAD_SIZE_INFLATION * 8
  }, key, ciphertext);
  assert(plaintext.byteLength + AEAD_SIZE_INFLATION === ciphertext.byteLength, 'incorrect AEAD_SIZE_INFLATION');
  return new Uint8Array(plaintext);
}

async function hash(message) {
  return new Uint8Array(await window.crypto.subtle.digest({ name: 'SHA-256' }, message));
}

async function hmac(keyBytes, message) {
  const key = await window.crypto.subtle.importKey('raw', keyBytes, {
    hash: { name: 'SHA-256' },
    name: 'HMAC',
  }, false, ['sign']);
  const sig = await window.crypto.subtle.sign({ name: 'HMAC' }, key, message);
  return new Uint8Array(sig);
}

async function hkdfExtract(salt, ikm) {
  // Ref https://tools.ietf.org/html/rfc5869#section-2.2
  return await hmac(salt, ikm);
}

async function hkdfExpand(prk, info, length) {
  // Ref https://tools.ietf.org/html/rfc5869#section-2.3
  const N = Math.ceil(length / HASH_LENGTH);
  assert(N < 255, 'too much key material requested from hkdfExpand');
  const input = new BufferWriter();
  const output = new BufferWriter();
  let T = new Uint8Array(0);
  for (let i = 1; i <= N; i++) {
    input.writeBytes(T);
    input.writeBytes(info);
    input.writeUint8(i);
    T = await hmac(prk, input.flush());
    output.writeBytes(T);
  }
  assert(output.tell() === N * HASH_LENGTH, 'hkdfExpand generated too much data');
  return output.slice(0, length);
}

async function hkdfExpandLabel(secret, label, context, length) {
  assertIsString(label);
  assertIsBytes(context);
  //  struct {
  //    uint16 length = Length;
  //    opaque label < 7..255 > = "tls13 " + Label;
  //    opaque context < 0..255 > = Context;
  //  } HkdfLabel;
  const hkdfLabel = new BufferWriter();
  hkdfLabel.writeUint16(length);
  hkdfLabel.writeVectorBytes8(utf8ToBytes('tls13 ' + label));
  hkdfLabel.writeVectorBytes8(context);
  return hkdfExpand(secret, hkdfLabel.flush(), length);
}

async function getRandomBytes(size) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return bytes;
}
// CONCATENATED MODULE: ./src/messages.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



//
// Message parsing.
//
// Herein we need code for reading and writing the various Handshake
// messages involved in the protocol.
//




/* eslint-disable sorting/sort-object-props */
const HANDSHAKE_TYPE = {
  CLIENT_HELLO: 1,
  SERVER_HELLO: 2,
  ENCRYPTED_EXTENSIONS: 8,
  FINISHED: 20,
};

const EXTENSION_TYPE = {
  PRE_SHARED_KEY: 41,
  SUPPORTED_VERSIONS: 43,
  PSK_KEY_EXCHANGE_MODES: 45,
};
/* eslint-enable sorting/sort-object-props */

const VERSION_TLS_1_2 = 0x0303;
const VERSION_TLS_1_3 = 0x0304;
const TLS_AES_128_GCM_SHA256 = 0x1301;
const PSK_MODE_KE = 0;

function readHandshakeMessage(buf) {
  // Each handshake messages has a type and length prefix, per
  // https://tools.ietf.org/html/rfc8446#appendix-B.3
  const type = buf.readUint8();
  const size = buf.readUint24();
  const expectedEnd = size + buf.tell();
  let msg;
  switch (type) {
    case HANDSHAKE_TYPE.CLIENT_HELLO:
      msg = messages_ClientHello._read(buf);
      break;
    case HANDSHAKE_TYPE.SERVER_HELLO:
      msg = messages_ServerHello._read(buf);
      break;
    case HANDSHAKE_TYPE.ENCRYPTED_EXTENSIONS:
      msg = messages_EncryptedExtensions._read(buf);
      break;
    case HANDSHAKE_TYPE.FINISHED:
      msg = messages_Finished._read(buf);
      break;
    default:
      assert(false, 'unexpected handshake message type');
  }
  assert(buf.tell() === expectedEnd, 'failed to consume entire message');
  return msg;
}

class messages_HandshakeMessage {
  
  get TYPE_TAG() {
    assert(false, 'not implemented');
  }

  static _read(buf) {
    assert(false, 'not implemented');
  }

  static _write(buf) {
    assert(false, 'not implemented');
  }

  render() {
    const buf = new BufferWriter();
    this.write(buf);
    return buf.flush();
  }

  write(buf) {
    // Each handshake messages has a type and length prefix, per
    // https://tools.ietf.org/html/rfc8446#appendix-B.3
    buf.writeUint8(this.TYPE_TAG);
    buf.writeVector24(buf => {
      this._write(buf);
    });
  }

  // A little helper for writing extension fields, which are formatted as:
  //
  //   struct {
  //     ExtensionType extension_type;
  //     opaque extension_data<0..2^16-1>;
  //   } Extension;
  //
  _writeExtension(buf, type, cb) {
    buf.writeUint16(type);
    buf.writeVector16(cb);
  }
}

// The ClientHello message:
//
// struct {
//   ProtocolVersion legacy_version = 0x0303;
//   Random random;
//   opaque legacy_session_id<0..32>;
//   CipherSuite cipher_suites<2..2^16-2>;
//   opaque legacy_compression_methods<1..2^8-1>;
//   Extension extensions<8..2^16-1>;
// } ClientHello;
//
// This requires few fancy parts for writing the PSK binder
// which we haven't quite figured out yet...

class messages_ClientHello extends messages_HandshakeMessage {

  constructor(random, sessionId, pskIds, pskBinders) {
    super();
    this.random = random;
    this.sessionId = sessionId;
    this.pskIds = pskIds;
    this.pskBinders = pskBinders;
    assert(random.byteLength === 32, 'random must be 32 bytes');
    assert(pskIds.length === pskBinders.length, 'incorrect number of psk binders');
  }

  get TYPE_TAG() {
    return HANDSHAKE_TYPE.CLIENT_HELLO;
  }

  static _read(buf) {
    // Fixed value for legacy_version.
    assert(buf.readUint16() === VERSION_TLS_1_2, 'unexpected legacy_version');
    // The random bytes provided by the peer.
    const random = buf.readBytes(32);
    // Read legacy_session_id so the server can echo it.
    const sessionId = buf.readVectorBytes8();
    // We only support a single ciphersuite, but the peer may offer several.
    // Scan the list to confirm that the one we want is present.
    let found = false;
    buf.readVector16(buf => {
      const cipherSuite = buf.readUint16();
      if (cipherSuite === TLS_AES_128_GCM_SHA256) {
        found = true;
        return true;
      }
    });
    assert(found, 'peer did not offer correct ciphersuite');
    // Skip over legacy_compression_methods.
    buf.readVectorBytes8();
    // The only extensions we're interested in are "supported versions", "PSK" and "PSK mode",
    // but we may have to skip over arbitrarily many other extensions to find them.
    // THe PSK extension is always the last one.
    const pskIds = [], pskBinders = [];
    buf.readVector16(buf => {
      // Each extension is formatted as:
      //   struct {
      //     ExtensionType extension_type;
      //     opaque extension_data<0..2^16-1>;
      //   } Extension;
      const extType = buf.readUint16();
      // XXX TODO: error out if duplicate extension received?
      buf.readVector16(buf => {
        found = false;
        switch (extType) {
          case EXTENSION_TYPE.SUPPORTED_VERSIONS:
            // https://tools.ietf.org/html/rfc8446#section-4.2.1
            // It's a vector of uint16 and we expect to find TLS1.3.
            buf.readVector8(buf => {
              if (buf.readUint16() === VERSION_TLS_1_3) {
                found = true;
                return true;
              }
            });
            assert(found, 'client claims not to support TLS1.3');
            break;
          case EXTENSION_TYPE.PSK_KEY_EXCHANGE_MODES:
            // https://tools.ietf.org/html/rfc8446#section-4.2.9
            // We only accept "psk_ke", for PSK-only key establishment.
            buf.readVector8(buf => {
              if (buf.readUint8() === PSK_MODE_KE) {
                found = true;
                return true;
              }
            });
            assert(found, 'client claims not to support PSK_MODE_KE');
            break;
          case EXTENSION_TYPE.PRE_SHARED_KEY:
            // https://tools.ietf.org/html/rfc8446#section-4.2.11
            // The extension data contains an `OfferredPsks` struct:
            //  struct {
            //    opaque identity<1..2^16-1>;
            //    uint32 obfuscated_ticket_age;
            //  } PskIdentity;
            //  opaque PskBinderEntry<32..255>;
            //  struct {
            //    PskIdentity identities<7..2^16-1>;
            //    PskBinderEntry binders<33..2^16-1>;
            //  } OfferedPsks;
            buf.readVector16((buf, _ , n) => {
              const identity = buf.readVectorBytes16();
              buf.readBytes(4); // Skip over the ticket age.
              pskIds.push(identity);
            });
            buf.readVector16((buf, _, n) => {
              const binder = buf.readVectorBytes8();
              assert(binder.byteLength >= 32, 'psk binder too short');
              pskBinders.push(binder);
            });
            // PRE_SHARED_KEY must be the last extension in the ClientHello
            // (because any data after this point is not included in the PSK binder transcript hash).
            assert(! buf.hasMoreBytes(), 'trailing data after PRE_SHARED_KEY extension');
            break;
          default:
            // Ignore all other extensions
            // XXX TODO: are there any that should cause us to error out?
            return true;
        }
      });
    });
    return new this(random, sessionId, pskIds, pskBinders);
  }

  _write(buf) {
    buf.writeUint16(VERSION_TLS_1_2);
    buf.writeBytes(this.random);
    buf.writeVectorBytes8(this.sessionId);
    // Our single supported ciphersuite
    buf.writeVector16(buf => {
      buf.writeUint16(TLS_AES_128_GCM_SHA256);
    });
    // A single zero byte for legacy_compression_methods
    buf.writeVectorBytes8(new Uint8Array(1));
    // Vector of extensions
    buf.writeVector16(buf => {
      // The required "supported_versions" extension, listing only TLS1.3
      this._writeExtension(buf, EXTENSION_TYPE.SUPPORTED_VERSIONS, buf => {
        buf.writeVector8(buf => {
          buf.writeUint16(VERSION_TLS_1_3);
        });
      });
      // Our single supported PSK mode.
      this._writeExtension(buf, EXTENSION_TYPE.PSK_KEY_EXCHANGE_MODES, buf => {
        buf.writeVector8(buf => {
          buf.writeUint8(PSK_MODE_KE);
        });
      });
      // The offered PSKs.
      this._writeExtension(buf, EXTENSION_TYPE.PRE_SHARED_KEY, buf => {
        // A vector with the offered PSK ids.
        buf.writeVector16(buf => {
          this.pskIds.forEach(pskId => {
            buf.writeVectorBytes16(pskId);
            buf.writeUint32(0); // Zero for "tag age" field.
          });
        });
        // A vector with the corresponding PSK binders.
        // We can't actually know them yet, but we can write space for them...
        buf.writeVector16(buf => {
          this.pskBinders.forEach(pskBinder => {
            buf.writeVectorBytes8(pskBinder);
          });
        });
      });
    });
  }
}


// The ServerHello message:
//
//  struct {
//      ProtocolVersion legacy_version = 0x0303;    /* TLS v1.2 */
//      Random random;
//      opaque legacy_session_id_echo<0..32>;
//      CipherSuite cipher_suite;
//      uint8 legacy_compression_method = 0;
//      Extension extensions < 6..2 ^ 16 - 1 >;
//  } ServerHello;

class messages_ServerHello extends messages_HandshakeMessage {

  constructor(random, sessionId, pskIndex) {
    super();
    this.random = random;
    this.sessionId = sessionId;
    this.pskIndex = pskIndex;
    assert(random.byteLength === 32, 'random must be 32 bytes');
  }

  get TYPE_TAG() {
    return HANDSHAKE_TYPE.SERVER_HELLO;
  }

  static _read(buf) {
    // Fixed value for legacy_version.
    assert(buf.readUint16() === VERSION_TLS_1_2, 'unexpected legacy_version');
    // Random bytes from the server.
    const random = buf.readBytes(32);
    // It should have echoed our vector for legacy_session_id.
    const sessionId = buf.readVectorBytes8();
    // It should have selected our single offered ciphersuite.
    const foundCipherSuite = buf.readUint16();
    assert(foundCipherSuite === TLS_AES_128_GCM_SHA256, 'illegal_parameter ciphersuite');
    // legacy_compression_methods must be zero.
    assert(buf.readUint8() === 0, 'unexpected legacy_compression_methods');
    // The only extensions we should receive back are the mandatory "supported_versions",
    /// and "pre_shared_key" to confirm that the server selected our offered PSK.
    let pskIndex = false;
    buf.readVector16(buf => {
      // Each extension is formatted as:
      //   struct {
      //     ExtensionType extension_type;
      //     opaque extension_data<0..2^16-1>;
      //   } Extension;
      const extType = buf.readUint16();
      // XXX TODO: error out if duplicate extension received?
      buf.readVector16(buf => {
        switch (extType) {
          case EXTENSION_TYPE.SUPPORTED_VERSIONS:
            // https://tools.ietf.org/html/rfc8446#section-4.2.1
            // We expect it to report back TLS1.3.
            assert(buf.readUint16() === VERSION_TLS_1_3, 'server does not support TLS1.3');
            break;
          case EXTENSION_TYPE.PRE_SHARED_KEY:
            // https://tools.ietf.org/html/rfc8446#section-4.2.11
            // The server sends back the index of the selected PSK.
            pskIndex = buf.readUint16();
            break;
          default:
            // There should be no other extensions.
            assert(false, 'unexpected extension in ServerHello');
        }
      });
    });
    assert(pskIndex !== false, 'server did not select a PSK');
    return new this(random, sessionId, pskIndex);
  }

  _write(buf) {
    buf.writeUint16(VERSION_TLS_1_2);
    buf.writeBytes(this.random);
    buf.writeVectorBytes8(this.sessionId);
    // Our single supported ciphersuite
    buf.writeUint16(TLS_AES_128_GCM_SHA256);
    // A single zero byte for legacy_compression_method
    buf.writeUint8(0);
    // Vector of extensions
    buf.writeVector16(buf => {
      // The mandatory protocol-version specifier.
      this._writeExtension(buf,EXTENSION_TYPE.SUPPORTED_VERSIONS, buf => {
        buf.writeUint16(VERSION_TLS_1_3);
      });
      // The PSK that we selected.
      this._writeExtension(buf, EXTENSION_TYPE.PRE_SHARED_KEY, buf => {
        buf.writeUint16(this.pskIndex);
      });
    });
  }
}


// The EncryptedExtensions message:
//
//  struct {
//    Extension extensions < 0..2 ^ 16 - 1 >;
//  } EncryptedExtensions;
//
// We don't actually send any EncryptedExtensions,
// but still have to send an empty message.

class messages_EncryptedExtensions extends messages_HandshakeMessage {

  get TYPE_TAG() {
    return HANDSHAKE_TYPE.ENCRYPTED_EXTENSIONS;
  }

  static _read(buf) {
    // We should not receive any encrypted extensions,
    // since we do not advertize any in the ClientHello.
    buf.readVector16((buf, length) => {
      assert(length === 0, 'unexpected encrypted extension');
    });
    return new this();
  }

  _write(buf) {
    // Empty vector of extensions
    buf.writeVector16(buf => {});
  }
}


// The Finished message:
//
// struct {
//   opaque verify_data[Hash.length];
// } Finished;

class messages_Finished extends messages_HandshakeMessage {

  constructor(verifyData) {
    super();
    this.verifyData = verifyData;
    assert(verifyData.byteLength === HASH_LENGTH, 'incorrect length of verifyData');
  }

  get TYPE_TAG() {
    return HANDSHAKE_TYPE.FINISHED;
  }

  static _read(buf) {
    const verifyData = buf.readBytes(HASH_LENGTH);
    return new this(verifyData);
  }

  _write(buf) {
    buf.writeBytes(this.verifyData);
  }
}

// CONCATENATED MODULE: ./src/states.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */







// The length of the data for PSK binders at the end of the ClientHello.
// We only support a single PSK, so it's the length of the hash plus one
// for rendering it as a variable-length byte array, plus two for rendering
// the variable-length list of PSK binders.
const PSK_BINDERS_SIZE = HASH_LENGTH + 1 + 2;

//
// State-machine for TLS Handshake Management.
//
// Internally, we manage the TLS connection by explicitly modelling the
// client and server state-machines from RFC8446.  You can think of
// these `State` objects as little plugins for the `Connection` class
// that provide different behaviours of `send` and `receive` depending
// on the state of the connection.
//

class states_State {

  constructor(conn) {
    this.conn = conn;
  }

  async initialize() {
    // By default, nothing to do when entering the state.
  }

  async sendApplicationData(bytes) {
    // By default, assume we're not ready to send yet
    // and just let the data queue up for a future state.
    // XXX TODO: should this block until it's successfuly sent?
    this.conn._sendBuffer.writeBytes(bytes);
  }

  async recvApplicationData(bytes) {
    assert(false, 'not ready to receive application data');
  }

  async recvHandshakeMessage(msg) {
    assert(false, 'not expecting to receive a handhake message');
  }

  async close() {
    // XXX TODO: implement explicit close, including the `close_notify` alert message.
    assert(false, 'close() not implemented yet');
  }

}

// A special "guard" state to prevent us from using
// an improperly-initialized Connection.

class states_UNINITIALIZED extends states_State {
  async initialize() {
    assert(false, 'uninitialized state');
  }
  async sendApplicationData(bytes) {
    assert(false, 'uninitialized state');
  }
  async recvApplicationData(bytes) {
    assert(false, 'uninitialized state');
  }
  async recvHandshakeMessage(msg) {
    assert(false, 'uninitialized state');
  }
  async close() {
    assert(false, 'uninitialized state');
  }
}

// A special "error" state for when something goes wrong.
// This state never transitions to another state, effectively
// terminating the connection.

class ERROR extends states_State {
  async initialize(err) {
    this.error = err;
  }
  async sendApplicationData(bytes) {
    throw this.error;
  }
  async recvApplicationData(bytes) {
    throw this.error;
  }
  async recvHandshakeMessage(msg) {
    throw this.error;
  }
  async close() {
    throw this.error;
  }
}

// The "connected" state, for when the handshake is complete
// and we're ready to send application-level data.
// The logic for this is symmetric between client and server.

class CONNECTED extends states_State {
  async initialize() {
    // We can now send any application data that was
    // submitted before the handshake was complete.
    if (this.conn._sendBuffer.tell() > 0) {
      await this.sendApplicationData(this.conn._sendBuffer.flush());
    }
  }
  async sendApplicationData(bytes) {
    await this.conn._sendApplicationData(bytes);
    await this.conn._flushOutgoingRecord();
  }
  async recvApplicationData(bytes) {
    this.conn._recvBuffer.writeBytes(bytes);
  }
}

// These states implement (part of) the client state-machine from
// https://tools.ietf.org/html/rfc8446#appendix-A.1
//
// Since we're only implementing a small subset of TLS1.3,
// we only need a small subset of the handshake.  It basically goes:
//
//   * send ClientHello
//   * receive ServerHello
//   * receive EncryptedExtensions
//   * receive server Finished
//   * send client Finished
//
// We include some unused states for completeness, so that it's easier
// to check the implementation against the diagrams in the RFC.

class states_CLIENT_START extends states_State {
  async initialize() {
    const keyschedule = this.conn._keyschedule;
    await keyschedule.addPSK(this.conn.psk);
    // Construct a ClientHello message with our single PSK.
    // We can't know the PSK binder value yet, so we initially write zeros.
    const clientHello = new messages_ClientHello(
      this.conn.randomSalt,
      new Uint8Array(0),
      [this.conn.pskId],
      [new Uint8Array(HASH_LENGTH)],
    );
    const buf = new BufferWriter();
    clientHello.write(buf);
    // Now that we know what the ClientHello looks like,
    // go back and calculate the appropriate PSK binder value.
    const truncatedTranscript = buf.slice(0, -PSK_BINDERS_SIZE);
    clientHello.pskBinders[0] = await keyschedule.calculateFinishedMAC(keyschedule.extBinderKey, truncatedTranscript);
    buf.incr(-HASH_LENGTH);
    buf.writeBytes(clientHello.pskBinders[0]);
    await this.conn._sendHandshakeMessage(buf.flush());
    await this.conn._flushOutgoingRecord();
    await this.conn._transition(states_CLIENT_WAIT_SH, clientHello);
  }
}

class states_CLIENT_WAIT_SH extends states_State {
  async initialize(clientHello) {
    this._clientHello = clientHello;
  }
  async recvHandshakeMessage(msg) {
    assert(msg instanceof messages_ServerHello, 'expected ServerHello');
    assert(bytesAreEqual(msg.sessionId, this._clientHello.sessionId), 'server did not echo our sessionId');
    assert(msg.pskIndex === 0, 'server did not select our offered PSK');
    await this.conn._keyschedule.addECDHE(null);
    await this.conn._setSendKey(this.conn._keyschedule.clientHandshakeTrafficSecret);
    await this.conn._setRecvKey(this.conn._keyschedule.serverHandshakeTrafficSecret);
    await this.conn._transition(states_CLIENT_WAIT_EE);
  }
}

class states_CLIENT_WAIT_EE extends states_State {
  async recvHandshakeMessage(msg) {
    // We don't make use of any encrypted extensions, but we still
    // have to wait for the server to send the (empty) list of them.
    assert(msg instanceof messages_EncryptedExtensions, 'expected EncryptedExtensions');
    const keyschedule = this.conn._keyschedule;
    const expectedServerFinishedMAC = await keyschedule.calculateFinishedMAC(keyschedule.serverHandshakeTrafficSecret);
    await this.conn._transition(states_CLIENT_WAIT_FINISHED, expectedServerFinishedMAC);
  }
}

class states_CLIENT_WAIT_FINISHED extends states_State {
  async initialize(expectedServerFinishedMAC) {
    this._expectedServerFinishedMAC = expectedServerFinishedMAC;
  }
  async recvHandshakeMessage(msg) {
    assert(msg instanceof messages_Finished, 'expected Finished');
    // Verify server Finished MAC.
    assert(bytesAreEqual(msg.verifyData, this._expectedServerFinishedMAC), 'invalid Finished MAC');
    // Send our own Finished message in return.
    // This must be encrypted with the handshake traffic key,
    // but must not appear in the transscript used to calculate the application keys.
    const keyschedule = this.conn._keyschedule;
    const clientFinishedMAC = await keyschedule.calculateFinishedMAC(keyschedule.clientHandshakeTrafficSecret);
    await keyschedule.finalize();
    await this.conn._writeHandshakeMessage(new messages_Finished(clientFinishedMAC));
    await this.conn._flushOutgoingRecord();
    await this.conn._setSendKey(keyschedule.clientApplicationTrafficSecret);
    await this.conn._setRecvKey(keyschedule.serverApplicationTrafficSecret);
    await this.conn._transition(CONNECTED);
  }
}

// These states implement (part of) the server state-machine from
// https://tools.ietf.org/html/rfc8446#appendix-A.2
//
// Since we're only implementing a small subset of TLS1.3,
// we only need a small subset of the handshake.  It basically goes:
//
//   * receive ClientHello
//   * send ServerHello
//   * send empty EncryptedExtensions
//   * send server Finished
//   * receive client Finished
//
// We include some unused states for completeness, so that it's easier
// to check the implementation against the diagrams in the RFC.

class states_SERVER_START extends states_State {
  async recvHandshakeMessage(msg) {
    assert(msg instanceof messages_ClientHello, 'expected ClientHello');
    await this.conn._transition(states_SERVER_RECVD_CH, msg);
  }
}

class states_SERVER_RECVD_CH extends states_State {
  async initialize(clientHello) {
    // In the spec, this is where we select connection parameters, and maybe
    // tell the client to try again if we can't find a compatible set.
    // Since we only support a fixed cipherset, the only thing to "negotiate"
    // is whether they provided an acceptable PSK.
    const pskIndex = clientHello.pskIds.findIndex(pskId => bytesAreEqual(pskId, this.conn.pskId));
    assert(pskIndex !== -1, 'client did not offer a matching PSK');
    await this.conn._keyschedule.addPSK(this.conn.psk);
    // Validate the PSK binder.
    const keyschedule = this.conn._keyschedule;
    const transcript = keyschedule.getTranscript();
    const expectedPskBinder = await keyschedule.calculateFinishedMAC(keyschedule.extBinderKey, transcript.slice(0, -PSK_BINDERS_SIZE));
    assert(bytesAreEqual(clientHello.pskBinders[pskIndex], expectedPskBinder), 'incorrect pskBinder');
    await this.conn._transition(states_SERVER_NEGOTIATED, clientHello, pskIndex);
  }
}

class states_SERVER_NEGOTIATED extends states_State {
  async initialize(clientHello, pskIndex) {
    await this.conn._writeHandshakeMessage(new messages_ServerHello(this.conn.randomSalt, clientHello.sessionId, pskIndex));
    await this.conn._flushOutgoingRecord();
    // We can now transition to the encrypted part of the handshake.
    const keyschedule = this.conn._keyschedule;
    await keyschedule.addECDHE(null);
    await this.conn._setSendKey(keyschedule.serverHandshakeTrafficSecret);
    await this.conn._setRecvKey(keyschedule.clientHandshakeTrafficSecret);
    // Send an empty EncryptedExtensions message.
    await this.conn._writeHandshakeMessage(new messages_EncryptedExtensions());
    await this.conn._flushOutgoingRecord();
    // Send the Finished message.
    const serverFinishedMAC = await keyschedule.calculateFinishedMAC(keyschedule.serverHandshakeTrafficSecret);
    await this.conn._writeHandshakeMessage(new messages_Finished(serverFinishedMAC));
    await this.conn._flushOutgoingRecord();
    const expectedClientFinishedMAC = await keyschedule.calculateFinishedMAC(keyschedule.clientHandshakeTrafficSecret);
    // We can now *send* using the application traffic key,
    // but have to wait to receive the client Finished before receiving under that key.
    await this.conn._keyschedule.finalize();
    await this.conn._setSendKey(keyschedule.serverApplicationTrafficSecret);
    await this.conn._transition(states_SERVER_WAIT_FINISHED, expectedClientFinishedMAC);
  }
}

class states_SERVER_WAIT_FINISHED extends states_State {
  async initialize(expectedClientFinishedMAC) {
    this._expectedClientFinishedMAC = expectedClientFinishedMAC;
  }
  async recvHandshakeMessage(msg) {
    assert(msg instanceof messages_Finished, 'expected Finished');
    assert(bytesAreEqual(msg.verifyData, this._expectedClientFinishedMAC, 'invalid Finished MAC'));
    await this.conn._setRecvKey(this.conn._keyschedule.clientApplicationTrafficSecret);
    await this.conn._transition(CONNECTED);
  }
}
// CONCATENATED MODULE: ./src/keyschedule.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



// TLS1.3 Key Schedule.
//
// In this file we implement the "key schedule" from
// https://tools.ietf.org/html/rfc8446#section-7.1, which
// defines how to calculate various keys as the handshake
// state progresses.
//





const STAGE_UNINITIALIZED = 0;
const STAGE_EARLY_SECRET = 1;
const STAGE_HANDSHAKE_SECRET = 2;
const STAGE_MASTER_SECRET = 3;

class keyschedule_KeySchedule {
  constructor() {
    // WebCrypto doesn't support a rolling hash construct, so we have to
    // keep the entire message transcript in memory.
    this.transcript = new BufferWriter();
    // This tracks the main secret from with other keys are derived at each stage.
    this.secret = null;
    this.stage = STAGE_UNINITIALIZED;
    // And these are all the various keys we'll derive as the handshake progresses.
    this.extBinderKey = null;
    this.clientHandshakeTrafficSecret = null;
    this.serverHandshakeTrafficSecret = null;
    this.clientApplicationTrafficSecret = null;
    this.serverApplicationTrafficSecret = null;
  }

  async addPSK(psk) {
    // Use the selected PSK (if any) to calculate the "early secret".
    psk = psk || zeros(HASH_LENGTH);
    assert(this.stage === STAGE_UNINITIALIZED, 'PSK added at incorrect state');
    this.secret = await hkdfExtract(zeros(HASH_LENGTH), psk);
    this.stage = STAGE_EARLY_SECRET;
    this.extBinderKey = await this.deriveSecret('ext binder', EMPTY);
  }

  async addECDHE(ecdhe) {
    // Mix in the ECDHE output (if any) to calculate the "handshake secret".
    ecdhe = ecdhe || zeros(HASH_LENGTH);;
    assert(this.stage === STAGE_EARLY_SECRET, 'ECDHE added at incorrect state');
    this.secret = await hkdfExtract(await this.deriveSecret('derived', EMPTY), ecdhe);
    this.stage = STAGE_HANDSHAKE_SECRET;
    this.clientHandshakeTrafficSecret = await this.deriveSecret('c hs traffic');
    this.serverHandshakeTrafficSecret = await this.deriveSecret('s hs traffic');
  }

  async finalize() {
    assert(this.stage === STAGE_HANDSHAKE_SECRET, 'finalized in incorrect state');
    this.secret = await hkdfExtract(await this.deriveSecret('derived', EMPTY), zeros(HASH_LENGTH));
    this.stage = STAGE_MASTER_SECRET;
    this.clientApplicationTrafficSecret = await this.deriveSecret('c ap traffic');
    this.serverApplicationTrafficSecret = await this.deriveSecret('s ap traffic');
  }

  addToTranscript(bytes) {
    this.transcript.writeBytes(bytes);
  }

  getTranscript() {
    return this.transcript.slice();
  }

  async deriveSecret(label, transcript = undefined) {
    transcript = transcript || this.getTranscript();
    return await hkdfExpandLabel(this.secret, label, await hash(transcript), HASH_LENGTH);
  }

  async calculateFinishedMAC(baseKey, transcript = undefined) {
    transcript = transcript || this.getTranscript();
    const finishedKey = await hkdfExpandLabel(baseKey, 'finished', EMPTY, HASH_LENGTH);
    return await hmac(finishedKey, await hash(transcript));
  }
}

// CONCATENATED MODULE: ./src/constants.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



const VERSION_TLS_1_0 = 0x0301;
const constants_VERSION_TLS_1_2 = 0x0303;
const constants_VERSION_TLS_1_3 = 0x0304;
const constants_TLS_AES_128_GCM_SHA256 = 0x1301;
const constants_PSK_MODE_KE = 0;
// CONCATENATED MODULE: ./src/recordlayer.js
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






/* eslint-disable sorting/sort-object-props */
const RECORD_TYPE = {
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

class recordlayer_CipherState {
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

class recordlayer_RecordLayer {
  constructor(sendCallback) {
    this.sendCallback = sendCallback;
    this._sendCipherState = new recordlayer_CipherState();
    this._recvCipherState = new recordlayer_CipherState();
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
      buf.writeUint16(constants_VERSION_TLS_1_2);
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
      buf.writeUint16(constants_VERSION_TLS_1_2);
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

// CONCATENATED MODULE: ./src/tlsconnection.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



// The top-level APIs offered by this module are `ClientConnection` and
// `ServerConnection` classes, which provide authenticated and encrypted
// communication via the "externally-provisioned PSK" mode of TLS1.3.
// They each take a callback to be used for sending data to the remote peer,
// and operate like this:
//
//    conn = await ClientConnection.create(psk, pskId, async function send_data_to_server(data) {
//      // application-specific sending logic here.
//    })
//
//    // Send data to the server by calling `send`,
//    // which will use the callback provided in the constructor.
//    // A single `send()` by the application may result in multiple
//    // invokations of the callback.
//
//    await conn.send('application-level data')
//
//    // When data is received from the server, push it into
//    // the connection and let it return any decrypted app-level data.
//    // There might not be any app-level data if it was protocol control message,
//    // and the receipt of the data might trigger additional calls to the
//    // send callback for protocol control purposes.
//
//    serverSocket.on('data', async encrypted_data => {
//      const plaintext = await conn.recv(data)
//      if (plaintext !== null) {
//        do_something_with_app_level_data(plaintext)
//      }
//    })
//
//    // It's good practice to explicitly close the connection
//    // when finished.  This will send a "closed" notification
//    // to the server.
//
//    await conn.close()
//
// The `ServerConnection` API operates similarly; the distinction is mainly
// in which side is expected to send vs receieve during the protocol handshake.









class tlsconnection_Connection {
  constructor(psk, pskId, sendCallback, randomSalt) {
    this.psk = assertIsBytes(psk);
    this.pskId = assertIsBytes(pskId);
    this.randomSalt = assertIsBytes(randomSalt);
    this._state = new states_UNINITIALIZED(this);
    this._sendBuffer = new BufferWriter();
    this._recvBuffer = new BufferWriter();
    this._recordlayer = new recordlayer_RecordLayer(sendCallback);
    this._keyschedule = new keyschedule_KeySchedule();
    this._lastPromise = Promise.resolve();
  }

  // Subclasses will override this with some async initialization logic.
  static async create(psk, pskId, sendCallback, randomSalt = null) {
    randomSalt = randomSalt === null ? await getRandomBytes(32) : randomSalt;
    return new this(psk, pskId, sendCallback, randomSalt);
  }

  // These are the three public API methods that
  // consumers can use to send and receive data encrypted
  // with TLS1.3.

  async send(data) {
    assertIsBytes(data);
    await this._synchronized(async () => {
      await this._state.sendApplicationData(data);
    });
  }

  async recv(data) {
    assertIsBytes(data);
    return await this._synchronized(async () => {
      await this._recordlayer.recv(data, async (type, bytes) => {
        await this._dispatchIncomingMessage(type, bytes);
      });
      const appData = this._recvBuffer.flush();
      return appData.byteLength > 0 ? appData : null;
    });
  }

  async close() {
    await this._synchronized(async () => {
      // XXX TODO: check for partially-consumed records?
      await this._state.close();
    });
  }

  // Ensure that async functions execute one at a time,
  // by waiting for the previous call to `_synchronized()` to complete
  // before starting a new one.  This helps ensure that we complete
  // one state-machine transition before starting to do the next.

  _synchronized(cb) {
    const nextPromise = this._lastPromise.then(() => {
      return cb();
    }).catch(async err => {
      // All errors immediately put us in a terminal "error" state.
      // XXX TODO: send specific 'alert' messages for specific errors?
      await this._transition(ERROR, err);
      throw err;
    });
    // We don't want to hold on to the return value or error,
    // just synchronize on the fact that it completed.
    this._lastPromise = nextPromise.then(noop, noop);
    return nextPromise;
  }

  // This drives internal transition of the state-machine,
  // ensuring that the new state is properly initialized.

  async _transition(State, ...args) {
    this._state = new State(this);
    await this._state.initialize(...args);
  }

  // These are helpers to allow the State to manipulate the recordlayer
  // and send out various types of data.

  async _sendApplicationData(bytes) {
    await this._recordlayer.send(RECORD_TYPE.APPLICATION_DATA, bytes);
    // XXX TODO: explicit flush?
  }

  async _sendHandshakeMessage(bytes) {
    this._keyschedule.addToTranscript(bytes);
    await this._recordlayer.send(RECORD_TYPE.HANDSHAKE, bytes);
  }

  async _writeHandshakeMessage(msg) {
    const buf = new BufferWriter();
    msg.write(buf);
    return await this._sendHandshakeMessage(buf.flush());
  }

  async _flushOutgoingRecord() {
    await this._recordlayer.flush();
  }

  async _setSendKey(key) {
    return await this._recordlayer.setSendKey(key);
  }

  async _setRecvKey(key) {
    return await this._recordlayer.setRecvKey(key);
  }

  // This is a helper for handling incoming messages from the recordlayer.

  async _dispatchIncomingMessage(type, bytes) {
    switch (type) {
      case RECORD_TYPE.CHANGE_CIPHER_SPEC:
        // These may be sent for b/w compat, and must be discarded.
        assert(bytes.byteLength === 1 && bytes[0] === 1, 'unexpected_message');
        break;
      case RECORD_TYPE.ALERT:
        // XXX TODO: implement alert records for communicating errors.
        throw new Error('received TLS alert record, unceremoniously aborting!');
      case RECORD_TYPE.APPLICATION_DATA:
        await this._state.recvApplicationData(bytes);
        break;
      case RECORD_TYPE.HANDSHAKE:
        this._keyschedule.addToTranscript(bytes);
        await this._state.recvHandshakeMessage(readHandshakeMessage(new BufferReader(bytes)));
        break;
      default:
        assert(false, `unknown record type: ${type}`);
    }
  }

}

class tlsconnection_ClientConnection extends tlsconnection_Connection {
  static async create(psk, pskId, sendCallback, randomSalt = null) {
    const instance = await super.create(psk, pskId, sendCallback, randomSalt);
    await instance._transition(states_CLIENT_START);
    return instance;
  }
}

class tlsconnection_ServerConnection extends tlsconnection_Connection {
  static async create(psk, pskId, sendCallback, randomSalt = null) {
    const instance = await super.create(psk, pskId, sendCallback, randomSalt);
    await instance._transition(states_SERVER_START);
    return instance;
  }
}

// Re-export helpful utilities for calling code to use.

// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PairingChannel", function() { return src_PairingChannel; });
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



// A wrapper that combines a WebSocket to the channelserver
// with a TLS Connection for encryption.





const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder();
const CLOSE_FLUSH_BUFFER_INTERVAL_MS = 200;
const CLOSE_FLUSH_BUFFER_MAX_TRIES = 5;

class src_PairingChannel extends EventTarget {
  constructor(channelId, channelKey, socket, tlsConnection) {
    super();
    this._channelId = channelId;
    this._channelKey = channelKey;
    this._socket = socket;
    this._tlsConnection = tlsConnection;
    this._setupListeners();
  }

  /**
   * Create a new pairing channel.
   *
   * @returns Promise<PairingChannel>
   */
  static create(channelServerURI) {
    const wsURI = new URL('/v1/ws/', channelServerURI).href;
    const channelKey = crypto.getRandomValues(new Uint8Array(32));
    return this._makePairingChannel(wsURI, tlsconnection_ServerConnection, channelKey);
  }

  /**
   * Connect to an existing pairing channel.
   *
   * @returns Promise<PairingChannel>
   */
  static connect(channelServerURI, channelId, channelKey) {
    const wsURI = new URL(`/v1/ws/${channelId}`, channelServerURI).href;
    return this._makePairingChannel(wsURI, tlsconnection_ClientConnection, channelKey);
  }

  static _makePairingChannel(wsUri, TlsConnection, psk) {
    const socket = new WebSocket(wsUri);
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-const
      let stopListening;
      const onConnectionError = async () => {
        stopListening();
        reject(new Error('Error while creating the pairing channel'));
      };
      const onFirstMessage = async event => {
        stopListening();
        try {
          const {channelid: channelId} = JSON.parse(event.data);
          const pskId = utf8ToBytes(channelId);
          const tlsConnection = await TlsConnection.create(psk, pskId, data => {
            // To send data over the websocket, it needs to be encoded as a safe string.
            socket.send(bytesToHex(data));
          });
          const instance = new this(channelId, psk, socket, tlsConnection);
          resolve(instance);
        } catch (err) {
          reject(err);
        }
      };
      stopListening = () => {
        socket.removeEventListener('error', onConnectionError);
        socket.removeEventListener('message', onFirstMessage);
      };
      socket.addEventListener('error', onConnectionError);
      socket.addEventListener('message', onFirstMessage);
    });
  }

  _setupListeners() {
    this._socket.addEventListener('message', async event => {
      try {
        const channelServerEnvelope = JSON.parse(event.data);
        const payload = await this._tlsConnection.recv(hexToBytes(channelServerEnvelope.message));
        if (payload !== null) {
          const data = JSON.parse(utf8Decoder.decode(payload));
          this.dispatchEvent(new CustomEvent('message', {
            detail: {
              data,
              sender: channelServerEnvelope.sender,
            },
          }));
        }
      } catch (error) {
        this.dispatchEvent(new CustomEvent('error', {
          detail: {
            error,
          },
        }));
      }
    });
    // Relay the other events.
    this._socket.addEventListener('error', this.dispatchEvent);
    this._socket.addEventListener('close', this.dispatchEvent);
  }

  /**
   * @param {Object} data
   */
  async send(data) {
    const payload = utf8Encoder.encode(JSON.stringify(data));
    await this._tlsConnection.send(payload);
  }

  async close() {
    await this._tlsConnection.close();
    this._tlsConnection = null;
    try {
      // Ensure all queued bytes have been sent before closing the connection.
      let tries = 0;
      while (this._socket.bufferedAmount > 0) {
        if (++tries > CLOSE_FLUSH_BUFFER_MAX_TRIES) {
          throw new Error('Could not flush the outgoing buffer in time.');
        }
        await new Promise(res => setTimeout(res, CLOSE_FLUSH_BUFFER_INTERVAL_MS));
      }
    } finally {
      this._socket.close();
      this._socket = null;
    }
  }

  get closed() {
    return this._socket.readyState === 3;
  }

  get channelId() {
    return this._channelId;
  }

  get channelKey() {
    return this._channelKey;
  }
}


/***/ })
/******/ ]);