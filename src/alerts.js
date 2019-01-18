/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable sorting/sort-object-props */
export const ALERT_LEVEL = {
  WARNING: 1,
  FATAL: 2
};

export const ALERT_DESCRIPTION = {
  CLOSE_NOTIFY: 0,
  UNEXPECTED_MESSAGE: 10,
  BAD_RECORD_MAC: 20,
  RECORD_OVERFLOW: 22,
  HANDSHAKE_FAILURE: 40,
  ILLEGAL_PARAMETER: 47,
  DECODE_ERROR: 50,
  DECRYPT_ERROR: 51,
  PROTOCOL_VERSION: 70,
  INTERNAL_ERROR: 80,
  MISSING_EXTENSION: 109,
  UNSUPPORTED_EXTENSION: 110,
  UNKNOWN_PSK_IDENTITY: 115,
  NO_APPLICATION_PROTOCOL: 120,
};
/* eslint-enable sorting/sort-object-props */

function alertTypeToName(type) {
  for (const name in ALERT_DESCRIPTION) {
    if (ALERT_DESCRIPTION[name] === type) {
      return `${name} (${type})`;
    }
  }
  return `UNKNOWN (${type})`;
}

export class TLSAlert extends Error {
  constructor(description, level) {
    super(`TLS Alert: ${alertTypeToName(description)}`);
    this.description = description;
    this.level = level;
  }

  static fromBytes(bytes) {
    if (bytes.byteLength !== 2) {
      throw new TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
    }
    switch (bytes[1]) {
      case ALERT_DESCRIPTION.CLOSE_NOTIFY:
        if (bytes[0] !== ALERT_LEVEL.WARNING) {
          // Close notifications should be fatal.
          throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
        }
        return new TLSCloseNotify();
      default:
        return new TLSError(bytes[1]);
    }
  }

  toBytes() {
    return new Uint8Array([this.level, this.description]);
  }
}

export class TLSCloseNotify extends TLSAlert {
  constructor() {
    super(ALERT_DESCRIPTION.CLOSE_NOTIFY, ALERT_LEVEL.WARNING);
  }
}

export class TLSError extends TLSAlert {
  constructor(description = ALERT_DESCRIPTION.INTERNAL_ERROR) {
    super(description, ALERT_LEVEL.FATAL);
  }
}
