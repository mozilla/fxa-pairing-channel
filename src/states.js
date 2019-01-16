/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import {
  assert,
  bytesAreEqual,
  BufferWriter,
} from './utils.js';
import {
  ClientHello,
  ServerHello,
  EncryptedExtensions,
  Finished
} from './messages.js';
import { HASH_LENGTH } from './crypto.js';

// The length of the data for PSK binders at the end of the ClientHello.
// We only support a single PSK, so it's the length of the hash plus one
// for rendering it as a variable-length byte array, plus two for rendering
// the variable-length list of PSK binders.
const PSK_BINDERS_SIZE = HASH_LENGTH + 1 + 2;

//
// State-machine for TLS Handshake Management.
//
// Internally, we manage the TLS connection by explicitly modelling the
// client and server state-machines from RFC8446.  You can think of
// these `State` objects as little plugins for the `Connection` class
// that provide different behaviours of `send` and `receive` depending
// on the state of the connection.
//

class State {

  constructor(conn) {
    this.conn = conn;
  }

  async initialize() {
    // By default, nothing to do when entering the state.
  }

  async sendApplicationData(bytes) {
    // By default, assume we're not ready to send yet
    // and just let the data queue up for a future state.
    // XXX TODO: should this block until it's successfuly sent?
    this.conn._sendBuffer.writeBytes(bytes);
  }

  async recvApplicationData(bytes) {
    assert(false, 'not ready to receive application data');
  }

  async recvHandshakeMessage(msg) {
    assert(false, 'not expecting to receive a handhake message');
  }

  async close() {
    // XXX TODO: implement explicit close, including the `close_notify` alert message.
    assert(false, 'close() not implemented yet');
  }

}

// A special "guard" state to prevent us from using
// an improperly-initialized Connection.

export class UNINITIALIZED extends State {
  async initialize() {
    assert(false, 'uninitialized state');
  }
  async sendApplicationData(bytes) {
    assert(false, 'uninitialized state');
  }
  async recvApplicationData(bytes) {
    assert(false, 'uninitialized state');
  }
  async recvHandshakeMessage(msg) {
    assert(false, 'uninitialized state');
  }
  async close() {
    assert(false, 'uninitialized state');
  }
}

// A special "error" state for when something goes wrong.
// This state never transitions to another state, effectively
// terminating the connection.

export class ERROR extends State {
  async initialize(err) {
    this.error = err;
  }
  async sendApplicationData(bytes) {
    throw this.error;
  }
  async recvApplicationData(bytes) {
    throw this.error;
  }
  async recvHandshakeMessage(msg) {
    throw this.error;
  }
  async close() {
    throw this.error;
  }
}

// The "connected" state, for when the handshake is complete
// and we're ready to send application-level data.
// The logic for this is symmetric between client and server.

export class CONNECTED extends State {
  async initialize() {
    // We can now send any application data that was
    // submitted before the handshake was complete.
    if (this.conn._sendBuffer.tell() > 0) {
      await this.sendApplicationData(this.conn._sendBuffer.flush());
    }
  }
  async sendApplicationData(bytes) {
    await this.conn._sendApplicationData(bytes);
    await this.conn._flushOutgoingRecord();
  }
  async recvApplicationData(bytes) {
    this.conn._recvBuffer.writeBytes(bytes);
  }
}

// These states implement (part of) the client state-machine from
// https://tools.ietf.org/html/rfc8446#appendix-A.1
//
// Since we're only implementing a small subset of TLS1.3,
// we only need a small subset of the handshake.  It basically goes:
//
//   * send ClientHello
//   * receive ServerHello
//   * receive EncryptedExtensions
//   * receive server Finished
//   * send client Finished
//
// We include some unused states for completeness, so that it's easier
// to check the implementation against the diagrams in the RFC.

export class CLIENT_START extends State {
  async initialize() {
    const keyschedule = this.conn._keyschedule;
    await keyschedule.addPSK(this.conn.psk);
    // Construct a ClientHello message with our single PSK.
    // We can't know the PSK binder value yet, so we initially write zeros.
    const clientHello = new ClientHello(
      this.conn.randomSalt,
      new Uint8Array(0),
      [this.conn.pskId],
      [new Uint8Array(HASH_LENGTH)],
    );
    const buf = new BufferWriter();
    clientHello.write(buf);
    // Now that we know what the ClientHello looks like,
    // go back and calculate the appropriate PSK binder value.
    const truncatedTranscript = buf.slice(0, -PSK_BINDERS_SIZE);
    clientHello.pskBinders[0] = await keyschedule.calculateFinishedMAC(keyschedule.extBinderKey, truncatedTranscript);
    buf.incr(-HASH_LENGTH);
    buf.writeBytes(clientHello.pskBinders[0]);
    await this.conn._sendHandshakeMessage(buf.flush());
    await this.conn._flushOutgoingRecord();
    await this.conn._transition(CLIENT_WAIT_SH, clientHello);
  }
}

class CLIENT_WAIT_SH extends State {
  async initialize(clientHello) {
    this._clientHello = clientHello;
  }
  async recvHandshakeMessage(msg) {
    assert(msg instanceof ServerHello, 'expected ServerHello');
    assert(bytesAreEqual(msg.sessionId, this._clientHello.sessionId), 'server did not echo our sessionId');
    assert(msg.pskIndex === 0, 'server did not select our offered PSK');
    await this.conn._keyschedule.addECDHE(null);
    await this.conn._setSendKey(this.conn._keyschedule.clientHandshakeTrafficSecret);
    await this.conn._setRecvKey(this.conn._keyschedule.serverHandshakeTrafficSecret);
    await this.conn._transition(CLIENT_WAIT_EE);
  }
}

class CLIENT_WAIT_EE extends State {
  async recvHandshakeMessage(msg) {
    // We don't make use of any encrypted extensions, but we still
    // have to wait for the server to send the (empty) list of them.
    assert(msg instanceof EncryptedExtensions, 'expected EncryptedExtensions');
    const keyschedule = this.conn._keyschedule;
    const expectedServerFinishedMAC = await keyschedule.calculateFinishedMAC(keyschedule.serverHandshakeTrafficSecret);
    await this.conn._transition(CLIENT_WAIT_FINISHED, expectedServerFinishedMAC);
  }
}

class CLIENT_WAIT_FINISHED extends State {
  async initialize(expectedServerFinishedMAC) {
    this._expectedServerFinishedMAC = expectedServerFinishedMAC;
  }
  async recvHandshakeMessage(msg) {
    assert(msg instanceof Finished, 'expected Finished');
    // Verify server Finished MAC.
    assert(bytesAreEqual(msg.verifyData, this._expectedServerFinishedMAC), 'invalid Finished MAC');
    // Send our own Finished message in return.
    // This must be encrypted with the handshake traffic key,
    // but must not appear in the transscript used to calculate the application keys.
    const keyschedule = this.conn._keyschedule;
    const clientFinishedMAC = await keyschedule.calculateFinishedMAC(keyschedule.clientHandshakeTrafficSecret);
    await keyschedule.finalize();
    await this.conn._writeHandshakeMessage(new Finished(clientFinishedMAC));
    await this.conn._flushOutgoingRecord();
    await this.conn._setSendKey(keyschedule.clientApplicationTrafficSecret);
    await this.conn._setRecvKey(keyschedule.serverApplicationTrafficSecret);
    await this.conn._transition(CONNECTED);
  }
}

// These states implement (part of) the server state-machine from
// https://tools.ietf.org/html/rfc8446#appendix-A.2
//
// Since we're only implementing a small subset of TLS1.3,
// we only need a small subset of the handshake.  It basically goes:
//
//   * receive ClientHello
//   * send ServerHello
//   * send empty EncryptedExtensions
//   * send server Finished
//   * receive client Finished
//
// We include some unused states for completeness, so that it's easier
// to check the implementation against the diagrams in the RFC.

export class SERVER_START extends State {
  async recvHandshakeMessage(msg) {
    assert(msg instanceof ClientHello, 'expected ClientHello');
    await this.conn._transition(SERVER_RECVD_CH, msg);
  }
}

class SERVER_RECVD_CH extends State {
  async initialize(clientHello) {
    // In the spec, this is where we select connection parameters, and maybe
    // tell the client to try again if we can't find a compatible set.
    // Since we only support a fixed cipherset, the only thing to "negotiate"
    // is whether they provided an acceptable PSK.
    const pskIndex = clientHello.pskIds.findIndex(pskId => bytesAreEqual(pskId, this.conn.pskId));
    assert(pskIndex !== -1, 'client did not offer a matching PSK');
    await this.conn._keyschedule.addPSK(this.conn.psk);
    // Validate the PSK binder.
    const keyschedule = this.conn._keyschedule;
    const transcript = keyschedule.getTranscript();
    const expectedPskBinder = await keyschedule.calculateFinishedMAC(keyschedule.extBinderKey, transcript.slice(0, -PSK_BINDERS_SIZE));
    assert(bytesAreEqual(clientHello.pskBinders[pskIndex], expectedPskBinder), 'incorrect pskBinder');
    await this.conn._transition(SERVER_NEGOTIATED, clientHello, pskIndex);
  }
}

class SERVER_NEGOTIATED extends State {
  async initialize(clientHello, pskIndex) {
    await this.conn._writeHandshakeMessage(new ServerHello(this.conn.randomSalt, clientHello.sessionId, pskIndex));
    await this.conn._flushOutgoingRecord();
    // We can now transition to the encrypted part of the handshake.
    const keyschedule = this.conn._keyschedule;
    await keyschedule.addECDHE(null);
    await this.conn._setSendKey(keyschedule.serverHandshakeTrafficSecret);
    await this.conn._setRecvKey(keyschedule.clientHandshakeTrafficSecret);
    // Send an empty EncryptedExtensions message.
    await this.conn._writeHandshakeMessage(new EncryptedExtensions());
    await this.conn._flushOutgoingRecord();
    // Send the Finished message.
    const serverFinishedMAC = await keyschedule.calculateFinishedMAC(keyschedule.serverHandshakeTrafficSecret);
    await this.conn._writeHandshakeMessage(new Finished(serverFinishedMAC));
    await this.conn._flushOutgoingRecord();
    const expectedClientFinishedMAC = await keyschedule.calculateFinishedMAC(keyschedule.clientHandshakeTrafficSecret);
    // We can now *send* using the application traffic key,
    // but have to wait to receive the client Finished before receiving under that key.
    await this.conn._keyschedule.finalize();
    await this.conn._setSendKey(keyschedule.serverApplicationTrafficSecret);
    await this.conn._transition(SERVER_WAIT_FINISHED, expectedClientFinishedMAC);
  }
}

class SERVER_WAIT_FINISHED extends State {
  async initialize(expectedClientFinishedMAC) {
    this._expectedClientFinishedMAC = expectedClientFinishedMAC;
  }
  async recvHandshakeMessage(msg) {
    assert(msg instanceof Finished, 'expected Finished');
    assert(bytesAreEqual(msg.verifyData, this._expectedClientFinishedMAC, 'invalid Finished MAC'));
    await this.conn._setRecvKey(this.conn._keyschedule.clientApplicationTrafficSecret);
    await this.conn._transition(CONNECTED);
  }
}