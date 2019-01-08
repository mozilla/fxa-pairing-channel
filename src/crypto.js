/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

//
// Low-level crypto primitives.
//
// We haven't actually implemented any of the crypto yet,
// but when we do, this is the file where we'll define the basics.
//

import {
  assert,
} from './utils.js';

export const AEAD_SIZE_INFLATION = 4;
export const HASH_LENGTH = 32;

// Fake crypto for now, just to try out the message layer.

export async function AEADEncrypt(key, iv, seqNum, plaintext, additionalData) {
  const ciphertext = new Uint8Array(plaintext.byteLength + 4);
  ciphertext[0] = seqNum >> 24;
  ciphertext[1] = seqNum >> 16;
  ciphertext[2] = seqNum >> 8;
  ciphertext[3] = seqNum;
  ciphertext.set(plaintext, 4);
  return ciphertext;
}

export async function AEADDecrypt(key, iv, seqNum, ciphertext, additionalData) {
  let foundSeqNum = ciphertext[0];
  foundSeqNum = foundSeqNum << 8 | ciphertext[1];
  foundSeqNum = foundSeqNum << 8 | ciphertext[2];
  foundSeqNum = foundSeqNum << 8 | ciphertext[3];
  assert(foundSeqNum === seqNum, 'sequence number mismatch');
  const plaintext = new Uint8Array(ciphertext.buffer, ciphertext.byteOffset + 4, ciphertext.byteLength - 4);
  return plaintext;
}

export async function getRandomBytes(crypto, size) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return bytes;
}
