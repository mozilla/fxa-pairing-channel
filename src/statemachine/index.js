/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

//
// State-machine for TLS Handshake Management.
//
// Internally, we manage the TLS connection by explicitly modelling the
// client and server state-machines from RFC8446.  You can think of
// these `State` objects as little plugins for the `Connection` class
// that provide different behaviours of `send` and `receive` depending
// on the state of the connection.
//
// These are the actual states of the TLS1.3 state-machines and they
// send the same sequence of messages.  They don't use the same byte
// encoding or do any crypto yet though.
//

import { assert } from '../utils.js';
import { ApplicationData } from '../messages.js';

export class State {

    constructor(conn) {
        this.conn = conn
    }

    async initialize() {
        // By default, nothing to do when entering the state.
    }

    async sendApplicationData() {
        // By default, assume we're not ready to send yet
        // and just let the data queue up for a future state.
        // XXX TODO: should this block until it's successfuly sent?
    }

    async recvApplicationData() {
        assert(false, 'not ready to receive application data')
    }

    async recvHandshakeMessage() {
        assert(false, 'not expecting to receive a handhake message')
    }

    async close() {
        assert(false, 'close() not implemented yet')
    }

}

// A special "guard" state to prevent us from using
// an improperly-initialized Connection.

export class State_UNINITIALIZED extends State {
    async initialize() {
        assert(false, 'uninitialized state')
    }
    async sendApplicationData() {
        assert(false, 'uninitialized state')
    }
    async recvApplicationData(record) {
        assert(false, 'uninitialized state')
    }
    async recvHandshakeMessage(type, record) {
        assert(false, 'uninitialized state')
    }
    async close() {
        assert(false, 'uninitialized state')
    }
}

// A special "error" state for when something goes wrong.
// This state never transitions to another state, effecitvely
// terminating the connection.

export class State_ERROR extends State {
    async initialize(err) {
        this.error = err
    }
    async sendApplicationData() {
        throw this.error
    }
    async recvApplicationData(record) {
        throw this.error
    }
    async recvHandshakeMessage(type, record) {
        throw this.error
    }
    async close() {
        throw this.error
    }
}

// The "connected" state, for when the handshake is compelte
// and we're ready to send application-level data.
// The logic for this is symmetric between client and server.

export class State_CONNECTED extends State {
    async initialize() {
        await this.sendApplicationData()
    }
    async sendApplicationData() {
        // We can now send any application data that was
        // submitted before the handshake was complete.
        while (this.conn._pendingApplicationData.length > 0) {
            const data = this.conn._pendingApplicationData.shift()
            await this.conn._writeApplicationData(data)
            await this.conn._flushOutoingRecord()
        }
    }
    async recvApplicationData(record) {
        // Application data has no framing, just return the entire buffer.
        return record.slice(0);
    }
}