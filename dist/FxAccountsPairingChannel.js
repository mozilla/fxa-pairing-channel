/*!
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * 
 * Bundle generated from https://github.com/mozilla/fxa-pairing-tls.git. Hash:12b32ad00499b7253052, Chunkhash:68c3e0644aed038b39bf.
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
  // XXX: Disabled until Gecko problems are resolved
  //assert(value instanceof Uint8Array, msg);
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


class BufferReader extends BufferWithPointer {

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


class BufferWriter extends BufferWithPointer {
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

// CONCATENATED MODULE: ./src/crypto.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



//
// Low-level crypto primitives.
//
// We haven't actually implemented any of the crypto yet,
// but when we do, this is the file where we'll define the basics.
//



const AEAD_SIZE_INFLATION = 4;
const HASH_LENGTH = 32;

// Fake crypto for now, just to try out the message layer.

async function AEADEncrypt(key, iv, seqNum, plaintext, additionalData) {
  const ciphertext = new Uint8Array(plaintext.byteLength + 4);
  ciphertext[0] = seqNum >> 24;
  ciphertext[1] = seqNum >> 16;
  ciphertext[2] = seqNum >> 8;
  ciphertext[3] = seqNum;
  ciphertext.set(plaintext, 4);
  return ciphertext;
}

async function AEADDecrypt(key, iv, seqNum, ciphertext, additionalData) {
  let foundSeqNum = ciphertext[0];
  foundSeqNum = foundSeqNum << 8 | ciphertext[1];
  foundSeqNum = foundSeqNum << 8 | ciphertext[2];
  foundSeqNum = foundSeqNum << 8 | ciphertext[3];
  assert(foundSeqNum === seqNum, 'sequence number mismatch');
  const plaintext = new Uint8Array(ciphertext.buffer, ciphertext.byteOffset + 4, ciphertext.byteLength - 4);
  return plaintext;
}

async function getRandomBytes(crypto, size) {
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
  const expectedEnd = buf.readUint24() + buf.tell();
  let msg;
  switch (type) {
    case HANDSHAKE_TYPE.CLIENT_HELLO:
      msg = messages_ClientHello._read(buf);
      break;
    case HANDSHAKE_TYPE.SERVER_HELLO:
      msg = messages_ServerHello._read(buf);
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

class HandshakeMessage {
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

class messages_ClientHello extends HandshakeMessage {

  constructor(random, pskIds, pskBinders) {
    super();
    this.random = random;
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
    // Skip over legacy_session_id.
    buf.readVectorBytes8();
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
    return new this(random, pskIds, pskBinders);
  }

  _write(buf) {
    buf.writeUint16(VERSION_TLS_1_2);
    buf.writeBytes(this.random);
    // Empty vector for legacy_session_id
    buf.writeVectorBytes8(new Uint8Array(0));
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

class messages_ServerHello extends HandshakeMessage {

  constructor(random, pskIndex) {
    super();
    this.random = random;
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
    // It should have echoed our empty vector for legacy_session_id.
    assert(buf.readVectorBytes8().byteLength === 0, 'illegal_parameter');
    // It should have selected our single offered ciphersuite.
    const foundCipherSuite = buf.readUint16();
    assert(foundCipherSuite === TLS_AES_128_GCM_SHA256, 'illegal_parameter');
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
    return new this(random, pskIndex);
  }

  _write(buf) {
    buf.writeUint16(VERSION_TLS_1_2);
    buf.writeBytes(this.random);
    // Empty vector for legacy_session_id
    buf.writeVectorBytes8(new Uint8Array(0));
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

// The Finished message:
//
// struct {
//   opaque verify_data[Hash.length];
// } Finished;

class messages_Finished extends HandshakeMessage {

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







const PSK_BINDER_SIZE = 32;

//
// State-machine for TLS Handshake Management.
//
// Internally, we manage the TLS connection by explicitly modelling the
// client and server state-machines from RFC8446.  You can think of
// these `State` objects as little plugins for the `Connection` class
// that provide different behaviours of `send` and `receive` depending
// on the state of the connection.
//
// These are the actual states of the TLS1.3 state-machines and they
// send the same sequence of messages.  They don't use the same byte
// encoding or do any crypto yet though.
//

class states_State {

  constructor(conn) {
    this.conn = conn;
  }

  async initialize() {
    // By default, nothing to do when entering the state.
  }

  async sendApplicationData(data) {
    // By default, assume we're not ready to send yet
    // and just let the data queue up for a future state.
    // XXX TODO: should this block until it's successfuly sent?
    this.conn._pendingApplicationData.push(data);
  }

  async recvApplicationData() {
    assert(false, 'not ready to receive application data');
  }

  async recvHandshakeMessage() {
    assert(false, 'not expecting to receive a handhake message');
  }

  async close() {
    console.warn('close() not implemented yet');
  }

}

// A special "guard" state to prevent us from using
// an improperly-initialized Connection.

class states_UNINITIALIZED extends states_State {
  async initialize() {
    assert(false, 'uninitialized state');
  }
  async sendApplicationData(data) {
    assert(false, 'uninitialized state');
  }
  async recvApplicationData(record) {
    assert(false, 'uninitialized state');
  }
  async recvHandshakeMessage(type, record) {
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
  async sendApplicationData(data) {
    throw this.error;
  }
  async recvApplicationData(record) {
    throw this.error;
  }
  async recvHandshakeMessage(type, record) {
    throw this.error;
  }
  async close() {
    throw this.error;
  }
}

// The "connected" state, for when the handshake is compelte
// and we're ready to send application-level data.
// The logic for this is symmetric between client and server.

class CONNECTED extends states_State {
  async initialize() {
    // We can now send any application data that was
    // submitted before the handshake was complete.
    while (this.conn._pendingApplicationData.length > 0) {
      const data = this.conn._pendingApplicationData.shift();
      await this.sendApplicationData(data);
    }
  }
  async sendApplicationData(data) {
    await this.conn._writeApplicationData(data);
    await this.conn._flushOutgoingRecord();
  }
  async recvApplicationData(record) {
    // Application data has no framing, just return the entire buffer.
    return record.slice(0);
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
//   * receive server Finished
//   * send client Finished
//
// We include some unused states for completeness, so that it's easier
// to check the implementation against the diagrams in the RFC.

class states_CLIENT_START extends states_State {
  async initialize() {
    // Write a ClientHello message with our single PSK.
    // We can't know the binder value yet, write zeros for now.
    const clientHello = new messages_ClientHello(
      this.conn.randomSalt,
      [this.conn.pskId],
      [new Uint8Array(PSK_BINDER_SIZE)]
    );
    await this.conn._writeHandshakeMessage(clientHello);
    // Now that we know what the ClientHello looks like,
    // go back and calculate the appropriate binder value.
    // XXX TODO: we'll need to actually change the bytes that just got written out.
    await this.conn._flushOutgoingRecord();
    await this.conn._transition(states_CLIENT_WAIT_SH);
  }
}

class states_CLIENT_WAIT_SH extends states_State {
  async recvHandshakeMessage(msg) {
    assert(msg instanceof messages_ServerHello, 'expected ServerHello');
    assert(msg.pskIndex === 0, 'server did not select our offered PSK');
    await this.conn._transition(CLIENT_WAIT_EE, msg);
  }
}

class CLIENT_WAIT_EE extends states_State {
  async initialize() {
    // There are no EncryptedExtensions in the subset of TLS we plan to use.
    // Transition directly to WAIT_FINISHED, which will error out if the server
    // attempts to send any.
    await this.conn._transition(states_CLIENT_WAIT_FINISHED);
  }
}

class states_CLIENT_WAIT_FINISHED extends states_State {
  async recvHandshakeMessage(msg) {
    assert(msg instanceof messages_Finished, 'expected Finished');
    // XXX TODO: calculate and verify server finished hash.
    assert(bytesAreEqual(msg.verifyData, new Uint8Array(HASH_LENGTH)), 'invalid verifyData');
    // XXX TODO: need to calculate client finished hash.
    const verifyData = new Uint8Array(HASH_LENGTH);
    await this.conn._writeHandshakeMessage(new messages_Finished(verifyData));
    await this.conn._flushOutgoingRecord();
    this.conn._updateTrafficKeys();
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
    // XXX TODO: validate the PSK binder.
    // This will involve reading a partial transcript of messages received so far.
    const pskBinder = clientHello.pskBinders[pskIndex];
    assert(bytesAreEqual(pskBinder, new Uint8Array(PSK_BINDER_SIZE)));
    await this.conn._transition(states_SERVER_NEGOTIATED, pskIndex);
  }
}

class states_SERVER_NEGOTIATED extends states_State {
  async initialize(pskIndex) {
    await this.conn._writeHandshakeMessage(new messages_ServerHello(this.conn.randomSalt, pskIndex));
    // XXX TODO: need to calculate server finished hash.
    const verifyData = new Uint8Array(HASH_LENGTH);
    await this.conn._writeHandshakeMessage(new messages_Finished(verifyData));
    await this.conn._flushOutgoingRecord();
    await this.conn._transition(SERVER_WAIT_FLIGHT2);
  }
}

class SERVER_WAIT_FLIGHT2 extends states_State {
  async initialize() {
    // If we were doing client-provided auth certificates
    // then we'd deal with them here, but we aren't.
    await this.conn._transition(states_SERVER_WAIT_FINISHED);
  }
}

class states_SERVER_WAIT_FINISHED extends states_State {
  async recvHandshakeMessage(msg) {
    assert(msg instanceof messages_Finished, 'expected Finished');
    // XXX TODO: calculate and verify client finished hash.
    assert(bytesAreEqual(msg.verifyData, new Uint8Array(HASH_LENGTH)), 'invalid verify_data');
    this.conn._updateTrafficKeys();
    await this.conn._transition(CONNECTED);
  }
}

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
// For simplicity, we assume that the application receives whole records
// from the peer and receives them one at a time, and likewise that is
// prepares and sends messages that fit in an individual record.  It would
// not be too complicated to add some buffering to deal with fragementation,
// but it's not needed for now.
//
// To read incoming data from the peer, use the `RecordReceiver` class
// like this:
//
//    receiver = new RecordReceiver()
//
//    // Specify the decryption key to use, if any.
//    receiver.setContentKey(key, iv)
//
//    // Decode/decrypt a record
//    [type, buf] = await receiver.recv(dataReceivedFromPeer)
//    switch (type) {
//      // Handle the received data based on its type tag.
//    }
//
// To prepare outgoing data to send to the peer, use the `RecordSender` class
// like this:
//
//    sender = new RecordSender()
//
//    // Specify the encryption key to use, if any.
//    receiver.setContentKey(key, iv)
//
//    // Write data into the pending record.
//    sender.withBufferWriter(TYPE_TAG, buf => {
//      buf.writeBytes('data here')
//    })
//
//    // You can concatenate several things in the buffer,
//    // as long as they belong to the same record type.
//    sender.withBufferWriter(TYPE_TAG, buf => {
//      buf.writeBytes('more data here')
//    })
//
//    // When ready to send, flush the pending record.
//    record = await sender.flush()
//    send_record_to_peer(record)
//




/* eslint-disable sorting/sort-object-props */
const RECORD_TYPES = {
  21: 'ALERT',
  22: 'HANDSHAKE',
  23: 'APPLICATION_DATA',
};

const RECORD_TYPE = {
  ALERT: 21,
  HANDSHAKE: 22,
  APPLICATION_DATA: 23,
};
/* eslint-enable sorting/sort-object-props */

const MAX_SEQUENCE_NUMBER = Math.pow(2, 32);
const MAX_RECORD_SIZE = Math.pow(2, 14);
const MAX_ENCRYPTED_RECORD_SIZE = MAX_RECORD_SIZE + 256;
const RECORD_HEADER_SIZE = 5;
const RECORD_BUFFER_SIZE = MAX_ENCRYPTED_RECORD_SIZE + RECORD_HEADER_SIZE;


class recordlayer_RecordReceiver {
  constructor() {
    this.contentKey = null;
    this.contentIV = null;
    this.sequenceNumber = 0;
  }

  // Call this to set the encryption key, or to change
  // to a newly-derived key.  Any records read before calling
  // this method are treated as plaintext.

  setContentKey(key, iv) {
    assertIsBytes(key);
    assertIsBytes(iv);
    this.contentKey = key;
    this.contentIV = iv;
    this.sequenceNumber = 0;
  }

  // Call this method when a record is received from the peer.
  // It will decode and decrypt the record and return its contents
  // as a `[type, reader]` pair, where `type` is the record type tag
  // and `reader` is a `BufferReader` instance that can be used for
  // structured reading of the record contents.

  async recv(data) {
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
    assert(type in RECORD_TYPES, 'unrecognized record type');
    assert(buf.readUint16() === 0x0303, 'unexpected legacy_record_version');
    const length = buf.readUint16();
    let plaintext;
    if (this.contentKey === null) {
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
      const additionalData = buf.slice(-RECORD_HEADER_SIZE, RECORD_HEADER_SIZE);
      const ciphertext = buf.readBytes(length);
      const paddedPlaintext = await this._decrypt(ciphertext, additionalData);
      // We have to scan backwards over the zero padding at the end of the struct
      // in order to find the non-zero `type` byte.
      let i;
      for (i = paddedPlaintext.byteLength - 1; i >= 0; i--) {
        if (paddedPlaintext[i] !== 0) {
          break;
        }
      }
      assert(i >= 0, 'failed to find content-type byte in TLSInnerPlaintext');
      type = paddedPlaintext[i];
      plaintext = new Uint8Array(paddedPlaintext.buffer, paddedPlaintext.byteOffset, i);
    }
    assert(! buf.hasMoreBytes(), 'record contained trailing data');
    return [type, new BufferReader(plaintext)];
  }

  async _decrypt(ciphertext, additionalData) {
    const plaintext = await AEADDecrypt(this.contentKey, this.contentIV, this.sequenceNumber, ciphertext, additionalData);
    this.sequenceNumber += 1;
    assert(this.sequenceNumber < MAX_SEQUENCE_NUMBER, 'sequence number overflow');
    return plaintext;
  }
}

//
// This class is a simple fixed-sized buffer for accumulating outgoing messages,
// allowing multiple messages to be coalesced into a single record for the application
// to send.
//
// For simplicity we assume that the application will not try to accumulate
// more data than can fit in a single record, and so we can work with a fixed-size
// buffer. (But for safety, we'll throw a hard error if it does write too much
// data into the record).
//

class recordlayer_RecordSender {
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
    assertIsBytes(key);
    assertIsBytes(iv);
    this.contentKey = key;
    this.contentIV = iv;
    this.sequenceNumber = 0;
  }

  // Call this method to obtain a `BufferWriter` that can be used to
  // add more data to the outgoing record.  The provided callback will
  // receive the `BufferWriter` as its only argument.
  // You must specify the intended record type in order to prevent mixing
  // different types in the one record.

  async withBufferWriter(type, cb) {
    if (this._pendingRecordBuf === null) {
      this._pendingRecordType = type;
      this._pendingRecordBuf = new BufferWriter(RECORD_BUFFER_SIZE);
      // Reserve space at the start of the buffer for the record header,
      // which is conveniently always a fixed size.
      this._pendingRecordBuf.seek(RECORD_HEADER_SIZE);
    } else {
      assert(this._pendingRecordType === type, 'different record type already in progress');
    }
    return await cb(this._pendingRecordBuf);
  }

  // When you're finished writing to the record via `withBufferWriter` above,
  // call `flush()` to produce an encrypted record to send to the peer.

  async flush() {
    const buf = this._pendingRecordBuf;
    const type = this._pendingRecordType;
    this._pendingRecordBuf = null;
    assert(type !== null, 'no messages written to buffer');
    let length = buf.tell() - RECORD_HEADER_SIZE;
    if (this.contentKey === null) {
      // Generate an unencrypted `TLSPlaintext` struct by just
      // filling in an appropriate record header.
      assert(type !== RECORD_TYPE.APPLICATION_DATA, 'must encrypt application data');
      buf.seek(0);
      buf.writeUint8(type);
      buf.writeUint16(0x0303);
      buf.writeUint16(length);
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
      buf.writeUint16(0x0303);
      buf.writeUint16(length + AEAD_SIZE_INFLATION);
      // The additional data for the encryption is the `TLSCiphertext` record
      // header that  we just wrote, which we know to be the previous `RECORD_HEADER_SIZE` bytes.
      const additionalData = buf.slice(-RECORD_HEADER_SIZE, RECORD_HEADER_SIZE);
      const ciphertext = await this._encrypt(buf.slice(0, length), additionalData);
      length += AEAD_SIZE_INFLATION;
      assert(ciphertext.byteLength === length, 'unexpected ciphertext length');
      buf.writeBytes(ciphertext);
    }
    buf.seek(0);
    return buf.slice(0, length + RECORD_HEADER_SIZE);
  }

  async _encrypt(plaintext, additionalData) {
    const ciphertext = await AEADEncrypt(this.contentKey, this.contentIV, this.sequenceNumber, plaintext, additionalData);
    this.sequenceNumber += 1;
    assert(this.sequenceNumber < MAX_SEQUENCE_NUMBER, 'sequence number overflow');
    return ciphertext;
  }
}

// CONCATENATED MODULE: ./src/tlsconnection.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



// The top-level APIs offered by this library are `ClientConnection` and
// `ServerConnection` classes.  They each take a callback to be used for
// sending data to the remote peer, and operate like this:
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











// !!!!!!!
// !!
// !!   N.B. We have not yet implemented the actual encryption bits!
// !!
// !!!!!!!
//
// This first version of the code uses the same "framework" as we would use for
// implementing TLS1.3, including the basic sequence of messages between client and
// server, and the use of binary encoding in an ArrayBuffer for data processing.
// Using an implementation with proper crypto should feel identical to using
// this mock version, except it won't have "Insecure" in the class name...

class tlsconnection_InsecureConnection {
  constructor(psk, pskId, sendCallback, randomSalt) {
    this.psk = assertIsBytes(psk);
    this.pskId = assertIsBytes(pskId);
    this.sendCallback = sendCallback;
    this.randomSalt = randomSalt;
    this._state = new states_UNINITIALIZED(this);
    this._pendingApplicationData = [];
    this._recordSender = new recordlayer_RecordSender();
    this._recordReceiver = new recordlayer_RecordReceiver();
    this._lastPromise = Promise.resolve();
  }

  // Subclasses will override this with some async initialization logic.
  static async create(psk, pskId, sendCallback, randomSalt = null) {
    randomSalt = randomSalt === null ? await getRandomBytes(crypto, 32) : randomSalt;
    return new this(psk, pskId, sendCallback, randomSalt);
  }

  // These are the three public API methods that
  // consumers can use to connunicate over TLS.

  async send(data) {
    assertIsBytes(data);
    await this._synchronized(async () => {
      await this._state.sendApplicationData(data);
    });
  }

  async recv(data) {
    assertIsBytes(data);
    return await this._synchronized(async () => {
      const [type, buf] = await this._recordReceiver.recv(data);
      return await this._dispatchIncomingRecord(type, buf);
    });
  }

  async close() {
    await this._synchronized(async () => {
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

  // These are helpers to allow the state to add data to the next outgoing record.

  async _writeApplicationData(bytes) {
    await this._recordSender.withBufferWriter(RECORD_TYPE.APPLICATION_DATA, async buf => {
      await buf.writeBytes(bytes);
    });
  }

  async _writeHandshakeMessage(msg) {
    await this._recordSender.withBufferWriter(RECORD_TYPE.HANDSHAKE, async buf => {
      // XXX TODO: remember buffer position here.
      await msg.write(buf);
      // XXX TODO: read back to prev buffer position, add it to the transcript hash.
    });
  }

  async _flushOutgoingRecord() {
    const record = await this._recordSender.flush();
    await this.sendCallback(record);
  }

  // This is a helper for handling incoming records.

  async _dispatchIncomingRecord(type, buf) {
    switch (type) {
      case RECORD_TYPE.ALERT:
        // XXX TODO: implement alert records for communicating errors.
        throw new Error('received TLS alert record, aborting!');
      case RECORD_TYPE.APPLICATION_DATA:
        return await this._state.recvApplicationData(buf);
      case RECORD_TYPE.HANDSHAKE:
        // For simplicity, we assume that handshake messages will not be
        // fragmented across multiple records.  They shouldn't need to be
        // for the tiny subset of TLS that we're using.
        do {
          // XXX TODO: remember buffer position here.
          const msg = readHandshakeMessage(buf);
          // XXX TODO: read back to prev buffer position, add it to the transcript hash.
          await this._state.recvHandshakeMessage(msg);
        } while (buf.hasMoreBytes());
        return null;
      default:
        assert(false, `unknown record type: ${type}`);
    }
  }

  // This is a placeholder, until we implement the full key schedule.
  // XXX TODO: the full key schedule.

  _updateTrafficKeys() {
    this._recordSender.setContentKey(this.psk, new Uint8Array(32));
    this._recordReceiver.setContentKey(this.psk, new Uint8Array(32));
  }
}


class tlsconnection_InsecureClientConnection extends tlsconnection_InsecureConnection {
  static async create(psk, pskId, sendCallback) {
    const instance = await super.create(psk, pskId, sendCallback);
    await instance._transition(states_CLIENT_START);
    return instance;
  }
}


class tlsconnection_InsecureServerConnection extends tlsconnection_InsecureConnection {
  static async create(psk, pskId, sendCallback) {
    const instance = await super.create(psk, pskId, sendCallback);
    await instance._transition(states_SERVER_START);
    return instance;
  }
}

// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsecurePairingChannel", function() { return src_InsecurePairingChannel; });
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



// A wrapper that combines a WebSocket to the channelserver
// with a TLS Connection for encryption.





const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder();

class src_InsecurePairingChannel extends EventTarget {
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
   * @returns Promise<InsecurePairingChannel>
   */
  static create(channelServerURI) {
    const wsURI = new URL('/v1/ws/', channelServerURI).href;
    const channelKey = crypto.getRandomValues(new Uint8Array(32));
    return this._makePairingChannel(wsURI, tlsconnection_InsecureServerConnection, channelKey);
  }

  /**
   * Connect to an existing pairing channel.
   *
   * @returns Promise<InsecurePairingChannel>
   */
  static connect(channelServerURI, channelId, channelKey) {
    const wsURI = new URL(`/v1/ws/${channelId}`, channelServerURI).href;
    return this._makePairingChannel(wsURI, tlsconnection_InsecureClientConnection, channelKey);
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
    this._socket.close();
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