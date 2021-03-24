
// This header provides a little bit of plumbing to use `FxAccountsPairingChannel`
// from Firefox browser code, hence the presence of these privileged browser APIs.
// If you're trying to use this from ordinary web content you're in for a bad time.

const {Services} = ChromeUtils.import("resource://gre/modules/Services.jsm");
const {setTimeout} = ChromeUtils.import("resource://gre/modules/Timer.jsm");
// We cannot use WebSocket from chrome code without a window,
// see https://bugzilla.mozilla.org/show_bug.cgi?id=784686
const browser = Services.appShell.createWindowlessBrowser(true);
const {WebSocket} = browser.document.ownerGlobal;

const EXPORTED_SYMBOLS = ["FxAccountsPairingChannel"];

