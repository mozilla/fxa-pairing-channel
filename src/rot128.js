/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

// The top-level APIs offered by this library are `InsecureClientConnection` and
// `Insecure ServerConnection` classes.  They each take a callback to be used for
// sending data to the remote peer, and operate like this:
//
//    conn = await InsecureClientConnection.create(psk, pskId, async function send_data_to_server(data) {
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
// The `InsecureServerConnection` API operates similarly; the distinction is mainly
// in which side is expected to send vs receieve during the protocol handshake.

import {
  assert,
  assertIsBytes,
  bytesAreEqual,
} from './utils.js';


// !!!!!!!
// !!
// !!   N.B. In case it wasn't obvious, this is insecure!
// !!
// !!!!!!!
//
// This will be replaced by an implementation of the TLS1.3 PSK mode.
// We're using a simple insecure quote-unquote cipher for now in order
// to simulate the same sort of interface that the real crypto engine
// will provide.

class InsecureConnection {
  constructor(psk, pskId, sendCallback) {
    this.psk = assertIsBytes(psk);
    this.pskId = assertIsBytes(pskId);
    this.sendCallback = sendCallback;
  }

  // Subclasses will override this with some async initialization logic.
  static async create(psk, pskId, sendCallback) {
    return new this(psk, pskId, sendCallback);
  }

  // These are the three public API methods that
  // consumers can use to connunicate over TLS.

  async send(data) {
    assertIsBytes(data);
    await this.sendCallback(await this._rot128(data));
  }

  async recv(data) {
    assertIsBytes(data);
    return await this._rot128(data);
  }

  async close() { }

  async _rot128(input) {
    const output = new Uint8Array(input.byteLength);
    for (let i = 0; i < input.byteLength; i++) {
      output[i] = (input[i] + 128) & 0xFF;
    }
    return output;
  }
}


export class InsecureClientConnection extends InsecureConnection {
  static async create(psk, pskId, sendCallback) {
    const instance = await super.create(psk, pskId, sendCallback);
    // Prove to the server that we know the channel key.
    await instance.send(instance.psk);
    return instance;
  }
}


export class InsecureServerConnection extends InsecureConnection {
  constructor(psk, pskId, sendCallback) {
    super(psk, pskId, sendCallback);
    this.receivedHandshake = false;
  }
  async recv(data) {
    // Make the client prove that it knows the channel key in first message.
    let output = await super.recv(data);
    if (! this.receivedHandshake) {
      assert(bytesAreEqual(output, this.psk), 'psk mismatch');
      this.receivedHandshake = true;
      output = null;
    }
    return output;
  }
}
