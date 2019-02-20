/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// These are helper functions for generating a variety of byte structs
// used by the protocol, optionally with a variety of errors or irregularities
// for testing purposes.
//
// The code here duplicates some of the logic of the classes we use for
// creating such structs in the source codebase itself, and a future refactor
// might enable us to reduce that duplication.  For now though, it seems better
// to suffer such duplication than to add things to the source codebase that
// might accidentally generate badly-formed data in production use.

const testHelpers = {

  nextTick: function() {
    return new Promise(res => setTimeout(res, 1));
  },

  tamper: function (bytes, where = 0) {
    const tampered = bytes.slice();
    tampered[where] += 1;
    assert.notOk(bytesAreEqual(bytes, tampered));
    return tampered;
  },

  decryptInnerPlaintext: async function (cipherstate, bytes) {
    return await cipherstate.decrypt(bytes.slice(5), bytes.slice(0, 5));
  },

  makePlaintextRecord: function (opts) {
    const buf = new BufferWriter();
    const content = typeof opts.content !== 'undefined' ? opts.content : arrayToBytes([1, 2, 3, 4, 5]);
    buf.writeUint8(typeof opts.type !== 'undefined' ? opts.type : 22);
    buf.writeUint16(typeof opts.version !== 'undefined' ? opts.version : 0x0303);
    buf.writeUint16(typeof opts.contentLength !== 'undefined' ? opts.contentLength : content.byteLength);
    buf.writeBytes(content);
    if (typeof opts.trailer !== 'undefined') {
      buf.writeBytes(opts.trailer);
    }
    return buf.flush();
  },

  makeEncryptedInnerPlaintext: async function (cipherstate, opts) {
    const adBuf = new BufferWriter();
    const innerPlaintextBuf = new BufferWriter();
    const plaintext = typeof opts.content !== 'undefined' ? opts.content : arrayToBytes([1, 2, 3, 4, 5]);
    if (typeof opts.innerPlaintext !== 'undefined') {
      innerPlaintextBuf.writeBytes(opts.innerPlaintext);
    } else {
      innerPlaintextBuf.writeBytes(plaintext);
      innerPlaintextBuf.writeUint8(typeof opts.type !== 'undefined' ? opts.type : 23);
      if (opts.padding) {
        innerPlaintextBuf.writeBytes(zeros(opts.padding));
      }
    }
    const ciphertextLength = innerPlaintextBuf.tell() + 16;
    adBuf.writeUint8(typeof opts.outerType !== 'undefined' ? opts.outerType : 23);
    adBuf.writeUint16(typeof opts.outerVersion !== 'undefined' ? opts.outerVersion : 0x0303);
    adBuf.writeUint16(typeof opts.ciphertextLength !== 'undefined' ? opts.ciphertextLength : ciphertextLength);
    const ciphertext = await cipherstate.encrypt(innerPlaintextBuf.flush(), adBuf.flush());
    return ciphertext;
  },

  makeEncryptedRecord: async function (cipherstate, opts) {
    let ciphertext = opts.ciphertext;
    if (typeof ciphertext === 'undefined') {
      ciphertext = await testHelpers.makeEncryptedInnerPlaintext(cipherstate, opts);
    }
    return testHelpers.makePlaintextRecord({
      content: ciphertext,
      contentLength: opts.outerContentLength,
      trailer: opts.outerTrailer,
      type: typeof opts.outerType !== 'undefined' ? opts.outerType : 23,
      version: opts.outerVersion,
    });
  },

  makeEncryptionState: async function(key, seqnum = 0) {
    const encryptor = await EncryptionState.create(key);
    encryptor.seqnum = seqnum;
    return encryptor;
  },

  makeDecryptionState: async function (key, seqnum = 0) {
    const decryptor = await DecryptionState.create(key);
    decryptor.seqnum = seqnum;
    return decryptor;
  },

  makeClientHelloRecord: async function(opts, psk) {
    const clientHello = testHelpers.makeClientHelloMessage(opts);
    if (psk) {
      await testHelpers.signClientHelloMessage(clientHello, psk);
    }
    return testHelpers.makePlaintextRecord({
      content: clientHello,
      type: 22,
    });
  },

  makeHandshakeMessage: function (opts) {
    const buf = new BufferWriter();
    buf.writeUint8(typeof opts.type !== 'undefined' ? opts.type : 0);
    buf.writeVector24(buf => {
      buf.writeBytes(typeof opts.content !== 'undefined' ? opts.content : zeros(0));
    });
    return buf.flush();
  },

  makeClientHelloMessage: function(opts) {
    const buf = new BufferWriter();
    buf.writeUint8(1);
    buf.writeVector24(buf => {
      buf.writeUint16(typeof opts.version !== 'undefined' ? opts.version : 0x0303);
      buf.writeBytes(typeof opts.random !== 'undefined' ? opts.random : zeros(32));
      buf.writeVectorBytes8(typeof opts.sessionId !== 'undefined' ? opts.sessionId : zeros(0));
      buf.writeVector16(buf => {
        const ciphersuites = typeof opts.ciphersuites !== 'undefined' ? opts.ciphersuites : [0x1301];
        for (const ciphersuite of ciphersuites) {
          buf.writeUint16(ciphersuite);
        }
      });
      buf.writeVectorBytes8(typeof opts.compressionMethods !== 'undefined' ? opts.compressionMethods : zeros(1));
      buf.writeVector16(buf => {
        let extensions = opts.extensions;
        if (typeof extensions === 'undefined') {
          extensions = [
            testHelpers.makeSupportedVersionsExtension([0x0304]),
            testHelpers.makePskKeyExchangeModesExtension([0x00]),
            testHelpers.makePreSharedKeyExtension([TEST_VECTORS.PSK_ID], [zeros(32)])
          ];
        }
        for (const { type, data, length } of extensions) {
          buf.writeUint16(type);
          buf.writeUint16(length || data.byteLength);
          buf.writeBytes(data);
        }
      });
      if (typeof opts.trailer !== 'undefined') {
        buf.writeBytes(opts.trailer);
      }
    });
    return buf.flush();
  },

  signClientHelloMessage: async function (clientHello, psk) {
    const PSK_BINDERS_SIZE = HASH_LENGTH + 1 + 2;
    const keyschedule = new KeySchedule();
    await keyschedule.addPSK(psk);
    const binder = await keyschedule.calculateFinishedMAC(keyschedule.extBinderKey, clientHello.slice(0, -PSK_BINDERS_SIZE));
    clientHello.set(binder, clientHello.byteLength - binder.byteLength);
  },

  makeServerHelloMessage: function (opts) {
    const buf = new BufferWriter();
    buf.writeUint8(2);
    buf.writeVector24(buf => {
      buf.writeUint16(typeof opts.version !== 'undefined' ? opts.version : 0x0303);
      buf.writeBytes(typeof opts.random !== 'undefined' ? opts.random : zeros(32));
      buf.writeVectorBytes8(typeof opts.sessionId !== 'undefined' ? opts.sessionId : TEST_VECTORS.SESSION_ID);
      buf.writeUint16(typeof opts.ciphersuite !== 'undefined' ? opts.ciphersuite : 0x1301);
      buf.writeUint8(typeof opts.compressionMethod !== 'undefined' ? opts.compressionMethod : 0x00);
      buf.writeVector16(buf => {
        let extensions = opts.extensions;
        if (typeof extensions === 'undefined') {
          extensions = [
            testHelpers.makeSupportedVersionsExtension(0x0304),
            testHelpers.makePreSharedKeyExtension(0)
          ];
        }
        for (const { type, data, length } of extensions) {
          buf.writeUint16(type);
          buf.writeUint16(length || data.byteLength);
          buf.writeBytes(data);
        }
      });
      if (typeof opts.trailer !== 'undefined') {
        buf.writeBytes(opts.trailer);
      }
    });
    return buf.flush();
  },

  makeEncryptedExtensionsMessage: function (opts) {
    const buf = new BufferWriter();
    buf.writeUint8(8);
    buf.writeVector24(buf => {
      buf.writeVector16(buf => {
        const extensions = typeof opts.extensions !== 'undefined' ? opts.extensions : [];
        for (const { type, data, length } of extensions) {
          buf.writeUint16(type);
          buf.writeUint16(length || data.byteLength);
          buf.writeBytes(data);
        }
      });
    });
    return buf.flush();
  },

  makeSupportedVersionsExtension: function (versions) {
    const buf = new BufferWriter();
    if (! Array.isArray(versions)) {
      buf.writeUint16(versions);
    } else {
      buf.writeVector8(buf => {
        for (const version of versions) {
          buf.writeUint16(version);
        }
      });
    }
    return { data: buf.flush(), type: 43 };
  },

  makePskKeyExchangeModesExtension: function (modes) {
    const buf = new BufferWriter();
    buf.writeVector8(buf => {
      for (const mode of modes) {
        buf.writeUint8(mode);
      }
    });
    return { data: buf.flush(), type: 45 };
  },

  makePreSharedKeyExtension: function (psks, binders) {
    const buf = new BufferWriter();
    if (! Array.isArray(psks)) {
      buf.writeUint16(psks);
    } else {
      buf.writeVector16(buf => {
        for (const pskId of psks) {
          buf.writeVectorBytes16(pskId);
          buf.writeUint32(0);
        }
      });
      buf.writeVector16(buf => {
        for (const binder of binders) {
          buf.writeVectorBytes8(binder);
        }
      });
    }
    return { data: buf.flush(), type: 41 };
  },

  makeCookieExtension: function (cookie) {
    const buf = new BufferWriter();
    buf.writeVectorBytes16(cookie);
    return { data: buf.flush(), type: 44 };
  }
};

assert.throwsAsync = (fn, errorLike, errMsgMatcher, message) => {
  let threw = null;
  return fn().catch(err => {
    threw = err;
  }).then(() => {
    // Use synchronous `assert.throws` to get all the nice matching logic.
    assert.throws(() => {
      if (threw) {
        throw threw;
      }
    }, errorLike, errMsgMatcher, message);
  });
};

assert.promiseIsPending = async (p) => {
  const sentinel = {};
  const which = await Promise.race([p, (async () => {
    await testHelpers.nextTick();
    return sentinel;
  })()]);
  if (which !== sentinel) {
    assert.fail('promise was already fulfilled');
  }
};
