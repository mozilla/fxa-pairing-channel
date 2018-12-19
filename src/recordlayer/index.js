/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

//
// This directory implements the "record layer" for TLS1.3, as defined in
// https://tools.ietf.org/html/rfc8446#section-5.  It's responsible for
// encrypting/decrypting bytes to be sent over the write, and provides
// some helpers for parsing the binary structs that make up the higher-level
// TLS "message layer".
//
// To read incoming data from the peer, use the `IncomingRecordBuffer` class.
//
// To prepare outgoing data to send to the peer, use the `OutgoingRecordBuffer` class.
//

import { IncomingRecordBuffer, EMPTY_RECORD_READER } from './incoming.js';
import { OutgoingRecordBuffer } from './outgoing.js';

export const RECORD_TYPES = {
    21: "ALERT",
    22: "HANDSHAKE",
    23: "APPLICATION_DATA",
};

export const RECORD_TYPE = {
    ALERT: 21,
    HANDSHAKE: 22,
    APPLICATION_DATA: 23,
};

export { IncomingRecordBuffer, OutgoingRecordBuffer };
