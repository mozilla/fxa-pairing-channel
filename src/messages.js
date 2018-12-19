/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

//
// Message parsing.
//
// Herein we need code for reading and writing the various Handshake
// messages involved in the protocol.
//
// For TLS1.3-proper, there's quite a bit of complexity in parsing
// each message type.  We're hoping it's manageable, but need to work
// through a lot of details.
//
// For now, we just send the raw data, prefixied with a length field
// and a simple ascii type indicator.  This forces the calling code to
// deal with binary bytes for the messages but avoids complicated
// parsing code for now.
//

import {
    assert,
    bytesAreEqual
} from './utils.js';

import {
    getRandomBytes
} from './crypto.js'

const HANDSHAKE_TYPE = {
    CLIENT_HELLO: 1,
    SERVER_HELLO: 2,
    FINISHED: 20,
}

const EXTENSION_TYPE = {
    PSK_KEY_EXCHANGE_MODES: 45,
    PRE_SHARED_KEY: 41,
}

const EXPECTED_CIPHER_SUITE = 12; // XXX TODO: the actual value...

const POW_2_8 = Math.pow(2, 8);
const POW_2_16 = Math.pow(2, 16);

const PSK_BINDER_SIZE = 32;

export class ClientHello {

    // struct {
    //   ProtocolVersion legacy_version = 0x0303;
    //   Random random;
    //   opaque legacy_session_id<0..32>;
    //   CipherSuite cipher_suites<2..2^16-2>;
    //   opaque legacy_compression_methods<1..2^8-1>;
    //   Extension extensions<8..2^16-1>;
    // } ClientHello;

    // XXX TODO: -  "supported_versions" is REQUIRED for all ClientHello, ServerHello,
    //              and HelloRetryRequest messages.

    static get TYPE_TAG() {
        return HANDSHAKE_TYPE.CLIENT_HELLO
    }

    static async read(buf, expectedPskID) {
        console.log("READ CH")
        // Fixed value for legacy_version.
        assert(buf.readUint16() === 0x0303, 'unexpected legacy_version');
        // Skip over the random bytes; they get used automagically due to incorporating ClientHello into the transcript hash.
        buf.skipBytes(32);
        // Skip over legacy_session_id.
        buf.skipVector(0, 32);
        // We only support a single ciphersuite, but the peer may offer several.
        // Scan the list to confirm that the one we want is present.
        let foundCipherSuite = false
        buf.readVectorItems(2, POW_2_16 - 1, buf => {
            const cipherSuite = buf.readUint16()
            if (cipherSuite === EXPECTED_CIPHER_SUITE) {
                foundCipherSuite = true
                return true
            }
        })
        console.log("READ CH 1")
        assert(foundCipherSuite, 'peer did not offer correct ciphersuite')
        // Skip over legacy_compression_methods.
        buf.skipVector(1, POW_2_8 - 1);
        console.log("READ CH 2")
        // The only extensions we're interested in are "PSK" and "PSK mode",
        // but we may have to skip over arbitrarily many other extensions to find them.
        // THe PSK extension is always the last one.
        let foundPsk = false, foundPskMode = false, foundPskBinder = false
        buf.readVectorItems(8, POW_2_16 - 1, buf => {
            // XXX TODO: error out if duplicate extension received?
            // Each extension is formatted as:
            //   struct {
            //     ExtensionType extension_type;
            //     opaque extension_data<0..2^16-1>;
            //   } Extension;
            const extType = buf.readUint16()
            console.log("READ CH 3", extType)
            buf.readVectorItems(0, POW_2_16 - 1, buf => {
                switch (extType) {
                    case EXTENSION_TYPE.PSK_KEY_EXCHANGE_MODES:
                        // https://tools.ietf.org/html/rfc8446#section-4.2.9
                        // We only accept "psk_ke", for PSK-only key establishment.
                        const MODE_PSK_KE = 0
                        buf.readVectorItems(1, 255, buf => {
                            if (buf.readUint8() === MODE_PSK_KE) {
                                foundPskMode = true
                                return true
                            }
                        })
                        break
                    case EXTENSION_TYPE.PRE_SHARED_KEY:
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
                        buf.readVectorItems(7, POW_2_16 - 1, (buf, n) => {
                            const identity = buf.readVectorBytes(1, POW_2_16 - 1);
                            buf.skipBytes(4) // Skip over the ticket age.
                            if (bytesAreEqual(identity, expectedPskID)) {
                                foundPsk = n
                                return true
                            }
                        })
                        // XXX TODO: The bytes up to this point represent the transcript for the PSK binder.
                        // We'll have to read a snapshot of them to properly validate the binder.
                        buf.readVectorItems(33, POW_2_16 - 1, (buf, n) => {
                            const binder = buf.readVectorBytes(32, 255)
                            if (n === foundPsk) {
                                foundPskBinder = binder
                                return true
                            }
                        })
                        // XXX TODO: assert that this was the last extension
                        break
                    default:
                        // Ignore all other extensions
                        // XXX TODO: are there any that should cause us to error out?
                        return true;
                }
            })
        })
        assert(foundPsk !== false && foundPskMode && foundPskBinder, `client did not offer an acceptable PSK: ${foundPsk} ${foundPskMode} ${foundPskBinder}`)
        // XXX TODO: validate the PSK binder.
        // For now we're just using 32 zero bytes.
        assert(bytesAreEqual(foundPskBinder, new Uint8Array(PSK_BINDER_SIZE)), 'incorrect psk binder')
    }

    static async write(buf, pskID) {
        buf.writeUint16(0x0303);
        buf.writeBytes(await getRandomBytes(32)); // XXX TODO: probably pass this in, will make testing easier
        // Empty vector for legacy_session_id
        buf.writeVectorBytes(0, POW_2_8 - 1, new Uint8Array(0))
        // Our single supported ciphersuite
        buf.writeVectorItems(2, POW_2_16 - 2, buf => {
            buf.writeUint16(EXPECTED_CIPHER_SUITE);
        });
        // A single zero byte for legacy_compression_methods
        buf.writeVectorBytes(1, POW_2_8 - 1, new Uint8Array(1))
        // Vector of extensions
        buf.writeVectorItems(8, POW_2_16 - 1, buf => {
            // Our single supported PSK mode.
            buf.writeUint16(EXTENSION_TYPE.PSK_KEY_EXCHANGE_MODES)
            buf.writeVectorItems(0, POW_2_16 - 1, buf => {
                buf.writeVectorItems(1, 255, buf => {
                    buf.writeUint8(0)
                })
            })
            // Our single offered pre-shared key.
            buf.writeUint16(EXTENSION_TYPE.PRE_SHARED_KEY)
            buf.writeVectorItems(0, POW_2_16 - 1, buf => {
                // A vector with a single PSK identity.
                buf.writeVectorItems(1, POW_2_16 - 1, buf => {
                    buf.writeVectorBytes(1, POW_2_16 - 1, pskID)
                    buf.writeUint32(0) // Zero for "tag age" field.
                })
                // A vector with a single corresponding PSK binder.
                // We don't actually know the binder yet, so we write
                // zeros for now to ensure the containing buffer length
                // fields get set correctly.
                buf.writeVectorItems(33, POW_2_16 - 1, buf => {
                    buf.writeVectorBytes(32, 255, new Uint8Array(PSK_BINDER_SIZE));
                })
            })
        })
        // XXX TODO: Everything up to the last `PSK_BINDER_SIZE + 4` bytes forms the message
        // transcript for calculating the PSK binder.
    }
}

export class ServerHello {
    static async read(buf, expectedPskId) {
        const len = buf.readUint16()
        buf.expectStr('SH')
        const foundPskID = buf.readBytes(len - 2)
        assert(bytesAreEqual(foundPskID, expectedPskId), 'unexpected pskID')
    }
    static async write(buf, pskID) {
        buf.writeUint16(pskID.byteLength + 2)
        buf.writeStr('SH')
        buf.writeBytes(pskID)
    }
}

export class Finished {
    static async read(buf) {
        assert(buf.readUint16() === 8, 'incorrect Finished length')
        buf.expectStr('FINISHED')
    }
    static async write(buf) {
        buf.writeUint16(8)
        buf.writeStr('FINISHED')
    }
}

export class ApplicationData {
    static async read(buf) {
        const len = buf.readUint16()
        buf.expectStr('AD')
        return buf.readBytes(len - 2)
    }
    static async write(buf, data) {
        buf.writeUint16(data.byteLength + 2)
        buf.writeStr('AD')
        buf.writeBytes(data)
    }
}