
ChromeUtils.import("resource://gre/modules/Services.jsm");
// We cannot use WebSocket from chrome code without a window,
// see https://bugzilla.mozilla.org/show_bug.cgi?id=784686
let browser = Services.appShell.createWindowlessBrowser(true);
const {WebSocket} = browser.document.ownerGlobal;

const EXPORTED_SYMBOLS = ["FxAccountsPairingChannel"];

