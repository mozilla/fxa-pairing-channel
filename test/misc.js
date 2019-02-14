/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

describe('HKDF', () => {
  it('refuses to generate ridiculously large quantities of hash output', async () => {
    await assert.throwsAsync(async () => {
      await hkdfExpand(TEST_VECTORS.PSK, zeros(32), 32 * 256);
    }, TLSError, 'INTERNAL_ERROR');
  });

  it('refuses to generate zero-length hash output', async () => {
    await assert.throwsAsync(async () => {
      await hkdfExpand(TEST_VECTORS.PSK, zeros(32), 0);
    }, TLSError, 'INTERNAL_ERROR');
    await assert.throwsAsync(async () => {
      await hkdfExpand(TEST_VECTORS.PSK, zeros(32), -1);
    }, TLSError, 'INTERNAL_ERROR');
  });
});

describe('TLSError', () => {
  it('gives a useful default name to unknown description numbers', async () => {
    const err = new TLSError(255);
    assert.equal(err.message, 'TLS Alert: UNKNOWN (255)');
  });
});
