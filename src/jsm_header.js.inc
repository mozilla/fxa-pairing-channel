
ChromeUtils.import("resource://gre/modules/Services.jsm");
let browser = Services.appShell.createWindowlessBrowser(true);
const {WebSocket} = browser.document.ownerGlobal;

const EXPORTED_SYMBOLS = ["FxAccountsPairingChannel"];

