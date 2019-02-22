/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

//
// Message parsing.
//
// Herein we need code for reading and writing the various Handshake
// messages involved in the protocol.
//

import { BufferWriter, BufferReader } from './utils.js';
import { ALERT_DESCRIPTION, TLSError } from './alerts.js';
import { HASH_LENGTH } from './crypto.js';
import { Extension, EXTENSION_TYPE } from './extensions.js';
import {
  VERSION_TLS_1_2,
  VERSION_TLS_1_3,
  TLS_AES_128_GCM_SHA256,
  VERSION_TLS_1_0,
} from './constants.js';

/* eslint-disable sorting/sort-object-props */
export const HANDSHAKE_TYPE = {
  CLIENT_HELLO: 1,
  SERVER_HELLO: 2,
  NEW_SESSION_TICKET: 4,
  ENCRYPTED_EXTENSIONS: 8,
  FINISHED: 20,
};
/* eslint-enable sorting/sort-object-props */

// Base class for generic reading/writing of handshake messages,
// which are all uniformly formatted as:
//
//  struct {
//    HandshakeType msg_type;    /* handshake type */
//    uint24 length;             /* bytes in message */
//    select(Handshake.msg_type) {
//        ... type specific cases here ...
//    };
//  } Handshake;

export class HandshakeMessage {

  get TYPE_TAG() {
    throw new Error('not implemented');
  }

  static fromBytes(bytes) {
    // Each handshake message has a type and length prefix, per
    // https://tools.ietf.org/html/rfc8446#appendix-B.3
    const buf = new BufferReader(bytes);
    const msg = this.read(buf);
    if (buf.hasMoreBytes()) {
      throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
    }
    return msg;
  }

  toBytes() {
    const buf = new BufferWriter();
    this.write(buf);
    return buf.flush();
  }

  static read(buf) {
    const type = buf.readUint8();
    let msg = null;
    buf.readVector24(buf => {
      switch (type) {
        case HANDSHAKE_TYPE.CLIENT_HELLO:
          msg = ClientHello._read(buf);
          break;
        case HANDSHAKE_TYPE.SERVER_HELLO:
          msg = ServerHello._read(buf);
          break;
        case HANDSHAKE_TYPE.NEW_SESSION_TICKET:
          msg = NewSessionTicket._read(buf);
          break;
        case HANDSHAKE_TYPE.ENCRYPTED_EXTENSIONS:
          msg = EncryptedExtensions._read(buf);
          break;
        case HANDSHAKE_TYPE.FINISHED:
          msg = Finished._read(buf);
          break;
      }
      if (buf.hasMoreBytes()) {
        throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
      }
    });
    if (msg === null) {
      throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
    }
    return msg;
  }

  write(buf) {
    buf.writeUint8(this.TYPE_TAG);
    buf.writeVector24(buf => {
      this._write(buf);
    });
  }

  static _read(buf) {
    throw new Error('not implemented');
  }

  _write(buf) {
    throw new Error('not implemented');
  }

  // Some little helpers for reading a list of extensions,
  // which is uniformly represented as:
  //
  //   Extension extensions<8..2^16-1>;
  //
  // Recognized extensions are returned as a Map from extension type
  // to extension data object, with a special `lastSeenExtension`
  // property to make it easy to check which one came last.

  static _readExtensions(messageType, buf) {
    const extensions = new Map();
    buf.readVector16(buf => {
      const ext = Extension.read(messageType, buf);
      if (extensions.has(ext.TYPE_TAG)) {
        throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
      }
      extensions.set(ext.TYPE_TAG, ext);
      extensions.lastSeenExtension = ext.TYPE_TAG;
    });
    return extensions;
  }

  _writeExtensions(buf, extensions) {
    buf.writeVector16(buf => {
      extensions.forEach(ext => {
        ext.write(this.TYPE_TAG, buf);
      });
    });
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

export class ClientHello extends HandshakeMessage {

  constructor(random, sessionId, extensions) {
    super();
    this.random = random;
    this.sessionId = sessionId;
    this.extensions = extensions;
  }

  get TYPE_TAG() {
    return HANDSHAKE_TYPE.CLIENT_HELLO;
  }

  static _read(buf) {
    // The legacy_version field may indicate an earlier version of TLS
    // for backwards compatibility, but must not predate TLS 1.0!
    if (buf.readUint16() < VERSION_TLS_1_0) {
      throw new TLSError(ALERT_DESCRIPTION.PROTOCOL_VERSION);
    }
    // The random bytes provided by the peer.
    const random = buf.readBytes(32);
    // Read legacy_session_id, so the server can echo it.
    const sessionId = buf.readVectorBytes8();
    // We only support a single ciphersuite, but the peer may offer several.
    // Scan the list to confirm that the one we want is present.
    let found = false;
    buf.readVector16(buf => {
      const cipherSuite = buf.readUint16();
      if (cipherSuite === TLS_AES_128_GCM_SHA256) {
        found = true;
      }
    });
    if (! found) {
      throw new TLSError(ALERT_DESCRIPTION.HANDSHAKE_FAILURE);
    }
    // legacy_compression_methods must be a single zero byte for TLS1.3 ClientHellos.
    // It can be non-zero in previous versions of TLS, but we're not going to
    // make a successful handshake with such versions, so better to just bail out now.
    const legacyCompressionMethods = buf.readVectorBytes8();
    if (legacyCompressionMethods.byteLength !== 1) {
      throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
    }
    if (legacyCompressionMethods[0] !== 0x00) {
      throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
    }
    // Read the extensions, and check any that we know must be present.
    const extensions = this._readExtensions(HANDSHAKE_TYPE.CLIENT_HELLO, buf);
    if (! extensions.has(EXTENSION_TYPE.SUPPORTED_VERSIONS)) {
      throw new TLSError(ALERT_DESCRIPTION.MISSING_EXTENSION);
    }
    if (extensions.get(EXTENSION_TYPE.SUPPORTED_VERSIONS).versions.indexOf(VERSION_TLS_1_3) === -1) {
      throw new TLSError(ALERT_DESCRIPTION.PROTOCOL_VERSION);
    }
    // Was the PreSharedKey extension the last one?
    if (extensions.has(EXTENSION_TYPE.PRE_SHARED_KEY)) {
      if (extensions.lastSeenExtension !== EXTENSION_TYPE.PRE_SHARED_KEY) {
        throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
      }
    }
    return new this(random, sessionId, extensions);
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
    this._writeExtensions(buf, this.extensions);
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

  constructor(random, sessionId, extensions) {
    super();
    this.random = random;
    this.sessionId = sessionId;
    this.extensions = extensions;
  }

  get TYPE_TAG() {
    return HANDSHAKE_TYPE.SERVER_HELLO;
  }

  static _read(buf) {
    // Fixed value for legacy_version.
    if (buf.readUint16() !== VERSION_TLS_1_2) {
      throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
    }
    // Random bytes from the server.
    const random = buf.readBytes(32);
    // It should have echoed our vector for legacy_session_id.
    const sessionId = buf.readVectorBytes8();
    // It should have selected our single offered ciphersuite.
    if (buf.readUint16() !== TLS_AES_128_GCM_SHA256) {
      throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
    }
    // legacy_compression_method must be zero.
    if (buf.readUint8() !== 0) {
      throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
    }
    const extensions = this._readExtensions(HANDSHAKE_TYPE.SERVER_HELLO, buf);
    if (! extensions.has(EXTENSION_TYPE.SUPPORTED_VERSIONS)) {
      throw new TLSError(ALERT_DESCRIPTION.MISSING_EXTENSION);
    }
    if (extensions.get(EXTENSION_TYPE.SUPPORTED_VERSIONS).selectedVersion !== VERSION_TLS_1_3) {
      throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
    }
    return new this(random, sessionId, extensions);
  }

  _write(buf) {
    buf.writeUint16(VERSION_TLS_1_2);
    buf.writeBytes(this.random);
    buf.writeVectorBytes8(this.sessionId);
    // Our single supported ciphersuite
    buf.writeUint16(TLS_AES_128_GCM_SHA256);
    // A single zero byte for legacy_compression_method
    buf.writeUint8(0);
    this._writeExtensions(buf, this.extensions);
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
  constructor(extensions) {
    super();
    this.extensions = extensions;
  }

  get TYPE_TAG() {
    return HANDSHAKE_TYPE.ENCRYPTED_EXTENSIONS;
  }

  static _read(buf) {
    const extensions = this._readExtensions(HANDSHAKE_TYPE.ENCRYPTED_EXTENSIONS, buf);
    return new this(extensions);
  }

  _write(buf) {
    this._writeExtensions(buf, this.extensions);
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


// The NewSessionTicket message:
//
//   struct {
//    uint32 ticket_lifetime;
//    uint32 ticket_age_add;
//    opaque ticket_nonce < 0..255 >;
//    opaque ticket < 1..2 ^ 16 - 1 >;
//    Extension extensions < 0..2 ^ 16 - 2 >;
//  } NewSessionTicket;
//
// We don't actually make use of these, but we need to be able
// to accept them and do basic validation.

export class NewSessionTicket extends HandshakeMessage {
  constructor(ticketLifetime, ticketAgeAdd, ticketNonce, ticket, extensions) {
    super();
    this.ticketLifetime = ticketLifetime;
    this.ticketAgeAdd = ticketAgeAdd;
    this.ticketNonce = ticketNonce;
    this.ticket = ticket;
    this.extensions = extensions;
  }

  get TYPE_TAG() {
    return HANDSHAKE_TYPE.NEW_SESSION_TICKET;
  }

  static _read(buf) {
    const ticketLifetime = buf.readUint32();
    const ticketAgeAdd = buf.readUint32();
    const ticketNonce = buf.readVectorBytes8();
    const ticket = buf.readVectorBytes16();
    if (ticket.byteLength < 1) {
      throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
    }
    const extensions = this._readExtensions(HANDSHAKE_TYPE.NEW_SESSION_TICKET, buf);
    return new this(ticketLifetime, ticketAgeAdd, ticketNonce, ticket, extensions);
  }

  _write(buf) {
    buf.writeUint32(this.ticketLifetime);
    buf.writeUint32(this.ticketAgeAdd);
    buf.writeVectorBytes8(this.ticketNonce);
    buf.writeVectorBytes16(this.ticket);
    this._writeExtensions(buf, this.extensions);
  }
}
