/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

// A wrapper that combines a WebSocket to the channelserver
// with a TLS Connection for encryption.

import {
  InsecureClientConnection,
  InsecureServerConnection,
} from './tlsconnection.js';

import {
  bytesToHex,
  hexToBytes,
  utf8ToBytes,
} from './utils.js';

const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder();

export class InsecurePairingChannel extends EventTarget {
  constructor(channelId, channelKey, socket, tlsConnection) {
    super();
    this._channelId = channelId;
    this._channelKey = channelKey;
    this._socket = socket;
    this._tlsConnection = tlsConnection;
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

  static _makePairingChannel(wsUri, TlsConnection, psk) {
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
          const tlsConnection = await TlsConnection.create(psk, pskId, data => {
            // To send data over the websocket, it needs to be encoded as a safe string.
            socket.send(bytesToHex(data));
          });
          const instance = new this(channelId, psk, socket, tlsConnection);
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
        const payload = await this._tlsConnection.recv(hexToBytes(channelServerEnvelope.message));
        if (payload !== null) {
          const data = JSON.parse(utf8Decoder.decode(payload));
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
    this._socket.addEventListener('error', this.dispatchEvent);
    this._socket.addEventListener('close', this.dispatchEvent);
  }

  /**
   * @param {Object} data
   */
  async send(data) {
    const payload = utf8Encoder.encode(JSON.stringify(data));
    await this._tlsConnection.send(payload);
  }

  async close() {
    await this._tlsConnection.close();
    this._tlsConnection = null;
    this._socket.close();
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
