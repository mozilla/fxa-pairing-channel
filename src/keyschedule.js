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
  bytesToHex,
} from './utils.js';
import {
  hkdfExpand,
  hkdfExtract,
  hkdfExpandLabel,
  HASH_LENGTH,
  hash,
} from './crypto.js';

const ZERO = new Uint8Array(HASH_LENGTH);
const EMPTY = new Uint8Array(0);

const STAGE_UNINITIALIZED = 0;
const STAGE_EARLY_SECRET = 1;
const STAGE_HANDSHAKE_SECRET = 2;
const STAGE_MASTER_SECRET = 3;

export class KeySchedule {
  constructor() {
    // WebCrypto doesn't support a rolling hash construct, so we have to
    // keep the entire message transcript in memory
    this.transcript = new BufferWriter(1024 * 1024); // XXX TODO: growable buffer?
    this.secret = null;
    this.stage = STAGE_UNINITIALIZED;
  }

  async appendTranscriptMessage(bytes) {
    this.transcript.writeBytes(bytes);
  }

  async deriveSecret(label, transcript = undefined) {
    return await hkdfExpandLabel(this.secret, label, await this.getCurrentTranscriptHash(transcript), HASH_LENGTH);
  }

  async getCurrentTranscriptHash(transcript = undefined) {
    transcript = transcript || this.transcript.slice(-this.transcript.tell(), this.transcript.tell());
    return await hash(transcript);
  }

  async addPSK(psk) {
    // Use the PSK (if any) to calculate the "early secret".
    psk = psk || ZERO;
    assert(this.stage === STAGE_UNINITIALIZED, 'PSK added at incorrect state');
    this.secret = await hkdfExtract(ZERO, psk);
    this.stage = STAGE_EARLY_SECRET;
  }

  async addECDHE(ecdhe) {
    // Mix in the ECDHE output (if any) to calculate the "handshake secret".
    ecdhe = ecdhe || ZERO;
    assert(this.stage === STAGE_EARLY_SECRET, 'ECDHE added at incorrect state');
    this.secret = await hkdfExtract(await this.deriveSecret('derived', EMPTY), ecdhe);
    this.stage = STAGE_HANDSHAKE_SECRET;
  }

  async finalize() {
    assert(this.stage === STAGE_HANDSHAKE_SECRET, 'finalized in incorrect state');
    this.secret = await hkdfExtract(await this.deriveSecret('derived', EMPTY), ZERO);
    this.stage = STAGE_MASTER_SECRET;
  }
}