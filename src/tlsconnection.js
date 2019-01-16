/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

// The top-level APIs offered by this module are `ClientConnection` and
// `ServerConnection` classes, which provide authenticated and encrypted
// communication via the "externally-provisioned PSK" mode of TLS1.3.
// They each take a callback to be used for sending data to the remote peer,
// and operate like this:
//
//    conn = await ClientConnection.create(psk, pskId, async function send_data_to_server(data) {
//      // application-specific sending logic here.
//    })
//
//    // Send data to the server by calling `send`,
//    // which will use the callback provided in the constructor.
//    // A single `send()` by the application may result in multiple
//    // invokations of the callback.
//
//    await conn.send('application-level data')
//
//    // When data is received from the server, push it into
//    // the connection and let it return any decrypted app-level data.
//    // There might not be any app-level data if it was protocol control message,
//    // and the receipt of the data might trigger additional calls to the
//    // send callback for protocol control purposes.
//
//    serverSocket.on('data', async encrypted_data => {
//      const plaintext = await conn.recv(data)
//      if (plaintext !== null) {
//        do_something_with_app_level_data(plaintext)
//      }
//    })
//
//    // It's good practice to explicitly close the connection
//    // when finished.  This will send a "closed" notification
//    // to the server.
//
//    await conn.close()
//
// The `ServerConnection` API operates similarly; the distinction is mainly
// in which side is expected to send vs receieve during the protocol handshake.

import {
  assert,
  assertIsBytes,
  bytesToHex,
  hexToBytes,
  bytesToUtf8,
  utf8ToBytes,
  noop,
  BufferWriter,
  BufferReader,
} from './utils.js';

import * as STATE from './states.js';
import { getRandomBytes } from './crypto.js';
import { readHandshakeMessage } from './messages.js';
import { KeySchedule } from './keyschedule.js';
import { RecordLayer, RECORD_TYPE } from './recordlayer.js';

class Connection {
  constructor(psk, pskId, sendCallback, randomSalt) {
    this.psk = assertIsBytes(psk);
    this.pskId = assertIsBytes(pskId);
    this.randomSalt = assertIsBytes(randomSalt);
    this._state = new STATE.UNINITIALIZED(this);
    this._sendBuffer = new BufferWriter();
    this._recvBuffer = new BufferWriter();
    this._recordlayer = new RecordLayer(sendCallback);
    this._keyschedule = new KeySchedule();
    this._lastPromise = Promise.resolve();
  }

  // Subclasses will override this with some async initialization logic.
  static async create(psk, pskId, sendCallback, randomSalt = null) {
    randomSalt = randomSalt === null ? await getRandomBytes(32) : randomSalt;
    return new this(psk, pskId, sendCallback, randomSalt);
  }

  // These are the three public API methods that
  // consumers can use to send and receive data encrypted
  // with TLS1.3.

  async send(data) {
    assertIsBytes(data);
    await this._synchronized(async () => {
      await this._state.sendApplicationData(data);
    });
  }

  async recv(data) {
    assertIsBytes(data);
    return await this._synchronized(async () => {
      await this._recordlayer.recv(data, async (type, bytes) => {
        await this._dispatchIncomingMessage(type, bytes);
      });
      const appData = this._recvBuffer.flush();
      return appData.byteLength > 0 ? appData : null;
    });
  }

  async close() {
    await this._synchronized(async () => {
      // XXX TODO: check for partially-consumed records?
      await this._state.close();
    });
  }

  // Ensure that async functions execute one at a time,
  // by waiting for the previous call to `_synchronized()` to complete
  // before starting a new one.  This helps ensure that we complete
  // one state-machine transition before starting to do the next.

  _synchronized(cb) {
    const nextPromise = this._lastPromise.then(() => {
      return cb();
    }).catch(async err => {
      // All errors immediately put us in a terminal "error" state.
      // XXX TODO: send specific 'alert' messages for specific errors?
      await this._transition(STATE.ERROR, err);
      throw err;
    });
    // We don't want to hold on to the return value or error,
    // just synchronize on the fact that it completed.
    this._lastPromise = nextPromise.then(noop, noop);
    return nextPromise;
  }

  // This drives internal transition of the state-machine,
  // ensuring that the new state is properly initialized.

  async _transition(State, ...args) {
    this._state = new State(this);
    await this._state.initialize(...args);
  }

  // These are helpers to allow the State to manipulate the recordlayer
  // and send out various types of data.

  async _sendApplicationData(bytes) {
    await this._recordlayer.send(RECORD_TYPE.APPLICATION_DATA, bytes);
    // XXX TODO: explicit flush?
  }

  async _sendHandshakeMessage(bytes) {
    this._keyschedule.addToTranscript(bytes);
    await this._recordlayer.send(RECORD_TYPE.HANDSHAKE, bytes);
  }

  async _writeHandshakeMessage(msg) {
    const buf = new BufferWriter();
    msg.write(buf);
    return await this._sendHandshakeMessage(buf.flush());
  }

  async _flushOutgoingRecord() {
    await this._recordlayer.flush();
  }

  async _setSendKey(key) {
    return await this._recordlayer.setSendKey(key);
  }

  async _setRecvKey(key) {
    return await this._recordlayer.setRecvKey(key);
  }

  // This is a helper for handling incoming messages from the recordlayer.

  async _dispatchIncomingMessage(type, bytes) {
    switch (type) {
      case RECORD_TYPE.CHANGE_CIPHER_SPEC:
        // These may be sent for b/w compat, and must be discarded.
        assert(bytes.byteLength === 1 && bytes[0] === 1, 'unexpected_message');
        break;
      case RECORD_TYPE.ALERT:
        // XXX TODO: implement alert records for communicating errors.
        throw new Error('received TLS alert record, unceremoniously aborting!');
      case RECORD_TYPE.APPLICATION_DATA:
        await this._state.recvApplicationData(bytes);
        break;
      case RECORD_TYPE.HANDSHAKE:
        this._keyschedule.addToTranscript(bytes);
        await this._state.recvHandshakeMessage(readHandshakeMessage(new BufferReader(bytes)));
        break;
      default:
        assert(false, `unknown record type: ${type}`);
    }
  }

}

export class ClientConnection extends Connection {
  static async create(psk, pskId, sendCallback, randomSalt = null) {
    const instance = await super.create(psk, pskId, sendCallback, randomSalt);
    await instance._transition(STATE.CLIENT_START);
    return instance;
  }
}

export class ServerConnection extends Connection {
  static async create(psk, pskId, sendCallback, randomSalt = null) {
    const instance = await super.create(psk, pskId, sendCallback, randomSalt);
    await instance._transition(STATE.SERVER_START);
    return instance;
  }
}

// Re-export helpful utilities for calling code to use.
export { bytesToHex, hexToBytes, bytesToUtf8, utf8ToBytes };