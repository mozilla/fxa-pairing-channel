/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

describe('the KeySchedule class', () => {

  let ks;
  beforeEach(() => {
    ks = new KeySchedule();
  });

  it('errors if adding ECDHE output before PSK', async () => {
    await assert.throwsAsync(async () => {
      await ks.addECDHE(null);
    }, TLSError, 'INTERNAL_ERROR');
  });

  it('errors if finalizing before PSK', async () => {
    await assert.throwsAsync(async () => {
      await ks.finalize();
    }, TLSError, 'INTERNAL_ERROR');
  });

  describe('accepts a PSK, and then', () => {
    beforeEach(async () => {
      await ks.addPSK(TEST_VECTORS.PSK);
    });

    it('calculates the correct intermediate keys', () => {
      assert.ok(bytesAreEqual(
        ks.extBinderKey,
        TEST_VECTORS.KEYS_EXT_BINDER
      ));
      assert.equal(ks.clientHandshakeTrafficSecret, null);
      assert.equal(ks.serverHandshakeTrafficSecret, null);
      assert.equal(ks.clientApplicationTrafficSecret, null);
      assert.equal(ks.serverApplicationTrafficSecret, null);
    });

    it('errors if adding PSK again', async () => {
      await assert.throwsAsync(async () => {
        await ks.addPSK(TEST_VECTORS.PSK);
      }, TLSError, 'INTERNAL_ERROR');
    });

    it('errors if finalizing before ECDHE output', async () => {
      await assert.throwsAsync(async () => {
        await ks.finalize();
      }, TLSError, 'INTERNAL_ERROR');
    });

    describe('accepts ECDHE output, and then', () => {
      beforeEach(async () => {
        ks.addToTranscript(TEST_VECTORS.KEYS_PLAINTEXT_TRANSCRIPT);
        await ks.addECDHE(null);
      });

      it('calculates the correct intermediate keys', () => {
        assert.equal(ks.extBinderKey, null);
        assert.ok(bytesAreEqual(
          ks.clientHandshakeTrafficSecret,
          TEST_VECTORS.KEYS_CLIENT_HANDSHAKE_TRAFFIC_SECRET
        ));
        assert.ok(bytesAreEqual(
          ks.serverHandshakeTrafficSecret,
          TEST_VECTORS.KEYS_SERVER_HANDSHAKE_TRAFFIC_SECRET
        ));
        assert.equal(ks.clientApplicationTrafficSecret, null);
        assert.equal(ks.serverApplicationTrafficSecret, null);
      });

      it('errors if adding PSK again', async () => {
        await assert.throwsAsync(async () => {
          await ks.addPSK(null);
        }, TLSError, 'INTERNAL_ERROR');
      });

      it('errors if adding ECDHE output again', async () => {
        await assert.throwsAsync(async () => {
          await ks.addECDHE(null);
        }, TLSError, 'INTERNAL_ERROR');
      });

      describe('can be finalized, and then', () => {
        beforeEach(async () => {
          ks.addToTranscript(TEST_VECTORS.KEYS_ENCRYPTED_TRANSCRIPT);
          await ks.finalize();
        });

        it('calculates the correct final keys', () => {
          assert.equal(ks.extBinderKey, null);
          assert.equal(ks.clientHandshakeTrafficSecret, null);
          assert.equal(ks.serverHandshakeTrafficSecret, null);
          assert.ok(bytesAreEqual(
            ks.clientApplicationTrafficSecret,
            TEST_VECTORS.KEYS_CLIENT_APPLICATION_TRAFFIC_SECRET_0
          ));
          assert.ok(bytesAreEqual(
            ks.serverApplicationTrafficSecret,
            TEST_VECTORS.KEYS_SERVER_APPLICATION_TRAFFIC_SECRET_0
          ));
        });

        it('errors if adding PSK again', async () => {
          await assert.throwsAsync(async () => {
            await ks.addPSK(null);
          }, TLSError, 'INTERNAL_ERROR');
        });

        it('errors if adding ECDHE output again', async () => {
          await assert.throwsAsync(async () => {
            await ks.addECDHE(null);
          }, TLSError, 'INTERNAL_ERROR');
        });

        it('errors if finalizing again', async () => {
          await assert.throwsAsync(async () => {
            await ks.finalize();
          }, TLSError, 'INTERNAL_ERROR');
        });
      });
    });
  });
});
