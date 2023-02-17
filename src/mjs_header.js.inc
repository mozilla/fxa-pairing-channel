/*!
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * The following bundle is from an external repository at github.com/mozilla/fxa-pairing-channel,
 * it implements a shared library for two javascript environments to create an encrypted and authenticated
 * communication channel by sharing a secret key and by relaying messages through a websocket server.
 *
 * It is used by the Firefox Accounts pairing flow, with one side of the channel being web
 * content from https://accounts.firefox.com and the other side of the channel being chrome native code.
 * 
 * This uses the event-target-shim node library published under the MIT license:
 * https://github.com/mysticatea/event-target-shim/blob/master/LICENSE
 * 
 * Bundle generated from https://github.com/mozilla/fxa-pairing-channel.git. Hash:[hash], Chunkhash:[chunkhash].
 *
 */

// This header provides a little bit of plumbing to use `FxAccountsPairingChannel`
// from Firefox browser code, hence the presence of these privileged browser APIs.
// If you're trying to use this from ordinary web content you're in for a bad time.

import { setTimeout } from "resource://gre/modules/Timer.sys.mjs";

// We cannot use WebSocket from chrome code without a window,
// see https://bugzilla.mozilla.org/show_bug.cgi?id=784686
const browser = Services.appShell.createWindowlessBrowser(true);
const {WebSocket} = browser.document.ownerGlobal;
