/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

// TLS1.3 Key Schedule.
//
// In this file we implement the "key schedule" from
// https://tools.ietf.org/html/rfc8446#section-7.1, which
// defines how to calculate various keys as the handshake
// state progresses.
//


import {
  assert,
  BufferWriter,
  EMPTY,
  zeros,
} from './utils.js';
import {
  hkdfExpand,
  hkdfExtract,
  hkdfExpandLabel,
  HASH_LENGTH,
  hash,
  hmac,
} from './crypto.js';

const STAGE_UNINITIALIZED = 0;
const STAGE_EARLY_SECRET = 1;
const STAGE_HANDSHAKE_SECRET = 2;
const STAGE_MASTER_SECRET = 3;

export class KeySchedule {
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
