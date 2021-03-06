/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// A wrapper that combines a WebSocket to the channelserver
// with some client-side encryption for securing the channel.
//
// This code is responsible for the event handling and the consumer API.
// All the details of encrypting the messages are delegated to`./tlsconnection.js`.

import { ClientConnection, ServerConnection } from './tlsconnection.js';
import { TLSCloseNotify, TLSError } from './alerts.js';
import {
  base64urlToBytes,
  bytesToBase64url,
  bytesToHex,
  bytesToUtf8,
  hexToBytes,
  utf8ToBytes,
} from './utils.js';

import { EventTarget } from 'event-target-shim';

const CLOSE_FLUSH_BUFFER_INTERVAL_MS = 200;
const CLOSE_FLUSH_BUFFER_MAX_TRIES = 5;

export class PairingChannel extends EventTarget {
  constructor(channelId, channelKey, socket, connection) {
    super();
    this._channelId = channelId;
    this._channelKey = channelKey;
    this._socket = socket;
    this._connection = connection;
    this._selfClosed = false;
    this._peerClosed = false;
    this._setupListeners();
  }

  /**
   * Create a new pairing channel.
   *
   * This will open a channel on the channelserver, and generate a random client-side
   * encryption key. When the promise resolves, `this.channelId` and `this.channelKey`
   * can be transferred to another client to allow it to securely connect to the channel.
   *
   * @returns Promise<PairingChannel>
   */
  static create(channelServerURI) {
    const wsURI = new URL('/v1/ws/', channelServerURI).href;
    const channelKey = crypto.getRandomValues(new Uint8Array(32));
    // The one who creates the channel plays the role of 'server' in the underlying TLS exchange.
    return this._makePairingChannel(wsURI, ServerConnection, channelKey);
  }

  /**
   * Connect to an existing pairing channel.
   *
   * This will connect to a channel on the channelserver previously established by
   * another client calling `create`. The `channelId` and `channelKey` must have been
   * obtained via some out-of-band mechanism (such as by scanning from a QR code).
   *
   * @returns Promise<PairingChannel>
   */
  static connect(channelServerURI, channelId, channelKey) {
    const wsURI = new URL(`/v1/ws/${channelId}`, channelServerURI).href;
    // The one who connects to an existing channel plays the role of 'client'
    // in the underlying TLS exchange.
    return this._makePairingChannel(wsURI, ClientConnection, channelKey);
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
          // The channelserver echos back the channel id, and we use it as an
          // additional input to the TLS handshake via the "psk id" field.
          const {channelid: channelId} = JSON.parse(event.data);
          const pskId = utf8ToBytes(channelId);
          const connection = await ConnectionClass.create(psk, pskId, data => {
            // Send data by forwarding it via the channelserver websocket.
            // The TLS connection gives us `data` as raw bytes, but channelserver
            // expects b64urlsafe strings, because it wraps them in a JSON object envelope.
            socket.send(bytesToBase64url(data));
          });
          const instance = new this(channelId, psk, socket, connection);
          resolve(instance);
        } catch (err) {
          reject(err);
        }
      };
      stopListening = () => {
        socket.removeEventListener('close', onConnectionError);
        socket.removeEventListener('error', onConnectionError);
        socket.removeEventListener('message', onFirstMessage);
      };
      socket.addEventListener('close', onConnectionError);
      socket.addEventListener('error', onConnectionError);
      socket.addEventListener('message', onFirstMessage);
    });
  }

  _setupListeners() {
    this._socket.addEventListener('message', async event => {
      try {
        // When we receive data from the channelserver, pump it through the TLS connection
        // to decrypt it, then echo it back out to consumers as an event.
        const channelServerEnvelope = JSON.parse(event.data);
        const payload = await this._connection.recv(base64urlToBytes(channelServerEnvelope.message));
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
        let event;
        // The underlying TLS connection will signal a clean shutdown of the channel
        // by throwing a special error, because it doesn't really have a better
        // signally mechanism available.
        if (error instanceof TLSCloseNotify) {
          this._peerClosed = true;
          if (this._selfClosed) {
            this._shutdown();
          }
          event = new CustomEvent('close');
        } else {
          event = new CustomEvent('error', {
            detail: {
              error,
            }
          });
        }
        this.dispatchEvent(event);
      }
    });
    // Relay the WebSocket events.
    this._socket.addEventListener('error', () => {
      this._shutdown();
      // The dispatched event that we receive has no useful information.
      this.dispatchEvent(new CustomEvent('error', {
        detail: {
          error: new Error('WebSocket error.'),
        },
      }));
    });
    // In TLS, the peer has to explicitly send a close notification,
    // which we dispatch above.  Unexpected socket close is an error.
    this._socket.addEventListener('close', () => {
      this._shutdown();
      if (! this._peerClosed) {
        this.dispatchEvent(new CustomEvent('error', {
          detail: {
            error: new Error('WebSocket unexpectedly closed'),
          }
        }));
      }
    });
  }

  /**
   * @param {Object} data
   */
  async send(data) {
    const payload = utf8ToBytes(JSON.stringify(data));
    await this._connection.send(payload);
  }

  async close() {
    this._selfClosed = true;
    await this._connection.close();
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
      // If the peer hasn't closed, we might still receive some data.
      if (this._peerClosed) {
        this._shutdown();
      }
    }
  }

  _shutdown() {
    if (this._socket) {
      this._socket.close();
      this._socket = null;
      this._connection = null;
    }
  }

  get closed() {
    return (! this._socket) || (this._socket.readyState === 3);
  }

  get channelId() {
    return this._channelId;
  }

  get channelKey() {
    return this._channelKey;
  }
}

// Re-export helpful utilities for calling code to use.
export {
  base64urlToBytes,
  bytesToBase64url,
  bytesToHex,
  bytesToUtf8,
  hexToBytes,
  TLSCloseNotify,
  TLSError,
  utf8ToBytes
};

// For running tests using the built bundle,
// expose a bunch of implementation details.

import { Connection } from './tlsconnection.js';
import { KeySchedule } from './keyschedule.js';
import { hkdfExpand, HASH_LENGTH } from './crypto.js';
import { EncryptedExtensions, Finished, NewSessionTicket } from './messages.js';
import { DecryptionState, EncryptionState, RecordLayer } from './recordlayer.js';
import { BufferReader, BufferWriter, arrayToBytes, bytesAreEqual, zeros } from './utils.js';
export const _internals = {
  arrayToBytes,
  BufferReader,
  BufferWriter,
  bytesAreEqual,
  bytesToHex,
  bytesToUtf8,
  ClientConnection,
  Connection,
  DecryptionState,
  EncryptedExtensions,
  EncryptionState,
  Finished,
  HASH_LENGTH,
  hexToBytes,
  hkdfExpand,
  KeySchedule,
  NewSessionTicket,
  RecordLayer,
  ServerConnection,
  utf8ToBytes,
  zeros,
};
