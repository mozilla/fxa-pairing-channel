/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

//
// Message parsing.
//
// Herein we need code for reading and writing the various Handshake
// messages involved in the protocol.
//

import {
  assert,
} from './utils.js';
import {
  HASH_LENGTH
} from './crypto.js';

/* eslint-disable sorting/sort-object-props */
export const HANDSHAKE_TYPE = {
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

export function readHandshakeMessage(buf) {
  // Each handshake messages has a type and length prefix, per
  // https://tools.ietf.org/html/rfc8446#appendix-B.3
  const type = buf.readUint8();
  const size = buf.readUint24();
  const expectedEnd = size + buf.tell();
  let msg;
  switch (type) {
    case HANDSHAKE_TYPE.CLIENT_HELLO:
      msg = ClientHello._read(buf);
      break;
    case HANDSHAKE_TYPE.SERVER_HELLO:
      msg = ServerHello._read(buf);
      break;
    case HANDSHAKE_TYPE.FINISHED:
      msg = Finished._read(buf);
      break;
    default:
      assert(false, 'unexpected handshake message type');
  }
  assert(buf.tell() === expectedEnd, 'failed to consume entire message');
  return msg;
}

export class HandshakeMessage {
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

export class ClientHello extends HandshakeMessage {

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

export class ServerHello extends HandshakeMessage {

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
    // XXX TODO: check that it echoed correctly.
    const sessionId = buf.readVectorBytes8();
    // XXX TODO: test vector won't have this; assert(sessionId.byteLength === 0, 'illegal_parameter sessionid');
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

export class EncryptedExtensions extends HandshakeMessage {

  get TYPE_TAG() {
    return HANDSHAKE_TYPE.ENCRYPTED_EXTENSIONS;
  }

  static _read(buf) {
    // We should not receive any encrypted extensions,
    // since we do not advertize any in the ClientHello.
    buf.readVector16(buf => {
      assert(false, 'unexpected encrypted extension');
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

export class Finished extends HandshakeMessage {

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
