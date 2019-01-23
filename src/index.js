/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

// A wrapper that combines a WebSocket to the channelserver
// with some client-side encryption for securing the channel.
// We'll improve the encryption before initial release...

import {
  InsecureClientConnection,
  InsecureServerConnection,
} from './rot128.js';

import {
  bytesToHex,
  hexToBytes,
  utf8ToBytes,
  bytesToUtf8,
} from './utils.js';

import {EventTarget} from 'event-target-shim';

const CLOSE_FLUSH_BUFFER_INTERVAL_MS = 200;
const CLOSE_FLUSH_BUFFER_MAX_TRIES = 5;

export class InsecurePairingChannel extends EventTarget {
  constructor(channelId, channelKey, socket, connection) {
    super();
    this._channelId = channelId;
    this._channelKey = channelKey;
    this._socket = socket;
    this._connection = connection;
    this._setupListeners();
  }

  /**
   * Create a new pairing channel.
   *
   * @returns Promise<InsecurePairingChannel>
   */
  static create(channelServerURI) {
    const wsURI = new URL('/v1/ws/', channelServerURI).href;
    const channelKey = crypto.getRandomValues(new Uint8Array(32));
    return this._makePairingChannel(wsURI, InsecureServerConnection, channelKey);
  }

  /**
   * Connect to an existing pairing channel.
   *
   * @returns Promise<InsecurePairingChannel>
   */
  static connect(channelServerURI, channelId, channelKey) {
    const wsURI = new URL(`/v1/ws/${channelId}`, channelServerURI).href;
    return this._makePairingChannel(wsURI, InsecureClientConnection, channelKey);
  }

  static _makePairingChannel(wsUri, ConnectionClass, psk) {
    const socket = new WebSocket(wsUri);
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-const
      let stopListening;
      const onConnectionError = async () => {
        stopListening();
        reject(new Error('Error while creating the pairing channel'));
      };
      const onFirstMessage = async event => {
        stopListening();
        try {
          const {channelid: channelId} = JSON.parse(event.data);
          const pskId = utf8ToBytes(channelId);
          const connection = await ConnectionClass.create(psk, pskId, data => {
            // To send data over the websocket, it needs to be encoded as a safe string.
            socket.send(bytesToHex(data));
          });
          const instance = new this(channelId, psk, socket, connection);
          resolve(instance);
        } catch (err) {
          reject(err);
        }
      };
      stopListening = () => {
        socket.removeEventListener('error', onConnectionError);
        socket.removeEventListener('message', onFirstMessage);
      };
      socket.addEventListener('error', onConnectionError);
      socket.addEventListener('message', onFirstMessage);
    });
  }

  _setupListeners() {
    this._socket.addEventListener('message', async event => {
      try {
        const channelServerEnvelope = JSON.parse(event.data);
        const payload = await this._connection.recv(hexToBytes(channelServerEnvelope.message));
        if (payload !== null) {
          const data = JSON.parse(bytesToUtf8(payload));
          this.dispatchEvent(new CustomEvent('message', {
            detail: {
              data,
              sender: channelServerEnvelope.sender,
            },
          }));
        }
      } catch (error) {
        this.dispatchEvent(new CustomEvent('error', {
          detail: {
            error,
          },
        }));
      }
    });
    // Relay the other events.
    this._socket.addEventListener('error', e => this.dispatchEvent(e));
    this._socket.addEventListener('close', e => this.dispatchEvent(e));
  }

  /**
   * @param {Object} data
   */
  async send(data) {
    const payload = utf8ToBytes(JSON.stringify(data));
    await this._connection.send(payload);
  }

  async close() {
    await this._connection.close();
    this._connection = null;
    try {
      // Ensure all queued bytes have been sent before closing the connection.
      let tries = 0;
      while (this._socket.bufferedAmount > 0) {
        if (++tries > CLOSE_FLUSH_BUFFER_MAX_TRIES) {
          throw new Error('Could not flush the outgoing buffer in time.');
        }
        await new Promise(res => setTimeout(res, CLOSE_FLUSH_BUFFER_INTERVAL_MS));
      }
    } finally {
      this._socket.close();
      this._socket = null;
    }
  }

  get closed() {
    return this._socket.readyState === 3;
  }

  get channelId() {
    return this._channelId;
  }

  get channelKey() {
    return this._channelKey;
  }
}

// Re-export helpful utilities for calling code to use.
export { bytesToHex, hexToBytes, bytesToUtf8, utf8ToBytes };
