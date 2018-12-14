/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

//
// Various low-level utility functions.
//
// These are mostly conveniences for working with Uint8Arrays as
// the primitive "bytes" type.
//

export function assert(cond, msg) {
    if (!cond) { throw new Error("assert failed: " + msg) }
}

export function assertIsBytes(value, msg='value must be a Uint8Array') {
    assert(value instanceof Uint8Array, msg)
    return value
}

export function bytesToHex(bytes) {
    return Array.prototype.map.call(bytes, byte => {
        let s = byte.toString(16)
        if (s.length === 1) {
            s = '0' + s
        }
        return s
    }).join('')
}

export function hexToBytes(hexstr) {
    assert(hexstr.length % 2 === 0, 'hexstr.length must be even')
    return new Uint8Array(Array.prototype.map.call(hexstr, (c, n) => {
        if (n % 2 === 1) {
            return hexstr[n - 1] + c
        } else {
            return ''
        }
    }).filter(s => {
        return !!s
    }).map(s => {
        return parseInt(s, 16)
    }))
}

export function bytesToUtf8(bytes) {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes)
}

export function utf8ToBytes(str) {
    const encoder = new TextEncoder('utf-8')
    return encoder.encode(str)
}

export function bytesAreEqual(v1, v2) {
    if (v1.length !== v2.length) {
        return false
    }
    for (let i = 0; i < v1.length; i++) {
        if (v1[i] !== v2[i]) {
            return false
        }
    }
    return true
}