/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

//
// Low-level crypto primitives.
//
// This file implements the AEAD encrypt/decrypt and hashing routines
// for the TLS_AES_128_GCM_SHA256 ciphersuite. They are (thankfully)
// fairly light-weight wrappers around what's available via the WebCrypto
// API.
//

import { utf8ToBytes, BufferWriter } from './utils.js';
import { ALERT_DESCRIPTION, TLSError } from './alerts.js';

export const AEAD_SIZE_INFLATION = 16;
export const KEY_LENGTH = 16;
export const IV_LENGTH = 12;
export const HASH_LENGTH = 32;

export async function prepareKey(key, mode) {
  return crypto.subtle.importKey('raw', key, { name: 'AES-GCM' }, false, [mode]);
}

export async function encrypt(key, iv, plaintext, additionalData) {
  const ciphertext = await crypto.subtle.encrypt({
    additionalData,
    iv,
    name: 'AES-GCM',
    tagLength: AEAD_SIZE_INFLATION * 8
  }, key, plaintext);
  return new Uint8Array(ciphertext);
}

export async function decrypt(key, iv, ciphertext, additionalData) {
  try {
    const plaintext = await crypto.subtle.decrypt({
      additionalData,
      iv,
      name: 'AES-GCM',
      tagLength: AEAD_SIZE_INFLATION * 8
    }, key, ciphertext);
    return new Uint8Array(plaintext);
  } catch (err) {
    // Yes, we really do throw 'decrypt_error' when failing to verify a HMAC,
    // and a 'bad_record_mac' error when failing to decrypt.
    throw new TLSError(ALERT_DESCRIPTION.BAD_RECORD_MAC);
  }
}

export async function hash(message) {
  return new Uint8Array(await crypto.subtle.digest({ name: 'SHA-256' }, message));
}

export async function hmac(keyBytes, message) {
  const key = await crypto.subtle.importKey('raw', keyBytes, {
    hash: { name: 'SHA-256' },
    name: 'HMAC',
  }, false, ['sign']);
  const sig = await crypto.subtle.sign({ name: 'HMAC' }, key, message);
  return new Uint8Array(sig);
}

export async function verifyHmac(keyBytes, signature, message) {
  const key = await crypto.subtle.importKey('raw', keyBytes, {
    hash: { name: 'SHA-256' },
    name: 'HMAC',
  }, false, ['verify']);
  if (! await crypto.subtle.verify({ name: 'HMAC' }, key, signature, message)) {
    // Yes, we really do throw 'decrypt_error' when failing to verify a HMAC,
    // and a 'bad_record_mac' error when failing to decrypt.
    throw new TLSError(ALERT_DESCRIPTION.DECRYPT_ERROR);
  }
}

export async function hkdfExtract(salt, ikm) {
  // Ref https://tools.ietf.org/html/rfc5869#section-2.2
  return await hmac(salt, ikm);
}

export async function hkdfExpand(prk, info, length) {
  // Ref https://tools.ietf.org/html/rfc5869#section-2.3
  const N = Math.ceil(length / HASH_LENGTH);
  if (N <= 0) {
    throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
  }
  if (N >= 255) {
    throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
  }
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
  return output.slice(0, length);
}

export async function hkdfExpandLabel(secret, label, context, length) {
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
