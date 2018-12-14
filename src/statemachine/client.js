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
        await this.conn._addOutgoingMessage(ClientHello, this.conn.pskID)
        await this.conn._flushOutgoingRecords()
        await this.conn._transition(ClientState_WAIT_SH)
    }
}

class ClientState_WAIT_SH extends State {
    async recv() {
        await this.conn._getIncomingMessage(ServerHello, this.conn.pskID)
        await this.conn._transition(ClientState_WAIT_EE)
        return this.conn._state.maybeRecv()
    }
}

class ClientState_WAIT_EE extends State {
    async recv() {
        // There are no EncryptedExtensions in the subset of TLS we plan to use.
        // It's T.B.D. whether the server might send some and we have to skip over them.
        await this.conn._transition(ClientState_WAIT_FINISHED)
        return this.conn._state.maybeRecv()
    }
}

class ClientState_WAIT_FINISHED extends State {
    async recv() {
        await this.conn._getIncomingMessage(Finished)
        await this.conn._addOutgoingMessage(Finished)
        await this.conn._flushOutgoingRecords()
        // The handshake is complete!
        await this.conn._transition(State_CONNECTED)
        return this.conn._state.maybeRecv()
    }
}
