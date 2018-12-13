/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

// The top-level APIs offered by this library are `ClientConnection` and
// `ServerConnection` classes.  They each take a callback to be used for
// sending data to the remote peer, and operate like this:
//
//    conn = new ClientConnection(async function send_data_to_server(data) {
//      // application-specific sending logic here.
//    })
//
//    await conn.initialize(server_name, psk)
//
//    // Send data to the server by calling `send`,
//    // which will use the callback provided in the constructor.
//
//    await conn.send('application-level data')
//
//    // When data is received from the server, push it into
//    // the connection and let it return any decrypted app-level data.
//    // (There might not be any app-level data if it was e.g. a handshake message)
//
//    serverSocket.on('data', async encrypted_data => {
//      const plaintext = await conn.recv(data)
//      if (plaintext !== null) {
//        do_something_with_app_level_data(plaintext)
//      }
//    })
//
//    // It's good practice to explicitly close the connection
//    // when finished, which will send a "closed" notification
//    // to the server.
//
//    await conn.close()
//
// The `ServerConnection` API operates similarly; the distinction is mainly
// in which side is expected to send vs receieve during the handshake.

class Connection {
    constructor() {
        this.state = new State_UNINITIALIZED(this)
        this.keys = new KeySchedule()
        this.incoming_records = new IncomingRecordBuffer()
        this.outgoing_records = new OutgoingRecordBuffer()
        this.pending_app_data = []
    }

    async initialize() {
        await this.state.initialize()
    }

    async send(data) {
        this.pending_app_data.push(data)
        await this.state.send()
    }

    async recv(data) {
        // push the data onto some sort of record buffer, so we can parse the record into messages.
        return this.state.recv()
    }

    async close() {
        await this.state.close()
    }

    async _transition(State) {
        this.state = new State(this)
        await this.state.initialize()
    }

    async _add_outgoing_message(typeCls, ...args) {
        const buf = CREATE_SOME_SORT_OF_BUF_WRAPPER(this.outgoing_records, this.keys)
        // XXX TODO: write the type tag and message framing.
        await typeCls.write(buf, ...args)
        this.keys.SOMEHOW_APPEND_WHAT_WE_JUST_WROTE_TO_THE_TRANSCRIPT()
    }

    async _get_incoming_message(typeCls, ...args) {
        const buf = CREATE_SOME_SORT_OF_BUF_WRAPPER(this.incoming_records, this.keys)
        // XXX TODO: read the type tag and message framing.
        // Check that the type tag matches the given type class.
        const result = await typeCls.parse(buf, ...args)
        this.keys.SOMEHOW_APPEND_WHAT_WE_JUST_READ_TO_THE_TRANSCRIPT()
        return result
    }

    async _flush_outgoing_messages() {
        SOMEHOW_FINALIZE_THE_OUTGOING_BUFFER()
        TRIGGER_A_SEND_CALLBACK_OR_SOMETHING()
    }
}

class ClientConnection extends Connection {
    async initialize() {
        await this._transition(ClientState_START)
    }
}

class ServerConnection extends Connection {
    async initialize() {
        await this._transition(ServerState_START)
    }
}

//
// Handshake Management.
//
// Internally, we drive the connection by explicitly modelling the
// client and server state-machines from RFC8446.  You can think of
// these `State` objects as little plugins for the `Connection` class
// that provide different behaviours of `send` and `receive` depending
// on the state of the connection.
//

class State {

    constructor(conn) {
        this.conn = conn
    }

    async initialize() {
        // By default, nothing to do when entering the state.
    }

    async send() {
        // By default, assume we're not ready to send yet
        // and just queue the data for a future state.
    }

    async recv() {
        // By default, we just accumulate received data in the
        // incoming_buffer until a future state is ready to consume it.
        return null
    }

    async close() {
        assert(false, 'not implemented')
    }

}

// A special "guard" state to prevent us from using
// an improperly-initialized Connection.

class State_UNINITIALIZED extends State {
    async initialize() {
        assert(false, 'uninitialized state')
    }
    async send() {
        assert(false, 'uninitialized state')
    }
    async recv() {
        assert(false, 'uninitialized state')
    }
    async close() {
        assert(false, 'uninitialized state')
    }
}

// These states implement (part of) the client state-machine from
// https://tools.ietf.org/html/rfc8446#appendix-A.1

class ClientState_START extends State {
    async initialize() {
        await this.conn.keys.add_psk(this.conn.psk)
        const binder_key = await this.conn.keys.derive_secret('ext binder', '')
        await this.conn._add_outgoing_message(ClientHello, this.conn.psk_id, binder_key)
        await this.conn._flush_outgoing_buffer()
        await this.conn._transition(ClientState_WAIT_SH)
    }
}

class ClientState_WAIT_SH extends State {
    async recv() {
        await this.conn._get_incoming_message(ServerHello, this.conn.psk_id)
        // Do the various checks described in https://tools.ietf.org/html/rfc8446#section-4.1.3
        // No ECDHE, at least for now.
        this.conn.keys.add_ecdhe(null)
        this.conn.keys.update_server_traffic_key()
        await this.conn._transition(ClientState_WAIT_EE)
        return this.conn.state.recv()
    }
}

class ClientState_WAIT_EE extends State {
    async recv() {
        // Recv encrypted extensions
        // XXX TODO: we didn't advertize any extensions that could be encrypted,
        // is it an error for the server to send us some in response?
        await this.conn._transition(ClientState_WAIT_FINISHED)
        return this.conn.state.recv()
    }
}

class ClientState_WAIT_FINISHED extends State {
    async recv() {
        await this.conn._get_incoming_message(ServerFinished, server_finished_key)
        // If we were sending any early data then we'd send `EndOfEarlyData` here,
        // encrypting it with the early-traffic secret.
        // But we don't support that yet, so just go ahead and change the keys.
        this.conn.keys.update_client_traffic_key()
        // Construct and send Finished message.
        await this.conn._add_outgoing_message(ClientFinished, client_finished_key)
        await this.conn._flush_outgoing_buffer()
        // The handshake is complete!
        this.conn.keys.finalize()
        this.conn.keys.update_server_traffic_key()
        this.conn.keys.update_client_traffic_key()
        await this.conn._transition(ClientState_CONNECTED)
        return this.conn.state.recv()
    }
}

class ClientState_CONNECTED extends State {
    async initialize() {
        assert(false, 'not implemented: send pending application-level data')
    }
    async send() {
        assert(false, 'not implemented: send application-level data')
    }
    async recv() {
        assert(false, 'not implemented: recv application-level data')
    }
}

// These states implement (part of) the server state-machine from
// https://tools.ietf.org/html/rfc8446#appendix-A.2

class ServerState_START extends State {
    async initialize() {
        // Nothing to initialize, just wait for ClientHello message.
    }
    async recv() {
        await this.conn.keys.add_psk(this.conn.psk)
        const binder_key = await this.conn.keys.derive_secret('ext binder', '')
        await this.conn._get_incoming_message(ClientHello, this.conn.psk_id, binder_key)
        await this.conn._transition(ServerState_RECVD_CH)
        return this.conn.state.recv()
    }
}

class ServerState_RECVD_CH extends State {
    async recv() {
        // In the future we might negotiate connection parameters here.
        // For now, we know that if we successfully read the Client Hello
        // then it offered an appropriate PSK, so there's nothing to negotiate.
        await this.conn._transition(ServerState_NEGOTIATED)
        return this.conn.state.recv()
    }
}

class ServerState_NEGOTIATED extends State {
    async initialize() {
        await this.conn._add_outgoing_message(ServerHello)
        // No ECDHE, at least for now.
        this.conn.keys.add_ecdhe(null)
        this.conn.keys.update_server_traffic_key()
        // We would send encrypted extensions here, if we supported any.
        await this.conn._add_outgoing_message(ServerFinished, server_finished_key)
        await this.conn._flush_outgoing_buffer()
        // We don't support 0-RTT data, so we don't need to
        // worry about some more complicated states here.
        // Handshake is finished, but we can't update the client traffic key
        // until we're received the its Finished message.
        this.conn.keys.finalize()
        this.conn.keys.update_server_traffic_key()
        await this.conn._transition(ServerState_WAIT_FLIGHT2)
    }
}

class ServerState_WAIT_FLIGHT2 extends State {
    async initialize() {
        // If we were doing client-provided auth certificates
        // we'd deal with them here, but we aren't.
        await this.conn._transition(ServerState_WAIT_FINISHED)
    }
}

class ServerState_WAIT_FINISHED extends State {
    recv() {
        await this.conn._get_incoming_message(Finished, client_finished_key)
        this.conn.keys.update_client_traffic_key()
        await this.conn._transition(ServerState_CONNECTED)
        return this.conn.state.recv()
    }
}

class ServerState_CONNECTED extends State {
    async initialize() {
        assert(false, 'not implemented: send pending application-level data')
    }
    async send() {
        assert(false, 'not implemented: send application-level data')
    }
    async recv() {
        assert(false, 'not implemented: recv application-level data')
    }
}

//
// Key Schedule.
//
// This implements the key-derivation schedule from https://tools.ietf.org/html/rfc8446#section-7.
//

class KeySchedule {
    constructor() {
        this.transcript = SomeSortOfBuffer()
        this.secret = null
        this.client_write_key = null
        this.client_write_iv = null
        this.server_write_key = null
        this.server_write_iv = null
        // XXX TODO: probably some nonces here too...
    }

    async append_transcript_message(bytes) {
        assert(false, 'not implemented')
    }

    async _get_current_transcript_hash() {
        assert(false, 'not implemented')
    }

    async derive_secret(label, messages = true) {
        this._hkdf_expand_label(this.secret, label, this.get_current_transcript_hash(), this.HASH_LENGTH)
    }

    async add_psk(psk) {
        // Use the PSK (if any) to calculate the "early secret".
        // We don't support sending early traffic, so we don't calculate any traffic keys here.
        psk = psk || this.ZERO
        this.secret = await this._hkdf_extract(psk, this.ZERO)
    }

    async add_ecdhe(ecdhe) {
        // Mix in the ECDHE output (if any) to calculate the "handshake secret".
        // Any subsequent handshake messages will be encrypted with derived traffic keys.
        ecdhe = ecdhe || this.ZERO
        this.secret = await this._hkdf_extract(ecdhe, await this.derive_secret('derived', ''))
        this._calculate_traffic_keys(
            await this._derive_secret('c hs traffic'), // XXX TODO: assert that ServerHello message is present?
            await this._derive_secret('s hs traffic'),
        )
    }

    async finalize() {
        // Mix in the remainder of the handshake transcript to calculate the final "master secret".
        // Any subsequent handshake will be encrypted with derived traffic kesy.
        this.secret = await this._hkdf_extract(ZEROS, await this._derive_secret('derived', ''))
        this._calculate_traffic_keys(
            await this._derive_secret('c ap traffic'), // XXX TODO: assert that ServerHello message is present?
            await this._derive_secret('s ap traffic'),
        )
    }

    async _calculate_traffic_keys(client_traffic_secret, server_traffic_secret) {
        this.client_write_key = await this._hkdf_expand_label(client_traffic_secret, 'key', '', this.KEY_LENGTH)
        this.client_write_iv = await this._hkdf_expand_label(client_traffic_secret, 'iv', '', this.IV_LENGTH)
        this.server_write_key = await this._hkdf_expand_label(server_traffic_secret, 'key', '', this.KEY_LENGTH)
        this.server_write_iv = await this._hkdf_expand_label(server_traffic_secret, 'iv', '', this.IV_LENGTH)
    }

    async _hkdf_extract(ikm, salt) {
        assert(false, 'not implemented')
    }

    async _hkdf_expand_label(secret, label, context, length) {
        HKDF - Expand(Secret, HkdfLabel, Length)

        Where HkdfLabel is specified as:

        struct {
            uint16 length = Length;
            opaque label < 7..255 > = "tls13 " + Label;
            opaque context < 0..255 > = Context;
        } HkdfLabel;
    }

    // XXX TODO: expose some encrypt/decrypt helpers for use by the record layer.
}


//
// Message parsing.
//
// Herein we need code for reading and writing the various Handshake
// messages involved in the protocol.  We might one day expand it to
// include alert messages as well.
//
// I haven't really figured how to approach this yet...
//

class ClientHello {

    // struct {
    //   ProtocolVersion legacy_version = 0x0303;
    //   Random random;
    //   opaque legacy_session_id<0..32>;
    //   CipherSuite cipher_suites<2..2^16-2>;
    //   opaque legacy_compression_methods<1..2^8-1>;
    //   Extension extensions<8..2^16-1>;
    // } ClientHello;

    async static parse(buf, psk_id, binder_key) {
        // We're going to need the ClientHello bytes to verify the PSK binder.
        const transscriptStart = buf.position()
        let transcriptEnd;
        // Fixed value for legacy_version.
        assert(buf.readUint16() === 0x0303, 'unexpected legacy_version')
        // Ignore random.  It gets used automagically due to incorporating ClientHello into the transcript hash.
        buf.skipBytes(32)
        // Ignore legacy_session_id.
        buf.skipVector(0, 32)
        // We only support a single ciphersuite, but the peer may offer several.
        // Scan them to confirm that the one we want is present.
        let foundCipherSuite = false
        buf.readVectorItems(2, POW_2_16 - 1, n => {
            const cipherSuite = buf.readUint16()
            if (cipherSuite === EXPCTED_CIPHER_SUITE) {
                foundCipherSuite = true
                return false
            }
        })
        assert(foundCipherSuite, 'peer did not offer correct ciphersuite') // XXX TODO: this should send a specific error message back to the peer
        // Ignore legacy_compression_methods.
        buf.skipVector(1, POW_2_8 - 1)
        // The only extensions we're interested in are PSK and PSK mode,
        // but we may have to skip over arbitrarily many other extensions to find them.
        // THe PSK extension is always the last one.
        let foundPsk = false, foundPskMode = false, foundPskBinder = false
        buf.readVectorItems(8, POW_2_16 - 1, () => {
            // XXX TODO: error out if duplicate extension received?
            // Each extension is formatted as:
            //   struct {
            //     ExtensionType extension_type;
            //     opaque extension_data<0..2^16-1>;
            //   } Extension;
            const extType = buf.readUint16()
            buf.readVectorItems(0, POW_2_16 - 1, () => {
                switch (extType) {
                    case EXTENSION_PSK_KEY_EXCHANGE_MODES:
                        // https://tools.ietf.org/html/rfc8446#section-4.2.9
                        // We only accept "psk_ke", that is, PSK-only key establishment.
                        const MODE_PSK_KE = 0
                        buf.readVectorItems(1, 255, () => {
                            if (buf.readByte() === MODE_PSK_KE) {
                                foundPskMode = true
                                return false
                            }
                        })
                        break
                    case EXTENSION_PRE_SHARED_KEY:
                        // https://tools.ietf.org/html/rfc8446#section-4.2.11
                        // The extension data contains an `OfferredPsks` struct:
                        //  struct {
                        //    opaque identity<1..2^16-1>;
                        //    uint32 obfuscated_ticket_age;
                        //  } PskIdentity;
                        //  opaque PskBinderEntry<32..255>;
                        //  struct {
                        //    PskIdentity identities<7..2^16-1>;
                        //    PskBinderEntry binders<33..2^16-1>;
                        //  } OfferedPsks;
                        buf.readVectorItems(7, POW_2_16 - 1, n => {
                            const identity = buf.readVector(1, POW_2_16 - 1)
                            buf.skipBytes(4)
                            if (identity === psk_id) {
                                foundPsk = n
                                return false
                            }
                        })
                        // The bytes up to this point represent the transcript for the PSK binder.
                        transscriptEnd = buf.position()
                        buf.readVectorItems(33, POW_2_16 - 1, n => {
                            const binder = buf.readVector(32, 255)
                            if (n === foundPsk) {
                                foundBinder = binder
                                return true
                            }
                        })
                        // XXX TODO: assert that this was the last extension
                        break
                    default:
                        // Ignore all other extensions
                        // XXX TODO: are there any that should cause us to error out?
                        break
                }
            })
        })
        assert(foundPsk !== false && foundPskMode && foundPskBinder, 'client did not offer an acceptable PSK')
        // Now we can validate the PSK binder.
        const expectedBinder = await HMAC(binder_key, Transcript_hash(buf.snapshot(transcriptStart, transcriptEnd)))
        if (foundBinder !== expectedBinder) { // XXX TODO: constant-time compare
            assert(false, 'bad PSK binder')
        }
    }

    async static write(buf, psk_id, binder_key) {
        const BINDER_LENGTH = 64
        // struct {
        //   ProtocolVersion legacy_version = 0x0303;    /* TLS v1.2 */
        //   Random random;
        //   opaque legacy_session_id<0..32>;
        //   CipherSuite cipher_suites<2..2^16-2>;
        //   opaque legacy_compression_methods<1..2^8-1>;
        //   Extension extensions<8..2^16-1>;
        // } ClientHello;
        buf.writeUint16(0x0303)
        buf.writeRandomBytes(32)
        // Empty vector for legacy_session_id
        buf.writeVectorWithItems(1, POW_2_8 - 1, () => { })
        // Our single supported ciphersuite
        buf.writeVectorWithItems(2, POW_2_16 - 2, () => {
            buf.writeUint16(EXPECTED_CIPHER_SUITE)
        })
        // Empty vector for legacy_compression_methods
        buf.writeVectorWithItems(1, POW_2_8 - 1, () => { })
        // Vector of extensions
        buf.writeVectorWithItems(8, POW_2_16 - 1, () => {
            // Our single supported PSK mode.
            buf.writeUint16(EXTENSION_PSK_KEY_EXCHANGE_MODES)
            buf.writeVectorWithItems(0, POW_2_16 - 1, () => {
                buf.writeVectorWithItems(1, 255, () => {
                    buf.writeByte(0)
                })
            })
            buf.writeUint16(EXTENSION_PRE_SHARED_KEY)
            buf.writeVectorWithItems(0, POW_2_16 - 1, () => {
                // A vector with a single PSK identity.
                buf.writeVectorWithItems(1, POW_2_16 - 1, () => {
                    buf.writeVector(1, POW_2_16 - 1, psk_id)
                    buf.writeUint32(0)
                })
                // A vector with a single corresponding PSK binder.
                // We don't actually know the binder yet, so we write
                // zeros for now to ensure the containing buffer length
                // fields get set correctly.
                buf.writeItemForVector(33, POW_2_16 - 1, () => {
                    buf.writeVector(33, POW_2_16 - 1, () => {
                        buf.writeVector(32, 255, new Uint8Array(BINDER_LENGTH))
                    })
                })
            })
        })
        // Everything up to the last `BINDER_LENGTH + 4` bytes forms the message
        // transcript for calculating the PSK binder.
        buf.rewind(BINDER_LENGTH + 4)
        const binder = await HMAC(binder_key, Transcript_hash(buf.snapshot()))
        buf.writeItemForVector(33, POW_2_16 - 1, () => {
            buf.writeVector(33, POW_2_16 - 1, () => {
                buf.writeVector(32, 255, binder)
            })
        })
    }
}

//
// Record layer.
//
// Here we implement the low-level "record protocol" of TLS1.3,
// which defines how messages get encrypted and sent over the wire.
// Ref https://tools.ietf.org/html/rfc8446#section-5
//

const RECORD_CONTENT_TYPE_NAMES = {
    21: "ALERT",
    22: "HANDSHAKE",
    23: "APPLICATION_DATA",
}

const RECORD_CONTENT_TYPE_VALUES = {
    ALERT: 21
    HANDSHAKE: 22,
    APPLICATION_DATE: 23,
}

// A helper class for accumulating incoming data from the app,
// parsing it according to the TLS record protocol, and yielding
// the resulting messages.
//
// For now, we assume that the application receives whole TLS Records,
// each of which will contain one or more Messages.  So we don't have to
// worry about trying to stitch together data that's fragmented across
// multiple records.

class IncomingRecordBuffer {
    constructor() {
        this.pending = []
        this.head = null
        this.i = 0
    }

    append(data) {
        if (this.head === null) {
            this.head = new Uint8Array(data)
            this.i = 0
        } else {
            this.pending.push(data)
        }
    }

    async get_next_message(cipher) {
        if (this.head === null) {
            return null
        }
        let type = this._readByte()
        assert(this._readUint16() === 0x0303, 'unexpected legacy_record_version')
        const length = this._readUint16()
        // XXX TODO: assert sensible length
        // XXX TODO: assert that we have `length` bytes available.
        // If we haven't reached the point where we've got keys,
        // data gets sent unencrypted as a `TLSPlaintext` struct.
        if (!cipher) {
            assert(type !== RECORD_CONTENT_TYPE_VALUES.APPLICATION_DATA, 'must encrypt application data');
            const plaintext = this._readBytes(length)
            return [type, plaintext]
        }
        // Otherwise, decrypt and decode an `TLSInnerPlaintext` struct.
        // We have to scan backwards over any zero padding at the end of the string.
        const padded_plaintext = await cipher.decrypt(this._readBytes(length));
        for (let i = padded_plaintext.length; i >= 0; i--) {
            if (padded_plaintext[i] !== 0) {
                break;
            }
        }
        assert(i >= 0, 'failed to find content-type byte')
        type = padded_plaintext[i]
        return [type, new Uint8Array(padded_plaintext.buffer, 0, i)]
    }

    _readBytes(length) {
        let slice = new Uint8Array(this.buf.buffer, this.buf.byteOffset + this.i, length)
        this._incr(length)
        return slice
    }

    _readByte() {
        return this._readBytes(1)[0]
    }

    _readUint16(n) {
        n = (this.buf[i] << 8) | this.buf[i + 1]
        this._incr(2)
        return n
    }

    _incr(length) {
        this.i += length
        assert(this.i <= this.buf.byteLength, "should not have read past end of buffer")
        if (this.i == this.buf.byteLength) {
            this.i = 0
            if (this.pending.length > 0) {
                this.head = new Uint8Array(this.pending.unshift())
            } else {
                this.head = null
            }
        }
    }
}


// A helper class for accumulating outgoing data to be sent by the app,
// allowing us to coalesce multiple Messages into a single Record.
// As above, we assume that we don't need to fragment things across
// multiple records.

class OutgoingRecordBuffer {
    constructor(size = 65535) { // XXX TODO: fix max size.
        this.i = 0
        this.size = size
        this.buf = new Uint8Array(size)
    }

    async add_message(cipher, type, plaintext) {
        // XXX TODO: check that we haven't changed keys since last time.
        assert(type in RECORD_CONTENT_TYPE_NAMES, `unsupported record type: ${type}`)
        assert(plaintext.byteLength < Math.pow(2, 14), 'plaintext fragment too large')
        // If we haven't reached the point where we've got keys,
        // data gets sent unencrypted as a `TLSPlaintext` struct.
        if (!cipher) {
            assert(type !== RECORD_CONTENT_TYPE_VALUES.APPLICATION_DATA, 'must encrypt application data');
            // struct {
            //   ContentType type;
            //   ProtocolVersion legacy_record_version;
            //   uint16 length;
            //   opaque fragment[TLSPlaintext.length];
            // } TLSPlaintext;
            this._writeByte(type);
            this._writeUint16(0x0303);
            this._writeUint16(plaintext.byteLength);
            this._writeBytes(plaintext);
        } else {
            // Otherwise, we first encode as a `TLSInnerPlaintext`; format is:
            // struct {
            //    opaque content[TLSPlaintext.length];
            //    ContentType type;
            //    uint8 zeros[length_of_padding];
            //} TLSInnerPlaintext;
            // We do not include any zeros for padding.
            const ptbuf = new Uint8Array(plaintext.byteLength + 1);
            ptbuf.set(plaintext, 0);
            ptbuf[plaintext.byteLength] = type;
            const encrypted_record = await cipher.encrypt(ptbuf)
            // Now encode into a `TLSCiphertext` struct; format is:
            // struct {
            //    ContentType opaque_type = application_data; /* 23 */
            //    ProtocolVersion legacy_record_version = 0x0303; /* TLS v1.2 */
            //    uint16 length;
            //    opaque encrypted_record[TLSCiphertext.length];
            //} TLSCiphertext;
            let ctbuf = new OutputBuffer();
            this._writeByte(RECORD_CONTENT_TYPE_VALUES.APPLICATION_DATA)
            this._writeUint16(encrypted_record.byteLength)
            this._writeBytes(encrypted_record)
        }
    }

    _incr(length) {
        this.i += length
        assert(this.i <= this.size, "do not write past end of buffer")
    }

    _writeBytes(data) {
        this.buf.set(data, this.i)
        this._incr(data.byteLength)
    }

    _writeByte(b) {
        this.buf[this.i] = b
        this._incr(1)
    }

    _writeUint16(n) {
        this.buf[this.i] = n >> 8
        this.buf[this.i + 1] = n & 0xFF
        this._incr(2)
    }
}

//
// Miscelaneous helper functions.
//

function assert(cond, msg) {
    if (!cond) { throw new Error("assert failed: " + msg) }
}