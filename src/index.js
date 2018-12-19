/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

// The top-level APIs offered by this library are `ClientConnection` and
// `ServerConnection` classes.  They each take a callback to be used for
// sending data to the remote peer, and operate like this:
//
//    conn = await ClientConnection.create(psk, pskID, async function send_data_to_server(data) {
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
// The `ServerConnection` API operates similarly; the distinction is mainly
// in which side is expected to send vs receieve during the protocol handshake.

import {
    assert,
    assertIsBytes,
    bytesToHex,
    hexToBytes,
    bytesToUtf8,
    utf8ToBytes
} from './utils.js';

import { State_UNINITIALIZED, State_ERROR } from './statemachine/index.js';
import { ClientState_START } from './statemachine/client.js';
import { ServerState_START } from './statemachine/server.js';

import {
    RecordSender,
    RecordReceiver,
    RECORD_TYPE,
    EMPTY_RECORD_READER
 } from './recordlayer/index.js'

// !!!!!!!
// !!
// !!   N.B. We have not yet implemented the actual encryption bits!
// !!
// !!!!!!!
//
// This first version of the code uses the same "framework" as we would use for
// implementing TLS1.3, including the basic sequence of messages between client and
// server, and the use of binary encoding in an ArrayBuffer for data processing.
// Using an implementation with proper crypto should feel identical to using
// this mock version, except it won't have "Insecure" in the class name...

class InsecureConnection {
    constructor(psk, pskID, sendCallback) {
        this.psk = assertIsBytes(psk);
        this.pskID = assertIsBytes(pskID);
        this.sendCallback = sendCallback;
        this._state = new State_UNINITIALIZED(this);
        this._pendingApplicationData = [];
        this._recordSender = new RecordSender();
        this._recordReceiver = new RecordReceiver();
        this._lastPromise = Promise.resolve();
    }

    // Subclasses will override this with some async initialization logic.
    static async create(psk, pskID, sendCallback) {
        return new this(psk, pskID, sendCallback)
    }

    // These are the three public API methods that
    // consumers can use to connunicate over TLS.

    async send(data) {
        assertIsBytes(data)
        await this._serialize(async () => {
            this._pendingApplicationData.push(data)
            await this._state.sendApplicationData()
        })
    }

    async recv(data) {
        assertIsBytes(data)
        return await this._serialize(async () => {
            const [type, buf] = this._recordReceiver.recv(data);
            return await this._dispatchIncomingRecord(type, buf);
        })
    }

    async close() {
        await this._serialize(async () => {
            await this._state.close()
        })
    }

    // Ensure that async functions execute one at a time,
    // by waiting for the previous call to `_serialize()` to complete
    // before starting a new one.  This helps ensure that we complete
    // one state-machine transition before starting to do the next.
    //
    // XXX TODO: this risks keeping the result of the last call around
    // in memory, we should probably "void" it out somehow on completion.

    _serialize(cb) {
        this._lastPromise = this._lastPromise.then(() => {
            return cb();
        }).catch(async err => {
            // All errors immediately put us in a terminal "error" state.
            await this._transition(State_ERROR, err)
            throw err
        });
        return this._lastPromise;
    }

    // This drives internal transition of the state-machine,
    // ensuring that the new state is properly initialized.

    async _transition(State, ...args) {
        this._state = new State(this);
        await this._state.initialize(...args);
    }

    // These are helpers to allow the state to add data to the next outgoing record.

    async _writeApplicationData(bytes) {
        await this._recordSender.withBufferWriter(RECORD_TYPE.APPLICATION_DATA, async buf => {
            await buf.writeBytes(bytes)
        });
    }

    async _writeHandshakeMessage(typeCls, ...args) {
        await this._recordSender.withBufferWriter(RECORD_TYPE.HANDSHAKE, async buf => {
            buf.writeUint8(typeCls.TYPE_TAG);
            await buf.writeWithLengthPrefix24(async buf => {
                await typeCls.write(buf, ...args)
            });
        });
    }

    async _flushOutgoingRecord() {
        const record = await this._recordSender.flush();
        await this.sendCallback(record);
    }

    // This is a helper for handling incoming records.

    async _dispatchIncomingRecord(type, buf) {
        switch (type) {
            case RECORD_TYPE.ALERT:
                // XXX TODO: implement alert records for communicating errors.
                throw new Error('received TLS alert record, aborting!');
            case RECORD_TYPE.APPLICATION_DATA:
                return await this._state.recvApplicationData(buf);
            case RECORD_TYPE.HANDSHAKE:
                // Each handshake record may contain multiple handshake messages.
                // For simplicity, we assume that handshake messages will not be
                // fragmented across multiple records.  They shouldn't need to be
                // for the tiny subset of TLS that we're using.
                do {
                    const msgType = buf.readUint8();
                    const msgLength = buf.readUint24();
                    await this._state.recvHandshakeMessage(msgType, buf.clamp(msgLength))
                } while (buf.hasMoreBytes());
                return null;
            default:
                assert(false, 'unexpected record type');
        }
    }
}


export class InsecureClientConnection extends InsecureConnection {
    static async create(psk, pskID, sendCallback) {
        const self = await super.create(psk, pskID, sendCallback)
        await self._transition(ClientState_START)
        return self
    }
}


export class InsecureServerConnection extends InsecureConnection {
    static async create(psk, pskID, sendCallback) {
        const self = await super.create(psk, pskID, sendCallback)
        await self._transition(ServerState_START)
        return self
    }
}


// Re-export helpful utilities for calling code to use.

export { bytesToHex, hexToBytes, bytesToUtf8, utf8ToBytes };
