/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

//
// Extension parsing.
//
// This file contains some helpers for reading/writing the various kinds
// of Extension that might appear in a HandshakeMessage.
//

import { ALERT_DESCRIPTION, TLSError } from './alerts.js';
import { HANDSHAKE_TYPE } from './messages.js';
import { HASH_LENGTH } from './crypto.js';

/* eslint-disable sorting/sort-object-props */
export const EXTENSION_TYPE = {
  PRE_SHARED_KEY: 41,
  SUPPORTED_VERSIONS: 43,
  PSK_KEY_EXCHANGE_MODES: 45,
};
/* eslint-enable sorting/sort-object-props */

// Base class for generic reading/writing of extensions,
// which are all uniformly formatted as:
//
//   struct {
//     ExtensionType extension_type;
//     opaque extension_data<0..2^16-1>;
//   } Extension;
//
// Extensions always appear inside of a handshake message,
// and their internal structure may differ based on the
// type of that message.

export class Extension {

  get TYPE_TAG() {
    throw new Error('not implemented');
  }

  static read(messageType, buf) {
    const type = buf.readUint16();
    let ext = {
      TYPE_TAG: type,
    };
    buf.readVector16(buf => {
      switch (type) {
        case EXTENSION_TYPE.PRE_SHARED_KEY:
          ext = PreSharedKeyExtension._read(messageType, buf);
          break;
        case EXTENSION_TYPE.SUPPORTED_VERSIONS:
          ext = SupportedVersionsExtension._read(messageType, buf);
          break;
        case EXTENSION_TYPE.PSK_KEY_EXCHANGE_MODES:
          ext = PskKeyExchangeModesExtension._read(messageType, buf);
          break;
        default:
          // Skip over unrecognised extensions.
          buf.incr(buf.length());
      }
      if (buf.hasMoreBytes()) {
        throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
      }
    });
    return ext;
  }

  write(messageType, buf) {
    buf.writeUint16(this.TYPE_TAG);
    buf.writeVector16(buf => {
      this._write(messageType, buf);
    });
  }

  static _read(messageType, buf) {
    throw new Error('not implemented');
  }

  static _write(messageType, buf) {
    throw new Error('not implemented');
  }
}

// The PreSharedKey extension:
//
//  struct {
//    opaque identity<1..2^16-1>;
//    uint32 obfuscated_ticket_age;
//  } PskIdentity;
//  opaque PskBinderEntry<32..255>;
//  struct {
//    PskIdentity identities<7..2^16-1>;
//    PskBinderEntry binders<33..2^16-1>;
//  } OfferedPsks;
//  struct {
//    select(Handshake.msg_type) {
//      case client_hello: OfferedPsks;
//      case server_hello: uint16 selected_identity;
//    };
//  } PreSharedKeyExtension;

export class PreSharedKeyExtension extends Extension {
  constructor(identities, binders, selectedIdentity) {
    super();
    this.identities = identities;
    this.binders = binders;
    this.selectedIdentity = selectedIdentity;
  }

  get TYPE_TAG() {
    return EXTENSION_TYPE.PRE_SHARED_KEY;
  }

  static _read(messageType, buf) {
    let identities = null, binders = null, selectedIdentity = null;
    switch (messageType) {
      case HANDSHAKE_TYPE.CLIENT_HELLO:
        identities = []; binders = [];
        buf.readVector16(buf => {
          const identity = buf.readVectorBytes16();
          buf.readBytes(4); // Skip over the ticket age.
          identities.push(identity);
        });
        buf.readVector16(buf => {
          const binder = buf.readVectorBytes8();
          if (binder.byteLength < HASH_LENGTH) {
            throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
          }
          binders.push(binder);
        });
        if (identities.length !== binders.length) {
          throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
        }
        break;
      case HANDSHAKE_TYPE.SERVER_HELLO:
        selectedIdentity = buf.readUint16();
        break;
      default:
        throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
    }
    return new this(identities, binders, selectedIdentity);
  }

  _write(messageType, buf) {
    switch (messageType) {
      case HANDSHAKE_TYPE.CLIENT_HELLO:
        buf.writeVector16(buf => {
          this.identities.forEach(pskId => {
            buf.writeVectorBytes16(pskId);
            buf.writeUint32(0); // Zero for "tag age" field.
          });
        });
        buf.writeVector16(buf => {
          this.binders.forEach(pskBinder => {
            buf.writeVectorBytes8(pskBinder);
          });
        });
        break;
      case HANDSHAKE_TYPE.SERVER_HELLO:
        buf.writeUint16(this.selectedIdentity);
        break;
      default:
        throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
    }
  }
}


// The SupportedVersions extension:
//
//  struct {
//    select(Handshake.msg_type) {
//      case client_hello:
//        ProtocolVersion versions < 2..254 >;
//      case server_hello:
//        ProtocolVersion selected_version;
//    };
//  } SupportedVersions;

export class SupportedVersionsExtension extends Extension {
  constructor(versions, selectedVersion) {
    super();
    this.versions = versions;
    this.selectedVersion = selectedVersion;
  }

  get TYPE_TAG() {
    return EXTENSION_TYPE.SUPPORTED_VERSIONS;
  }

  static _read(messageType, buf) {
    let versions = null, selectedVersion = null;
    switch (messageType) {
      case HANDSHAKE_TYPE.CLIENT_HELLO:
        versions = [];
        buf.readVector8(buf => {
          versions.push(buf.readUint16());
        });
        break;
      case HANDSHAKE_TYPE.SERVER_HELLO:
        selectedVersion = buf.readUint16();
        break;
      default:
        throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
    }
    return new this(versions, selectedVersion);
  }

  _write(messageType, buf) {
    switch (messageType) {
      case HANDSHAKE_TYPE.CLIENT_HELLO:
        buf.writeVector8(buf => {
          this.versions.forEach(version => {
            buf.writeUint16(version);
          });
        });
        break;
      case HANDSHAKE_TYPE.SERVER_HELLO:
        buf.writeUint16(this.selectedVersion);
        break;
      default:
        throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
    }
  }
}


export class PskKeyExchangeModesExtension extends Extension {
  constructor(modes) {
    super();
    this.modes = modes;
  }

  get TYPE_TAG() {
    return EXTENSION_TYPE.PSK_KEY_EXCHANGE_MODES;
  }

  static _read(messageType, buf) {
    const modes = [];
    switch (messageType) {
      case HANDSHAKE_TYPE.CLIENT_HELLO:
        buf.readVector8(buf => {
          modes.push(buf.readUint8());
        });
        break;
      default:
        throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
    }
    return new this(modes);
  }

  _write(messageType, buf) {
    switch (messageType) {
      case HANDSHAKE_TYPE.CLIENT_HELLO:
        buf.writeVector8(buf => {
          this.modes.forEach(mode => {
            buf.writeUint8(mode);
          });
        });
        break;
      default:
        throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
    }
  }
}
