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

    async _add_outgoing_message(msg) {
        this.keys.append_transcript_message(msg)
        this.outgoing_records.add_message(this.keys, msg)
    }

    async _get_incoming_message() {
        const msg = this.incoming_records.get_next_message(this.keys)
        this.keys.append_transcript_message(msg)
    }

    async _flush_outgoing_messages() {
        const data = this.channel.flush()
        await this.send_callback(data)
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
        this.conn.keys.add_psk(this.conn.psk)
        const clientHello = new ClientHello()
        // Allocate client nonce.
        // Make ClientHello message.
        //  - going to need to derive "binder" from keyschedule.
        // - Allocate client salt, and write it.
        // - Write legacy_session_id.
        // - Write our single ciphersuite choice.
        // - Write legacy_compression_methods.
        // - Write extensions, which I haven't figured out yet...
        // TODO: PSK binder stuff:
        //   https://tools.ietf.org/html/rfc8446#section-4.2.11.2
        // This involves a HMAC over the partly-formed ClientHello,
        // with The length fields for the message (including
        // the overall length, the length of the extensions block, and the
        // length of the "pre_shared_key" extension) are all set as if binders
        // of the correct lengths were present.).
        await this.conn._add_outgoing_message(clientHello)
        await this.conn._flush_outgoing_buffer()
        await this.conn._transition(ClientState_WAIT_SH)
    }
}

class ClientState_WAIT_SH extends State {
    async recv() {
        const serverHello = await this.conn._get_incoming_message()
        // Parse ServerHello
        // Do the various checks described in https://tools.ietf.org/html/rfc8446#section-4.1.3
        this.conn.keys.add_ecdhe(null)
        this.conn.keys.update_server_traffic_key()
        await this.conn._transition(ClientState_WAIT_EE)
        return this.conn.state.recv()
    }
}

class ClientState_WAIT_EE extends State {
    async recv() {
        // Recv encrypted extensions
        // assert that we're using psk mode
        await this.conn._transition(ClientState_WAIT_FINISHED)
        return this.conn.state.recv()
    }
}

class ClientState_WAIT_FINISHED extends State {
    async recv() {
        // Recv Finished
        // If we were sending any early data then we'd send `EndOfEarlyData` here,
        // encrypting it with the early-traffic secret.
        // But we don't support that yet, so just go ahead and change the keys.
        this.conn.keys.update_client_traffic_key()
        // Construct and send Finished message.
        await this.conn._add_outgoing_message(clientFinished)
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
        // Read ClientHello packet.
        await this.conn._transition(ServerState_RECVD_CH)
        return this.conn.state.recv()
    }
}

class ServerState_RECVD_CH extends State {
    async recv() {
        // Select parameters from those offered by the client.
        // For our purposes this just checks the PSK_ID.
        await this.conn._transition(ServerState_NEGOTIATED)
        return this.conn.state.recv()
    }
}

class ServerState_NEGOTIATED extends State {
    async initialize() {
        // Send ServerHello
        // K_send = handshake
        // Send EncryptedExtensions
        // [Send CertificateRequest]
        // [Send Certificate + CertificateVerify]
        // Send Finished
        // K_send = application
        // assert(no 0-RTT)
        // K_recv = handshake
        // [Skip decrypt errors]
        await this.conn._transition(ServerState_WAIT_FLIGHT2)
    }
}

class ServerState_WAIT_FLIGHT2 extends State {
    async initialize() {
        // assert(no auth)
        // K_recv = handshake
        // [Skip decrypt errors]
        await this.conn._transition(ServerState_WAIT_FINISHED)
    }
}

class ServerState_WAIT_FINISHED extends State {
    recv() {
        // Recv Finished
        // K_recv = application
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

class Message {
    static read(buf) {
        assert(false, 'not implemented')
    }
    write(buf) {
        assert(false, 'not implemented')
    }
}

class PreSharedKeyExtension extends Message {
    constructor() { }
}

class PskIdentity extends Message {
    constructor(identity) {
        this.identity = identity
    }
    static read(buf) {
        const identity = buf.readOpaqueBytes(1, Math.pow(2, 16) - 1)
        // ignore obfuscated_ticket_age.
        buf.readUint32()
        return new this(identity)
    }
    write(buf) {
        buf.writeOpaqueBytes(this.identity)
        buf.writeUint32(0)
    }
}

class OfferedPsks extends Message {
    static read(buf) {
        const self = new this()
        self.identity = buf.readListOf(PskIdentity, 7, Math.pow(2, 16) - 1)
        self.binders = buf.readListOf(PskBinderEntry, 33, Math.pow(2, 16) - 1)
        return self
    }
    write(buf) {
    }
}

class CipherSuite extends Message {

    static read(buf) {
        const self = new this()
        self.value = buf.readUint16()
        return self
    }
    static write(buf, value) {

    }
}

class Extension extends Message {

}

class ClientHello extends {
    static read(buf) {
        const self = new this()
        assert(buf.readUint16() === 0x0303, 'unexpected legacy_version')
        self.random = buf.readBytes(32)
        self.legacy_session_id = buf.readOpaqueBytes(0, 32)
        self.cipher_suites = buf.readListOf(CipherSuite, 2, Math.pow(2, 16) - 2)
        self.legacy_compression_methods = 
        return self
    }

}
 

class ServerHello extends Message {
        constructor() { }
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