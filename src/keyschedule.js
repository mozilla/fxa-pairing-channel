/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// TLS1.3 Key Schedule.
//
// In this file we implement the "key schedule" from
// https://tools.ietf.org/html/rfc8446#section-7.1, which
// defines how to calculate various keys as the handshake
// state progresses.


import { BufferWriter, EMPTY, zeros } from './utils.js';
import { ALERT_DESCRIPTION, TLSError } from './alerts.js';
import {
  hkdfExtract,
  hkdfExpandLabel,
  HASH_LENGTH,
  hash,
  hmac,
  verifyHmac,
} from './crypto.js';


// The `KeySchedule` class progresses through three stages corresponding
// to the three phases of the TLS1.3 key schedule:
//
//   UNINITIALIZED
//       |
//       | addPSK()
//       v
//   EARLY_SECRET
//       |
//       | addECDHE()
//       v
//   HANDSHAKE_SECRET
//       |
//       | finalize()
//       v
//   MASTER_SECRET
//
// It will error out if the calling code attempts to add key material
// in the wrong order.

const STAGE_UNINITIALIZED = 0;
const STAGE_EARLY_SECRET = 1;
const STAGE_HANDSHAKE_SECRET = 2;
const STAGE_MASTER_SECRET = 3;

export class KeySchedule {
  constructor() {
    this.stage = STAGE_UNINITIALIZED;
    // WebCrypto doesn't support a rolling hash construct, so we have to
    // keep the entire message transcript in memory.
    this.transcript = new BufferWriter();
    // This tracks the main secret from with other keys are derived at each stage.
    this.secret = null;
    // And these are all the various keys we'll derive as the handshake progresses.
    this.extBinderKey = null;
    this.clientHandshakeTrafficSecret = null;
    this.serverHandshakeTrafficSecret = null;
    this.clientApplicationTrafficSecret = null;
    this.serverApplicationTrafficSecret = null;
  }

  async addPSK(psk) {
    // Use the selected PSK (if any) to calculate the "early secret".
    if (psk === null) {
      psk = zeros(HASH_LENGTH);
    }
    if (this.stage !== STAGE_UNINITIALIZED) {
      throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
    }
    this.stage = STAGE_EARLY_SECRET;
    this.secret = await hkdfExtract(zeros(HASH_LENGTH), psk);
    this.extBinderKey = await this.deriveSecret('ext binder', EMPTY);
    this.secret = await this.deriveSecret('derived', EMPTY);
  }

  async addECDHE(ecdhe) {
    // Mix in the ECDHE output (if any) to calculate the "handshake secret".
    if (ecdhe === null) {
      ecdhe = zeros(HASH_LENGTH);
    }
    if (this.stage !== STAGE_EARLY_SECRET) {
      throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
    }
    this.stage = STAGE_HANDSHAKE_SECRET;
    this.extBinderKey = null;
    this.secret = await hkdfExtract(this.secret, ecdhe);
    this.clientHandshakeTrafficSecret = await this.deriveSecret('c hs traffic');
    this.serverHandshakeTrafficSecret = await this.deriveSecret('s hs traffic');
    this.secret = await this.deriveSecret('derived', EMPTY);
  }

  async finalize() {
    if (this.stage !== STAGE_HANDSHAKE_SECRET) {
      throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
    }
    this.stage = STAGE_MASTER_SECRET;
    this.clientHandshakeTrafficSecret = null;
    this.serverHandshakeTrafficSecret = null;
    this.secret = await hkdfExtract(this.secret, zeros(HASH_LENGTH));
    this.clientApplicationTrafficSecret = await this.deriveSecret('c ap traffic');
    this.serverApplicationTrafficSecret = await this.deriveSecret('s ap traffic');
    this.secret = null;
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

  async verifyFinishedMAC(baseKey, mac, transcript = undefined) {
    transcript = transcript || this.getTranscript();
    const finishedKey = await hkdfExpandLabel(baseKey, 'finished', EMPTY, HASH_LENGTH);
    await verifyHmac(finishedKey, mac, await hash(transcript));
  }
}
