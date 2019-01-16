

// A wrapper that combines a WebSocket to the channelserver
// with a TLS Connection for "encryption".
//
// This is mainly to help us test out the API and data flow
// on something approaching real production usage patterns.

const CHANNEL_SERVER = 'wss://dev.channelserver.nonprod.cloudops.mozgcp.net/v1/ws/';

import * as fxaPairingTLS from '../src/index.js';

/* exported PairingChannel */

export class PairingChannel {

  constructor() {
    this.socket = null;
    this.tlsconn = null;
    this.code = null;
    this.onReceive = () => { };
  }

  static create() {
    const instance = new this();
    instance._makeSocket(CHANNEL_SERVER);
    return new Promise((resolve, reject) => {
      const onChannelCreation = async event => {
        try {
          // Receive the channelId for the newly-created channel.
          instance.socket.removeEventListener('message', onChannelCreation);
          const { channelid } = JSON.parse(event.data);
          // The socket's ready, we can now initialize the TLS state-machine
          // with a new random PSK.
          const pskId = fxaPairingTLS.utf8ToBytes(channelid);
          const psk = new Uint8Array(32);
          crypto.getRandomValues(psk);
          instance.code = channelid + '#' + fxaPairingTLS.bytesToHex(psk);
          instance.tlsconn = await fxaPairingTLS.ServerConnection.create(psk, pskId, data => {
            // To send data over the channelserver, it needs to be encoded as a safe string.
            instance.socket.send(fxaPairingTLS.bytesToHex(data));
          });
          resolve(instance);
        } catch (err) {
          reject(err);
        }
      };
      // XXX TODO: listen for connection errors, and reject the promise.
      instance.socket.addEventListener('message', onChannelCreation);
    });
  }

  static async connect(code) {
    const instance = new this();
    instance.code = code;
    const [channelId, pskHex] = code.split('#');
    instance._makeSocket(CHANNEL_SERVER + channelId);
    return new Promise((resolve, reject) => {
      const onChannelEcho = async event => {
        try {
          // The channelserver will echo back the provided channelId,
          // which lets us know we're successully connected.
          instance.socket.removeEventListener('message', onChannelEcho);
          // The socket's ready, we can now initialize the TLS state-machine
          // using the provided psk.
          const psk = fxaPairingTLS.hexToBytes(pskHex);
          const pskId = fxaPairingTLS.utf8ToBytes(channelId);
          instance.tlsconn = await fxaPairingTLS.ClientConnection.create(psk, pskId, data => {
            // To send data over the websocket, it needs to be encoded as a safe string.
            instance.socket.send(fxaPairingTLS.bytesToHex(data));
          });
          resolve(instance);
        } catch (err) {
          reject(err);
        }
      };
      // XXX TODO: listen for connection errors, and reject the promise.
      instance.socket.addEventListener('message', onChannelEcho);
    });
  }

  send(data) {
    this.tlsconn.send(fxaPairingTLS.utf8ToBytes(data));
  }

  async close() {
    await this.tlsconn.close();
    this.tlsconn = null;
    this.socket.close();
  }

  _makeSocket(uri) {
    this.socket = new WebSocket(uri);
    // Once the initial channelserver setup is done, push all data
    // received from websocket into the TLS state-machine to decrypt it,
    // then feed it back out via our own `onReceieve` callback.
    // XXX TODO: be a proper EventTarget?
    this.socket.addEventListener('message', async event => {
      if (this.tlsconn !== null) {
        const { message, sender } = JSON.parse(event.data);
        const data = await this.tlsconn.recv(fxaPairingTLS.hexToBytes(message));
        if (data !== null) {
          // Assume the application wants to deal with strings,
          // not Uint8Array buffers as returned by the TLS layer.
          this.onReceive(fxaPairingTLS.bytesToUtf8(data), sender);
        }
      }
    });
  }
}
