/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

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
//    // There might not be any app-level data if it was a protocol control
//    //  message, and the receipt of the data might trigger additional calls
//    // to the send callback for protocol control purposes.
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
//    // When the peer sends a "closed" notification it will show up
//    // as a `TLSCloseNotify` exception from recv:
//
//    try {
//      await conn.recv(data);
//    } catch (err) {
//      if (! (err instanceof TLSCloseNotify) { throw err }
//      do_something_to_cleanly_close_data_connection();
//    }
//
// The `ServerConnection` API operates similarly; the distinction is mainly
// in which side is expected to send vs receieve during the protocol handshake.

import * as STATE from './states.js';
import { assertIsBytes, noop, BufferReader } from './utils.js';
import { HandshakeMessage } from './messages.js';
import { KeySchedule } from './keyschedule.js';
import { RecordLayer, RECORD_TYPE } from './recordlayer.js';
import { TLSAlert, TLSError, ALERT_DESCRIPTION } from './alerts.js';
import { TLSCloseNotify } from './index.js';


export class Connection {
  constructor(psk, pskId, sendCallback) {
    this.psk = assertIsBytes(psk);
    this.pskId = assertIsBytes(pskId);
    this.connected = new Promise((resolve, reject) => {
      this._onConnectionSuccess = resolve;
      this._onConnectionFailure = reject;
    });
    this._state = new STATE.UNINITIALIZED(this);
    this._handshakeRecvBuffer = null;
    this._hasSeenChangeCipherSpec = false;
    this._recordlayer = new RecordLayer(sendCallback);
    this._keyschedule = new KeySchedule();
    this._lastPromise = Promise.resolve();
  }

  // Subclasses will override this with some async initialization logic.
  static async create(psk, pskId, sendCallback) {
    return new this(psk, pskId, sendCallback);
  }

  // These are the three public API methods that consumers can use
  // to send and receive data encrypted with TLS1.3.

  async send(data) {
    assertIsBytes(data);
    await this.connected;
    await this._synchronized(async () => {
      await this._state.sendApplicationData(data);
    });
  }

  async recv(data) {
    assertIsBytes(data);
    return await this._synchronized(async () => {
      // Decrypt the data using the record layer.
      // We expect to receive precisely one record at a time.
      const [type, bytes] = await this._recordlayer.recv(data);
      // Dispatch based on the type of the record.
      switch (type) {
        case RECORD_TYPE.CHANGE_CIPHER_SPEC:
          await this._state.recvChangeCipherSpec(bytes);
          return null;
        case RECORD_TYPE.ALERT:
          await this._state.recvAlertMessage(TLSAlert.fromBytes(bytes));
          return null;
        case RECORD_TYPE.APPLICATION_DATA:
          return await this._state.recvApplicationData(bytes);
        case RECORD_TYPE.HANDSHAKE:
          // Multiple handshake messages may be coalesced into a single record.
          // Store the in-progress record buffer on `this` so that we can guard
          // against handshake messages that span a change in keys.
          this._handshakeRecvBuffer = new BufferReader(bytes);
          if (! this._handshakeRecvBuffer.hasMoreBytes()) {
            throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
          }
          do {
            // Each handshake messages has a type and length prefix, per
            // https://tools.ietf.org/html/rfc8446#appendix-B.3
            this._handshakeRecvBuffer.incr(1);
            const mlength = this._handshakeRecvBuffer.readUint24();
            this._handshakeRecvBuffer.incr(-4);
            const messageBytes = this._handshakeRecvBuffer.readBytes(mlength + 4);
            this._keyschedule.addToTranscript(messageBytes);
            await this._state.recvHandshakeMessage(HandshakeMessage.fromBytes(messageBytes));
          } while (this._handshakeRecvBuffer.hasMoreBytes());
          this._handshakeRecvBuffer = null;
          return null;
        default:
          throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
      }
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
  // It's also a convenient place to catch and alert on errors.

  _synchronized(cb) {
    const nextPromise = this._lastPromise.then(() => {
      return cb();
    }).catch(async err => {
      if (err instanceof TLSCloseNotify) {
        throw err;
      }
      await this._state.handleErrorAndRethrow(err);
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
    await this._recordlayer.flush();
  }

  // These are helpers to allow the State to manipulate the recordlayer
  // and send out various types of data.

  async _sendApplicationData(bytes) {
    await this._recordlayer.send(RECORD_TYPE.APPLICATION_DATA, bytes);
    await this._recordlayer.flush();
  }

  async _sendHandshakeMessage(msg) {
    await this._sendHandshakeMessageBytes(msg.toBytes());
  }

  async _sendHandshakeMessageBytes(bytes) {
    this._keyschedule.addToTranscript(bytes);
    await this._recordlayer.send(RECORD_TYPE.HANDSHAKE, bytes);
    // Don't flush after each handshake message, since we can probably
    // coalesce multiple messages into a single record.
  }

  async _sendAlertMessage(err) {
    await this._recordlayer.send(RECORD_TYPE.ALERT, err.toBytes());
    await this._recordlayer.flush();
  }

  async _sendChangeCipherSpec() {
    await this._recordlayer.send(RECORD_TYPE.CHANGE_CIPHER_SPEC, new Uint8Array([0x01]));
    await this._recordlayer.flush();
  }

  async _setSendKey(key) {
    return await this._recordlayer.setSendKey(key);
  }

  async _setRecvKey(key) {
    // Handshake messages that change keys must be on a record boundary.
    if (this._handshakeRecvBuffer && this._handshakeRecvBuffer.hasMoreBytes()) {
      throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
    }
    return await this._recordlayer.setRecvKey(key);
  }

  _setConnectionSuccess() {
    if (this._onConnectionSuccess !== null) {
      this._onConnectionSuccess();
      this._onConnectionSuccess = null;
      this._onConnectionFailure = null;
    }
  }

  _setConnectionFailure(err) {
    if (this._onConnectionFailure !== null) {
      this._onConnectionFailure(err);
      this._onConnectionSuccess = null;
      this._onConnectionFailure = null;
    }
  }

  _closeForSend(alert) {
    this._recordlayer.setSendError(alert);
  }

  _closeForRecv(alert) {
    this._recordlayer.setRecvError(alert);
  }
}

export class ClientConnection extends Connection {
  static async create(psk, pskId, sendCallback) {
    const instance = await super.create(psk, pskId, sendCallback);
    await instance._transition(STATE.CLIENT_START);
    return instance;
  }
}

export class ServerConnection extends Connection {
  static async create(psk, pskId, sendCallback) {
    const instance = await super.create(psk, pskId, sendCallback);
    await instance._transition(STATE.SERVER_START);
    return instance;
  }
}
