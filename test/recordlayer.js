/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const MAX_RECORD_SIZE = Math.pow(2, 14);
const MAX_ENCRYPTED_RECORD_SIZE = MAX_RECORD_SIZE + 256;
const MAX_SEQUENCE_NUMBER = Math.pow(2, 24);

describe('the EncryptionState and DecryptionState classes', () => {
  let es, ds;

  beforeEach(async () => {
    es = await EncryptionState.create(zeros(32));
    ds = await DecryptionState.create(zeros(32));
  });

  it('uses crypto.subtle to encrypt and decrypt stuff', async () => {
    let data;
    sinon.spy(crypto.subtle, 'encrypt');
    try {
      data = await es.encrypt(TEST_VECTORS.SERVER_RAW_APP_DATA, zeros(12));
      assert.equal(crypto.subtle.encrypt.callCount, 1);
    } finally {
      crypto.subtle.encrypt.restore();
    }
    sinon.spy(crypto.subtle, 'decrypt');
    try {
      assert.ok(bytesAreEqual(
        await ds.decrypt(data, zeros(12)),
        TEST_VECTORS.SERVER_RAW_APP_DATA
      ));
    } finally {
      crypto.subtle.decrypt.restore();
    }
  });

  it('prevent wrapping of the sequence number', async () => {
    es.seqnum = MAX_SEQUENCE_NUMBER - 1;
    await es.encrypt(TEST_VECTORS.SERVER_RAW_APP_DATA, zeros(12));
    assert.equal(es.seqnum, MAX_SEQUENCE_NUMBER);
    await assert.throwsAsync(async () => {
      await es.encrypt(TEST_VECTORS.SERVER_RAW_APP_DATA, zeros(12));
    }, TLSError, 'INTERNAL_ERROR');

    ds.seqnum = MAX_SEQUENCE_NUMBER;
    await assert.throwsAsync(async () => {
      await ds.decrypt(TEST_VECTORS.SERVER_RAW_APP_DATA, zeros(12));
    }, TLSError, 'INTERNAL_ERROR');
  });
});

describe('the RecordLayer class', () => {

  let rl, SENT_DATA;

  beforeEach(() => {
    SENT_DATA = [];
    rl = new RecordLayer(data => SENT_DATA.push(data));
  });

  describe('when sending', () => {
    it('starts off sending plaintext records', async () => {
      await rl.send(22, utf8ToBytes('hello world'));
      assert.equal(SENT_DATA.length, 0);
      await rl.flush();
      assert.equal(SENT_DATA.length, 1);
      assert.equal(SENT_DATA[0][0], 22);
      assert.equal(SENT_DATA[0][1], 0x03);
      assert.equal(SENT_DATA[0][2], 0x03);
      assert.equal(SENT_DATA[0][3], 0);
      assert.equal(SENT_DATA[0][4], 11);
      assert.equal(bytesToUtf8(SENT_DATA[0].slice(5)), 'hello world');
    });

    it('does not send anything on flush if no data is buffered', async () => {
      await rl.flush();
      assert.equal(SENT_DATA.length, 0);
    });

    it('combines multiple sends of the same type into a single record', async () => {
      await rl.send(22, utf8ToBytes('hello world'));
      await rl.send(22, utf8ToBytes('hello again'));
      assert.equal(SENT_DATA.length, 0);
      await rl.flush();
      assert.equal(SENT_DATA.length, 1);
      assert.equal(SENT_DATA[0][0], 22);
      assert.equal(SENT_DATA[0][1], 0x03);
      assert.equal(SENT_DATA[0][2], 0x03);
      assert.equal(SENT_DATA[0][3], 0);
      assert.equal(SENT_DATA[0][4], 22);
      assert.equal(bytesToUtf8(SENT_DATA[0].slice(5)), 'hello worldhello again');
    });

    it('refuses to send data that would exceed the max record size', async () => {
      await assert.throwsAsync(async () => {
        await rl.send(22, zeros(MAX_RECORD_SIZE + 1));
      }, TLSError, 'INTERNAL_ERROR');
    });

    it('flushes multiple sends when they would combine to exceed the max record size', async () => {
      await rl.send(22, utf8ToBytes('hello world'));
      await rl.send(22, zeros(MAX_RECORD_SIZE - 1));
      assert.equal(SENT_DATA.length, 1);
      await rl.flush();
      assert.equal(SENT_DATA.length, 2);
      assert.equal(bytesToUtf8(SENT_DATA[0].slice(5)), 'hello world');
      assert.equal(bytesToHex(SENT_DATA[1].slice(5, 10)), '0000000000');
    });

    describe('after setting a send key', () => {
      let decryptor;

      // helper function for decrypting sent records.
      async function decryptInnerPlaintext(bytes) {
        const plaintext = await testHelpers.decryptInnerPlaintext(decryptor, bytes);
        return [plaintext.slice(0, -1), plaintext[plaintext.byteLength - 1]];
      }

      beforeEach(async () => {
        const key = zeros(32);
        crypto.getRandomValues(key);
        decryptor = await DecryptionState.create(key);
        await rl.setSendKey(key);
        assert.ok(rl._sendEncryptState);
        assert.equal(rl._recvDecryptState, null);
      });

      it('will send encrypted handshake records', async () => {
        await rl.send(22, utf8ToBytes('hello world'));
        await rl.flush();
        assert.equal(SENT_DATA.length, 1);
        assert.equal(SENT_DATA[0][0], 23);
        assert.equal(SENT_DATA[0][1], 0x03);
        assert.equal(SENT_DATA[0][2], 0x03);
        assert.equal(SENT_DATA[0][3], 0);
        assert.equal(SENT_DATA[0][4], 11 + 1 + 16);
        const ciphertext = SENT_DATA[0].slice(5);
        assert.equal(ciphertext.byteLength, 11 + 1 + 16);
        const [content, type] = await decryptInnerPlaintext(SENT_DATA[0]);
        assert.equal(bytesToUtf8(content), 'hello world');
        assert.equal(type, 22);
      });

      it('will send encrypted application data records', async () => {
        await rl.send(23, utf8ToBytes('hello world'));
        await rl.flush();
        assert.equal(SENT_DATA.length, 1);
        assert.equal(SENT_DATA[0][0], 23);
        assert.equal(SENT_DATA[0][1], 0x03);
        assert.equal(SENT_DATA[0][2], 0x03);
        assert.equal(SENT_DATA[0][3], 0);
        assert.equal(SENT_DATA[0][4], 11 + 1 + 16);
        const ciphertext = SENT_DATA[0].slice(5);
        assert.equal(ciphertext.byteLength, 11 + 1 + 16);
        const [content, type] = await decryptInnerPlaintext(SENT_DATA[0]);
        assert.equal(bytesToUtf8(content), 'hello world');
        assert.equal(type, 23);
      });

      it('flushes between multiple sends when they have different types', async () => {
        await rl.send(22, utf8ToBytes('handshake'));
        await rl.send(22, utf8ToBytes('handshake'));
        await rl.send(23, utf8ToBytes('app-data'));
        assert.equal(SENT_DATA.length, 1);
        await rl.flush();
        assert.equal(SENT_DATA.length, 2);

        assert.equal(SENT_DATA[0][0], 23);
        assert.equal(SENT_DATA[0][1], 0x03);
        assert.equal(SENT_DATA[0][2], 0x03);
        assert.equal(SENT_DATA[0][3], 0);
        assert.equal(SENT_DATA[0][4], 18 + 1 + 16);
        let [content, type] = await decryptInnerPlaintext(SENT_DATA[0]);
        assert.equal(bytesToUtf8(content), 'handshakehandshake');
        assert.equal(type, 22);

        assert.equal(SENT_DATA[1][0], 23);
        assert.equal(SENT_DATA[1][1], 0x03);
        assert.equal(SENT_DATA[1][2], 0x03);
        assert.equal(SENT_DATA[1][3], 0);
        assert.equal(SENT_DATA[1][4], 8 + 1 + 16);
        [content, type] = await decryptInnerPlaintext(SENT_DATA[1]);
        assert.equal(bytesToUtf8(content), 'app-data');
        assert.equal(type, 23);
      });
    });
  });

  describe('when receiving', () => {
    const makePlaintextRecord = testHelpers.makePlaintextRecord;

    it('starts off receiving plaintext records', () => {
      assert.equal(rl._recvDecryptState, null);
    });

    it('accepts plaintext handshake messages', async () => {
      const [type, bytes] = await rl.recv(makePlaintextRecord({ type: 22 }));
      assert.equal(type, 22);
      assert.ok(bytesAreEqual(bytes, arrayToBytes([1, 2, 3, 4, 5])));
    });

    it('accepts legacy version number on plaintext records', async () => {
      const [type, bytes] = await rl.recv(makePlaintextRecord({ type: 22, version: 0x0301 }));
      assert.equal(type, 22);
      assert.ok(bytesAreEqual(bytes, arrayToBytes([1, 2, 3, 4, 5])));
    });

    it('rejects record headers with unknown version numbers', async () => {
      await assert.throwsAsync(async () => {
        await rl.recv(makePlaintextRecord({ version: 0x0000 }));
      }, TLSError, 'DECODE_ERROR');
      await assert.throwsAsync(async () => {
        await rl.recv(makePlaintextRecord({ version: 0x1234 }));
      }, TLSError, 'DECODE_ERROR');
    });

    it('rejects records that are too large', async () => {
      // This record has acceptable length, but is badly formed.
      await assert.throwsAsync(async () => {
        await rl.recv(makePlaintextRecord({ contentLength: MAX_RECORD_SIZE }));
      }, TLSError, 'DECODE_ERROR');
      // This record's length field is too large.
      await assert.throwsAsync(async () => {
        await rl.recv(makePlaintextRecord({ contentLength: MAX_RECORD_SIZE + 1 }));
      }, TLSError, 'RECORD_OVERFLOW');
    });

    it('refuses to accept any data after a single record', async () => {
      await assert.throwsAsync(async () => {
        await rl.recv(makePlaintextRecord({
          trailer: zeros(12),
          type: 22
        }));
      }, TLSError, 'DECODE_ERROR');
    });

    it('refuses to accept a partial record', async () => {
      await assert.throwsAsync(async () => {
        await rl.recv(makePlaintextRecord({
          type: 22
        }).slice(0, -1));
      }, TLSError, 'DECODE_ERROR');
    });

    describe('after setting a recv key', () => {
      let encryptor;

      async function makeEncryptedInnerPlaintext(opts) {
        return await testHelpers.makeEncryptedInnerPlaintext(encryptor, opts);
      }

      async function makeEncryptedRecord(opts) {
        return await testHelpers.makeEncryptedRecord(encryptor, opts);
      }

      beforeEach(async () => {
        const key = zeros(32);
        crypto.getRandomValues(key);
        encryptor = await EncryptionState.create(key);
        await rl.setRecvKey(key);
        assert.ok(rl._recvDecryptState);
        assert.equal(rl._sendEncryptState, null);
      });

      it('accepts records generated by our helper functions above', async () => {
        const [type, bytes] = await rl.recv(await makeEncryptedRecord({}));
        assert.equal(type, 23);
        assert.ok(bytesAreEqual(bytes, arrayToBytes([1, 2, 3, 4, 5])));
      });

      it('accepts encrypted handshake message records', async () => {
        const [type, bytes] = await rl.recv(await makeEncryptedRecord({ type: 22 }));
        assert.equal(type, 22);
        assert.ok(bytesAreEqual(bytes, arrayToBytes([1, 2, 3, 4, 5])));
      });

      it('accepts encrypted application-data records', async () => {
        const [type, bytes] = await rl.recv(await makeEncryptedRecord({ content: utf8ToBytes('hello world'), type: 23 }));
        assert.equal(type, 23);
        assert.ok(bytesAreEqual(bytes, utf8ToBytes('hello world')));
      });

      it('accepts empty encrypted application-data records', async () => {
        const [type, bytes] = await rl.recv(await makeEncryptedRecord({ content: arrayToBytes([]), type: 23 }));
        assert.equal(type, 23);
        assert.equal(bytes.byteLength, 0);
      });

      it('correctly strips padding from padded encrypted records', async () => {
        const PAD_LENGTH = 12;
        const paddedCiphertext = await makeEncryptedInnerPlaintext({ content: utf8ToBytes('hello world'), padding: PAD_LENGTH, type: 23 });
        const unpaddedCiphertext = await makeEncryptedInnerPlaintext({ content: utf8ToBytes('hello world'), type: 23 });
        // Sanity-check that we actually padded it.
        assert.equal(paddedCiphertext.byteLength - unpaddedCiphertext.byteLength, PAD_LENGTH);
        const [type, bytes] = await rl.recv(await makeEncryptedRecord({ ciphertext: paddedCiphertext }));
        assert.equal(type, 23);
        assert.ok(bytesAreEqual(bytes, utf8ToBytes('hello world')));
      });

      it('correctly strips padding from empty encrypted records', async () => {
        const PAD_LENGTH = 12;
        const paddedCiphertext = await makeEncryptedInnerPlaintext({ content: arrayToBytes([]), padding: PAD_LENGTH, type: 23 });
        const unpaddedCiphertext = await makeEncryptedInnerPlaintext({ content: arrayToBytes([]), type: 23 });
        assert.equal(paddedCiphertext.byteLength - unpaddedCiphertext.byteLength, PAD_LENGTH);
        const [type, bytes] = await rl.recv(await makeEncryptedRecord({ ciphertext: paddedCiphertext }));
        assert.equal(type, 23);
        assert.equal(bytes.byteLength, 0);
      });

      it('refuses to accept any data after a single record', async () => {
        await assert.throwsAsync(async () => {
          await rl.recv(await makeEncryptedRecord({
            outerTrailer: zeros(12),
            type: 22
          }));
        }, TLSError, 'DECODE_ERROR');
      });

      it('refuses to accept a partial record', async () => {
        await assert.throwsAsync(async () => {
          await rl.recv((await makeEncryptedRecord({
            type: 22
          })).slice(0, -1));
        }, TLSError, 'DECODE_ERROR');
      });

      it('refuses to accept encrypted ChangeCipherSpec records', async () => {
        await assert.throwsAsync(async () => {
          await rl.recv(await makeEncryptedRecord({
            type: 20
          }));
        }, TLSError, 'DECODE_ERROR');
      });

      it('rejects encrypted records with unknown version numbers', async () => {
        await assert.throwsAsync(async () => {
          await rl.recv(await makeEncryptedRecord({ outerVersion: 0x0000 }));
        }, TLSError, 'DECODE_ERROR');
        await assert.throwsAsync(async () => {
          await rl.recv(await makeEncryptedRecord({ outerVersion: 0x1234 }));
        }, TLSError, 'DECODE_ERROR');
      });

      it('rejects legacy version number on encrypted records', async () => {
        await assert.throwsAsync(async () => {
          await rl.recv(await makeEncryptedRecord({ outerVersion: 0x0301 }));
        }, TLSError, 'DECODE_ERROR');
      });

      it('rejects encrypted records where the outer type is not application-data', async () => {
        await assert.throwsAsync(async () => {
          await rl.recv(await makeEncryptedRecord({ outerType: 22 }));
        }, TLSError, 'DECODE_ERROR');
      });

      it('rejects encrypted records that are too large', async () => {
        // This record has acceptable length, but is badly formed.
        await assert.throwsAsync(async () => {
          await rl.recv(await makeEncryptedRecord({ outerContentLength: MAX_ENCRYPTED_RECORD_SIZE }));
        }, TLSError, 'DECODE_ERROR');
        // This record's length field is too large.
        await assert.throwsAsync(async () => {
          await rl.recv(await makeEncryptedRecord({ outerContentLength: MAX_ENCRYPTED_RECORD_SIZE + 1 }));
        }, TLSError, 'RECORD_OVERFLOW');
      });

      it('rejects encrypted records where the plaintext is all padding', async () => {
        // This record has acceptable length, but is badly formed.
        await assert.throwsAsync(async () => {
          await rl.recv(await makeEncryptedRecord({ innerPlaintext: zeros(7) }));
        }, TLSError, 'UNEXPECTED_MESSAGE');
      });

      it('rejects encrypted records where the ciphertext has been tampered with', async () => {
        let ciphertext = await makeEncryptedInnerPlaintext({ content: utf8ToBytes('hello world'), type: 23 });
        ciphertext = testHelpers.tamper(ciphertext);
        await assert.throwsAsync(async () => {
          await rl.recv(await makeEncryptedRecord({ ciphertext }));
        }, TLSError, 'BAD_RECORD_MAC');
      });

      it('rejects encrypted records where the additional data has been tampered with', async () => {
        const record = await makeEncryptedRecord({
          content: utf8ToBytes('hello world'),
          outerVersion: 0x0301,
          type: 23
        });
        record[1] = 0x03;
        record[2] = 0x03;
        await assert.throwsAsync(async () => {
          await rl.recv(record);
        }, TLSError, 'BAD_RECORD_MAC');
      });
    });
  });
});
