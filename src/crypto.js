/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

//
// Low-level crypto primitives.
//
// This file implements the AEAD encrypt/decrypt and hashing routines
// for the TLS_AES_128_GCM_SHA256 ciphersuite.
//

import {
  assert,
  assertIsString,
  assertIsBytes,
  utf8ToBytes,
  bytesToHex,
  BufferWriter,
  EMPTY,
} from './utils.js';

export const AEAD_SIZE_INFLATION = 16;
export const KEY_LENGTH = 16;
export const IV_LENGTH = 12;
export const HASH_LENGTH = 32;

export async function prepareKey(key, mode) {
  return window.crypto.subtle.importKey('raw', key, { name: 'AES-GCM' }, false, [mode]);
}

export async function encrypt(key, iv, plaintext, additionalData) {
  const ciphertext = await window.crypto.subtle.encrypt({
    additionalData,
    iv,
    name: 'AES-GCM',
    tagLength: AEAD_SIZE_INFLATION * 8
  }, key, plaintext);
  assert(plaintext.byteLength + AEAD_SIZE_INFLATION === ciphertext.byteLength, 'incorrect AEAD_SIZE_INFLATION');
  return new Uint8Array(ciphertext);
}

export async function decrypt(key, iv, ciphertext, additionalData) {
  const plaintext = await window.crypto.subtle.decrypt({
    additionalData,
    iv,
    name: 'AES-GCM',
    tagLength: AEAD_SIZE_INFLATION * 8
  }, key, ciphertext);
  assert(plaintext.byteLength + AEAD_SIZE_INFLATION === ciphertext.byteLength, 'incorrect AEAD_SIZE_INFLATION');
  return new Uint8Array(plaintext);
}

export async function hash(message) {
  return new Uint8Array(await window.crypto.subtle.digest({ name: 'SHA-256' }, message));
}

export async function hmac(keyBytes, message) {
  const key = await window.crypto.subtle.importKey('raw', keyBytes, {
    hash: { name: 'SHA-256' },
    name: 'HMAC',
  }, false, ['sign']);
  const sig = await window.crypto.subtle.sign({ name: 'HMAC' }, key, message);
  return new Uint8Array(sig);
}

export async function hkdfExtract(salt, ikm) {
  // Ref https://tools.ietf.org/html/rfc5869#section-2.2
  return await hmac(salt, ikm);
}

export async function hkdfExpand(prk, info, length) {
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

export async function hkdfExpandLabel(secret, label, context, length) {
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

export async function getRandomBytes(size) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return bytes;
}