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


// These states implement (part of) the server state-machine from
// https://tools.ietf.org/html/rfc8446#appendix-A.2
//
// Since we're only implementing a small subset of TLS1.3,
// we only need a small subset of the handshake.  It basically goes:
//
//   * receive ClientHello
//   * send ServerHello
//   * send server Finished
//   * receive client Finished
//
// We include some unused states for completeness, so that it's easier
// to check the implementation against the diagrams in the RFC.

export class ServerState_START extends State {
    async initialize() {
        // Nothing to initialize, just wait for ClientHello message.
    }
    async recv() {
        await this.conn._getIncomingMessage(ClientHello, this.conn.pskID)
        await this.conn._transition(ServerState_RECVD_CH)
        return this.conn._state.maybeRecv()
    }
}

class ServerState_RECVD_CH extends State {
    async initialize() {
        // In the future we might negotiate connection parameters here.
        await this.conn._transition(ServerState_NEGOTIATED)
    }
}

class ServerState_NEGOTIATED extends State {
    async initialize() {
        await this.conn._addOutgoingMessage(ServerHello, this.conn.pskID)
        await this.conn._addOutgoingMessage(Finished)
        await this.conn._flushOutgoingRecords()
        await this.conn._transition(ServerState_WAIT_FLIGHT2)
    }
}

class ServerState_WAIT_FLIGHT2 extends State {
    async initialize() {
        // If we were doing client-provided auth certificates
        // then we'd deal with them here, but we aren't.
        await this.conn._transition(ServerState_WAIT_FINISHED)
    }
}

class ServerState_WAIT_FINISHED extends State {
    async recv() {
        await this.conn._getIncomingMessage(Finished)
        await this.conn._transition(State_CONNECTED)
        return this.conn._state.maybeRecv()
    }
}