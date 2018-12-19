/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

import { State, State_CONNECTED } from './index.js';
import {
    ClientHello,
    ServerHello,
    Finished
} from '../messages.js'
import { assert } from '../utils.js';


// These states implement (part of) the client state-machine from
// https://tools.ietf.org/html/rfc8446#appendix-A.1
//
// Since we're only implementing a small subset of TLS1.3,
// we only need a small subset of the handshake.  It basically goes:
//
//   * send ClientHello
//   * receive ServerHello
//   * receive server Finished
//   * send client Finished
//
// We include some unused states for completeness, so that it's easier
// to check the implementation against the diagrams in the RFC.

export class ClientState_START extends State {
    async initialize() {
        await this.conn._writeHandshakeMessage(ClientHello, this.conn.pskID)
        await this.conn._flushOutgoingRecord()
        await this.conn._transition(ClientState_WAIT_SH)
    }
}

class ClientState_WAIT_SH extends State {
    async recvHandshakeMessage(type, record) {
        switch (type) {
            case ServerHello.TYPE_TAG:
                await ServerHello.read(record, this.conn.pskID);
                await this.conn._transition(ClientState_WAIT_EE);
                break;
            default:
                assert(false, 'unexpected handshake message type');
        }
    }
}

class ClientState_WAIT_EE extends State {
    async initialize() {
        // There are no EncryptedExtensions in the subset of TLS we plan to use.
        // Transition directly to WAIT_FINISHED, which will error out if the server
        // attempts to send any.
        await this.conn._transition(ClientState_WAIT_FINISHED);
    }
}

class ClientState_WAIT_FINISHED extends State {
    async recvHandshakeMessage(type, record) {
        switch (type) {
            case Finished.TYPE_TAG:
                await Finished.read(record);
                await this.conn._writeHandshakeMessage(Finished);
                await this.conn._flushOutgoingRecord();
                await this.conn._transition(State_CONNECTED);
                break;
            default:
                assert(false, 'unexpected handshake message type');
        }
    }
}
