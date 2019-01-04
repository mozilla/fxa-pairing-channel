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
  bytesToUtf8,
  utf8ToBytes,
} from './utils.js';

// Copy pasta from https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.
var EventTarget = function() {
  this.listeners = {};
};

EventTarget.prototype.listeners = null;
EventTarget.prototype.addEventListener = function(type, callback) {
  if (!(type in this.listeners)) {
    this.listeners[type] = [];
  }
  this.listeners[type].push(callback);
};

EventTarget.prototype.removeEventListener = function(type, callback) {
  if (!(type in this.listeners)) {
    return;
  }
  var stack = this.listeners[type];
  for (var i = 0, l = stack.length; i < l; i++) {
    if (stack[i] === callback) {
      stack.splice(i, 1);
      return;
    }
  }
};

EventTarget.prototype.dispatchEvent = function(event) {
  if (!(event.type in this.listeners)) {
    return true;
  }
  var stack = this.listeners[event.type].slice();

  for (var i = 0, l = stack.length; i < l; i++) {
    stack[i].call(this, event);
  }
  return !event.defaultPrevented;
};

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
  static create(channelServerURI, {WebSocket} = window) {
    const channelKey = crypto.getRandomValues(new Uint8Array(32));
    return this._makePairingChannel(WebSocket, channelServerURI, InsecureServerConnection, channelKey);
  }

  /**
   * Connect to an existing pairing channel.
   *
   * `channelServerURI` must be the full URI and therefore should contain the channel ID.
   * @returns Promise<InsecurePairingChannel>
   */
  static connect(channelServerURI, channelKey, {WebSocket} = window) {
    return this._makePairingChannel(WebSocket, channelServerURI, InsecureClientConnection, channelKey);
  }

  static _makePairingChannel(WebSocket, wsUri, TlsConnection, psk) {
    const socket = new WebSocket(wsUri);
    return new Promise((resolve, reject) => {
      const stopListening = () => {
        socket.removeEventListener("error", onConnectionError);
        socket.removeEventListener("message", onFirstMessage);
      };
      const onConnectionError = async () => {
        stopListening();
        reject(new Error("Error while creating the pairing channel"));
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
      socket.addEventListener("error", onConnectionError);
      socket.addEventListener("message", onFirstMessage);
    });
  }

  _setupListeners() {
    this._socket.addEventListener("message", async event => {
      let {message: payload, sender} = JSON.parse(event.data);
      payload = await this._tlsConnection.recv(hexToBytes(payload));
      if (payload !== null) {
        const {message, data} = JSON.parse(bytesToUtf8(payload));
        // Assume the application wants to deal with strings,
        // not Uint8Array buffers as returned by the TLS layer.
        this.dispatchEvent({
          type: "message",
          sender,
          message,
          data,
        });
      }
    });
    // Relay the other events.
    this._socket.addEventListener("error", this.dispatchEvent);
    this._socket.addEventListener("close", this.dispatchEvent);
  }

  send(message, data = {}) {
    const envelope = JSON.stringify({
      message,
      data,
    });
    this._tlsConnection.send(utf8ToBytes(envelope));
  }

  async close() {
    await this._tlsConnection.close();
    this._tlsConnection = null;
    this.socket.close();
  }

  get closed() {
    return this._socket.readyState == 3;
  }

  get channelId() {
    return this._channelId;
  }

  get channelKey() {
    return this._channelKey;
  }
}
