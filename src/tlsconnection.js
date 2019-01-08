/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

// The top-level APIs offered by this library are `ClientConnection` and
// `ServerConnection` classes.  They each take a callback to be used for
// sending data to the remote peer, and operate like this:
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
  noop,
} from './utils.js';

import {
  getRandomBytes
} from './crypto.js';

import * as STATE from './states.js';

import {
  readHandshakeMessage,
} from './messages.js';

import {
  RecordSender,
  RecordReceiver,
  RECORD_TYPE,
} from './recordlayer.js';

// !!!!!!!
// !!
// !!   N.B. We have not yet implemented the actual encryption bits!
// !!
// !!!!!!!
//
// This first version of the code uses the same "framework" as we would use for
// implementing TLS1.3, including the basic sequence of messages between client and
// server, and the use of binary encoding in an ArrayBuffer for data processing.
// Using an implementation with proper crypto should feel identical to using
// this mock version, except it won't have "Insecure" in the class name...

class InsecureConnection {
  constructor(psk, pskId, sendCallback, randomSalt) {
    this.psk = assertIsBytes(psk);
    this.pskId = assertIsBytes(pskId);
    this.sendCallback = sendCallback;
    this.randomSalt = randomSalt;
    this._state = new STATE.UNINITIALIZED(this);
    this._pendingApplicationData = [];
    this._recordSender = new RecordSender();
    this._recordReceiver = new RecordReceiver();
    this._lastPromise = Promise.resolve();
  }

  // Subclasses will override this with some async initialization logic.
  static async create(psk, pskId, sendCallback, randomSalt = null) {
    randomSalt = randomSalt === null ? await getRandomBytes(crypto, 32) : randomSalt;
    return new this(psk, pskId, sendCallback, randomSalt);
  }

  // These are the three public API methods that
  // consumers can use to connunicate over TLS.

  async send(data) {
    assertIsBytes(data);
    await this._synchronized(async () => {
      await this._state.sendApplicationData(data);
    });
  }

  async recv(data) {
    assertIsBytes(data);
    return await this._synchronized(async () => {
      const [type, buf] = await this._recordReceiver.recv(data);
      return await this._dispatchIncomingRecord(type, buf);
    });
  }

  async close() {
    await this._synchronized(async () => {
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

  // These are helpers to allow the state to add data to the next outgoing record.

  async _writeApplicationData(bytes) {
    await this._recordSender.withBufferWriter(RECORD_TYPE.APPLICATION_DATA, async buf => {
      await buf.writeBytes(bytes);
    });
  }

  async _writeHandshakeMessage(msg) {
    await this._recordSender.withBufferWriter(RECORD_TYPE.HANDSHAKE, async buf => {
      // XXX TODO: remember buffer position here.
      await msg.write(buf);
      // XXX TODO: read back to prev buffer position, add it to the transcript hash.
    });
  }

  async _flushOutgoingRecord() {
    const record = await this._recordSender.flush();
    await this.sendCallback(record);
  }

  // This is a helper for handling incoming records.

  async _dispatchIncomingRecord(type, buf) {
    switch (type) {
      case RECORD_TYPE.ALERT:
        // XXX TODO: implement alert records for communicating errors.
        throw new Error('received TLS alert record, aborting!');
      case RECORD_TYPE.APPLICATION_DATA:
        return await this._state.recvApplicationData(buf);
      case RECORD_TYPE.HANDSHAKE:
        // For simplicity, we assume that handshake messages will not be
        // fragmented across multiple records.  They shouldn't need to be
        // for the tiny subset of TLS that we're using.
        do {
          // XXX TODO: remember buffer position here.
          const msg = readHandshakeMessage(buf);
          // XXX TODO: read back to prev buffer position, add it to the transcript hash.
          await this._state.recvHandshakeMessage(msg);
        } while (buf.hasMoreBytes());
        return null;
      default:
        assert(false, `unknown record type: ${type}`);
    }
  }

  // This is a placeholder, until we implement the full key schedule.
  // XXX TODO: the full key schedule.

  _updateTrafficKeys() {
    this._recordSender.setContentKey(this.psk, new Uint8Array(32));
    this._recordReceiver.setContentKey(this.psk, new Uint8Array(32));
  }
}


export class InsecureClientConnection extends InsecureConnection {
  static async create(psk, pskId, sendCallback) {
    const instance = await super.create(psk, pskId, sendCallback);
    await instance._transition(STATE.CLIENT_START);
    return instance;
  }
}


export class InsecureServerConnection extends InsecureConnection {
  static async create(psk, pskId, sendCallback) {
    const instance = await super.create(psk, pskId, sendCallback);
    await instance._transition(STATE.SERVER_START);
    return instance;
  }
}
