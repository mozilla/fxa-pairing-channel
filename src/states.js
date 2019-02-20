/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { bytesAreEqual, BufferWriter, zeros } from './utils.js';
import { getRandomBytes, HASH_LENGTH } from './crypto.js';
import { TLSAlert, TLSCloseNotify, TLSError, ALERT_DESCRIPTION } from './alerts.js';
import {
  ClientHello,
  ServerHello,
  EncryptedExtensions,
  Finished,
  NewSessionTicket
} from './messages.js';
import { SupportedVersionsExtension, PskKeyExchangeModesExtension, PreSharedKeyExtension, EXTENSION_TYPE } from './extensions.js';
import { VERSION_TLS_1_3, PSK_MODE_KE } from './constants.js';

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
    // By default, assume we're not ready to send yet and the caller
    // should be blocking on the connection promise before reaching here.
    throw new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
  }

  async recvApplicationData(bytes) {
    throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
  }

  async recvHandshakeMessage(msg) {
    throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
  }

  async recvAlertMessage(alert) {
    switch (alert.description) {
      case ALERT_DESCRIPTION.CLOSE_NOTIFY:
        this.conn._closeForRecv(alert);
        throw alert;
      default:
        return await this.handleErrorAndRethrow(alert);
    }
  }

  async recvChangeCipherSpec(bytes) {
    throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
  }

  async handleErrorAndRethrow(err) {
    let alert = err;
    if (! (alert instanceof TLSAlert)) {
      alert = new TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
    }
    // Try to send error alert to the peer, but we may not
    // be able to if the outgoing connection was already closed.
    try {
      await this.conn._sendAlertMessage(alert);
    } catch (_) { }
    await this.conn._transition(ERROR, err);
    throw err;
  }

  async close() {
    const alert = new TLSCloseNotify();
    await this.conn._sendAlertMessage(alert);
    this.conn._closeForSend(alert);
  }

}

// A special "guard" state to prevent us from using
// an improperly-initialized Connection.

export class UNINITIALIZED extends State {
  async initialize() {
    throw new Error('uninitialized state');
  }
  async sendApplicationData(bytes) {
    throw new Error('uninitialized state');
  }
  async recvApplicationData(bytes) {
    throw new Error('uninitialized state');
  }
  async recvHandshakeMessage(msg) {
    throw new Error('uninitialized state');
  }
  async recvChangeCipherSpec(bytes) {
    throw new Error('uninitialized state');
  }
  async handleErrorAndRethrow(err) {
    throw err;
  }
  async close() {
    throw new Error('uninitialized state');
  }
}

// A special "error" state for when something goes wrong.
// This state never transitions to another state, effectively
// terminating the connection.

export class ERROR extends State {
  async initialize(err) {
    this.error = err;
    this.conn._setConnectionFailure(err);
    // Unceremoniously shut down the record layer on error.
    this.conn._recordlayer.setSendError(err);
    this.conn._recordlayer.setRecvError(err);
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
  async recvAlertMessage(err) {
    throw this.error;
  }
  async recvChangeCipherSpec(bytes) {
    throw this.error;
  }
  async handleErrorAndRethrow(err) {
    throw err;
  }
  async close() {
    throw this.error;
  }
}

// The "connected" state, for when the handshake is complete
// and we're ready to send application-level data.
// The logic for this is largely symmetric between client and server.

export class CONNECTED extends State {
  async initialize() {
    this.conn._setConnectionSuccess();
  }
  async sendApplicationData(bytes) {
    await this.conn._sendApplicationData(bytes);
  }
  async recvApplicationData(bytes) {
    return bytes;
  }
  async recvChangeCipherSpec(bytes) {
    throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
  }
}

// A base class for states that occur in the middle of the handshake
// (that is, between ClientHello and Finished).  These states may receive
// CHANGE_CIPHER_SPEC records for b/w compat reasons, which must contain
// exactly a single 0x01 byte and must otherwise be ignored.

class MidHandshakeState extends State {
  async recvChangeCipherSpec(bytes) {
    if (this.conn._hasSeenChangeCipherSpec) {
      throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
    }
    if (bytes.byteLength !== 1 || bytes[0] !== 1) {
      throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
    }
    this.conn._hasSeenChangeCipherSpec = true;
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
      // Client random salt.
      await getRandomBytes(32),
      // Random legacy_session_id; we *could* send an empty string here,
      // but sending a random one makes it easier to be compatible with
      // the data emitted by tlslite-ng for test-case generation.
      await getRandomBytes(32),
      [
        new SupportedVersionsExtension([VERSION_TLS_1_3]),
        new PskKeyExchangeModesExtension([PSK_MODE_KE]),
        new PreSharedKeyExtension([this.conn.pskId], [zeros(HASH_LENGTH)]),
      ],
    );
    const buf = new BufferWriter();
    clientHello.write(buf);
    // Now that we know what the ClientHello looks like,
    // go back and calculate the appropriate PSK binder value.
    // We only support a single PSK, so the length of the binders field is the
    // length of the hash plus one for rendering it as a variable-length byte array,
    // plus two for rendering the variable-length list of PSK binders.
    const PSK_BINDERS_SIZE = HASH_LENGTH + 1 + 2;
    const truncatedTranscript = buf.slice(0, buf.tell() - PSK_BINDERS_SIZE);
    const pskBinder = await keyschedule.calculateFinishedMAC(keyschedule.extBinderKey, truncatedTranscript);
    buf.incr(-HASH_LENGTH);
    buf.writeBytes(pskBinder);
    await this.conn._sendHandshakeMessageBytes(buf.flush());
    await this.conn._transition(CLIENT_WAIT_SH, clientHello.sessionId);
  }
}

class CLIENT_WAIT_SH extends State {
  async initialize(sessionId) {
    this._sessionId = sessionId;
  }
  async recvHandshakeMessage(msg) {
    if (! (msg instanceof ServerHello)) {
      throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
    }
    if (! bytesAreEqual(msg.sessionId, this._sessionId)) {
      throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
    }
    const pskExt = msg.extensions.get(EXTENSION_TYPE.PRE_SHARED_KEY);
    if (! pskExt) {
      throw new TLSError(ALERT_DESCRIPTION.MISSING_EXTENSION);
    }
    // We expect only the SUPPORTED_VERSIONS and PRE_SHARED_KEY extensions.
    if (msg.extensions.size !== 2) {
      throw new TLSError(ALERT_DESCRIPTION.UNSUPPORTED_EXTENSION);
    }
    if (pskExt.selectedIdentity !== 0) {
      throw new TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
    }
    await this.conn._keyschedule.addECDHE(null);
    await this.conn._setSendKey(this.conn._keyschedule.clientHandshakeTrafficSecret);
    await this.conn._setRecvKey(this.conn._keyschedule.serverHandshakeTrafficSecret);
    await this.conn._transition(CLIENT_WAIT_EE);
  }
}

class CLIENT_WAIT_EE extends MidHandshakeState {
  async recvHandshakeMessage(msg) {
    // We don't make use of any encrypted extensions, but we still
    // have to wait for the server to send the (empty) list of them.
    if (! (msg instanceof EncryptedExtensions)) {
      throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
    }
    // We do not support any EncryptedExtensions.
    if (msg.extensions.size !== 0) {
      throw new TLSError(ALERT_DESCRIPTION.UNSUPPORTED_EXTENSION);
    }
    const keyschedule = this.conn._keyschedule;
    const serverFinishedTranscript = keyschedule.getTranscript();
    await this.conn._transition(CLIENT_WAIT_FINISHED, serverFinishedTranscript);
  }
}

class CLIENT_WAIT_FINISHED extends State {
  async initialize(serverFinishedTranscript) {
    this._serverFinishedTranscript = serverFinishedTranscript;
  }
  async recvHandshakeMessage(msg) {
    if (! (msg instanceof Finished)) {
      throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
    }
    // Verify server Finished MAC.
    const keyschedule = this.conn._keyschedule;
    await keyschedule.verifyFinishedMAC(keyschedule.serverHandshakeTrafficSecret, msg.verifyData, this._serverFinishedTranscript);
    // Send our own Finished message in return.
    // This must be encrypted with the handshake traffic key,
    // but must not appear in the transcript used to calculate the application keys.
    const clientFinishedMAC = await keyschedule.calculateFinishedMAC(keyschedule.clientHandshakeTrafficSecret);
    await keyschedule.finalize();
    await this.conn._sendHandshakeMessage(new Finished(clientFinishedMAC));
    await this.conn._setSendKey(keyschedule.clientApplicationTrafficSecret);
    await this.conn._setRecvKey(keyschedule.serverApplicationTrafficSecret);
    await this.conn._transition(CLIENT_CONNECTED);
  }
}

export class CLIENT_CONNECTED extends CONNECTED {
  async recvHandshakeMessage(msg) {
    // A connected client must be prepared to accept NewSessionTicket
    // messages.  We never use them, but other server implementations
    // might send them.
    if (! (msg instanceof NewSessionTicket)) {
      throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
    }
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
    if (! (msg instanceof ClientHello)) {
      throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
    }
    // In the spec, this is where we select connection parameters, and maybe
    // tell the client to try again if we can't find a compatible set.
    // Since we only support a fixed cipherset, the only thing to "negotiate"
    // is whether they provided an acceptable PSK.
    const pskExt = msg.extensions.get(EXTENSION_TYPE.PRE_SHARED_KEY);
    const pskModesExt = msg.extensions.get(EXTENSION_TYPE.PSK_KEY_EXCHANGE_MODES);
    if (! pskExt || ! pskModesExt) {
      throw new TLSError(ALERT_DESCRIPTION.MISSING_EXTENSION);
    }
    if (pskModesExt.modes.indexOf(PSK_MODE_KE) === -1) {
      throw new TLSError(ALERT_DESCRIPTION.HANDSHAKE_FAILURE);
    }
    const pskIndex = pskExt.identities.findIndex(pskId => bytesAreEqual(pskId, this.conn.pskId));
    if (pskIndex === -1) {
      throw new TLSError(ALERT_DESCRIPTION.UNKNOWN_PSK_IDENTITY);
    }
    await this.conn._keyschedule.addPSK(this.conn.psk);
    // Validate the PSK binder.
    const keyschedule = this.conn._keyschedule;
    const transcript = keyschedule.getTranscript();
    // Calculate size occupied by the PSK binders.
    let pskBindersSize = 2; // Vector16 representation overhead.
    for (const binder of pskExt.binders) {
      pskBindersSize += binder.byteLength + 1; // Vector8 representation overhead.
    }
    await keyschedule.verifyFinishedMAC(keyschedule.extBinderKey, pskExt.binders[pskIndex], transcript.slice(0, -pskBindersSize));
    await this.conn._transition(SERVER_NEGOTIATED, msg.sessionId, pskIndex);
  }
}

class SERVER_NEGOTIATED extends MidHandshakeState {
  async initialize(sessionId, pskIndex) {
    await this.conn._sendHandshakeMessage(new ServerHello(
      // Server random
      await getRandomBytes(32),
      sessionId,
      [
        new SupportedVersionsExtension(null, VERSION_TLS_1_3),
        new PreSharedKeyExtension(null, null, pskIndex),
      ]
    ));
    // If the client sent a non-empty sessionId, the server *must* send a change-cipher-spec for b/w compat.
    if (sessionId.byteLength > 0) {
      await this.conn._sendChangeCipherSpec();
    }
    // We can now transition to the encrypted part of the handshake.
    const keyschedule = this.conn._keyschedule;
    await keyschedule.addECDHE(null);
    await this.conn._setSendKey(keyschedule.serverHandshakeTrafficSecret);
    await this.conn._setRecvKey(keyschedule.clientHandshakeTrafficSecret);
    // Send an empty EncryptedExtensions message.
    await this.conn._sendHandshakeMessage(new EncryptedExtensions([]));
    // Send the Finished message.
    const serverFinishedMAC = await keyschedule.calculateFinishedMAC(keyschedule.serverHandshakeTrafficSecret);
    await this.conn._sendHandshakeMessage(new Finished(serverFinishedMAC));
    // We can now *send* using the application traffic key,
    // but have to wait to receive the client Finished before receiving under that key.
    // We need to remember the handshake state from before the client Finished
    // in order to successfully verify the client Finished.
    const clientFinishedTranscript = await keyschedule.getTranscript();
    const clientHandshakeTrafficSecret = keyschedule.clientHandshakeTrafficSecret;
    await keyschedule.finalize();
    await this.conn._setSendKey(keyschedule.serverApplicationTrafficSecret);
    await this.conn._transition(SERVER_WAIT_FINISHED, clientHandshakeTrafficSecret, clientFinishedTranscript);
  }
}

class SERVER_WAIT_FINISHED extends MidHandshakeState {
  async initialize(clientHandshakeTrafficSecret, clientFinishedTranscript) {
    this._clientHandshakeTrafficSecret = clientHandshakeTrafficSecret;
    this._clientFinishedTranscript = clientFinishedTranscript;
  }
  async recvHandshakeMessage(msg) {
    if (! (msg instanceof Finished)) {
      throw new TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
    }
    const keyschedule = this.conn._keyschedule;
    await keyschedule.verifyFinishedMAC(this._clientHandshakeTrafficSecret, msg.verifyData, this._clientFinishedTranscript);
    this._clientHandshakeTrafficSecret = this._clientFinishedTranscript = null;
    await this.conn._setRecvKey(keyschedule.clientApplicationTrafficSecret);
    await this.conn._transition(CONNECTED);
  }
}
