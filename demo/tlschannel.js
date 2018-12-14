

// A wrapper that combines a WebSocket to the channelserver
// with a TLS Connection for "encryption".
//
// This is mainly to help us test out the API and data flow
// on something approaching real production usage patterns.

const CHANNEL_SERVER = 'wss://dev.channelserver.nonprod.cloudops.mozgcp.net/v1/ws/'

const FAKE_PSK = tls.utf8ToBytes('fake psk');
const FAKE_PSK_ID = tls.utf8ToBytes('fake psk id');

class InsecureTLSChannel {

    constructor() {
        this.socket = null
        this.tlsconn = null
        this.channelId = null
        this.onReceive = () => { }
    }

    static create() {
        const self = new this()
        self._makeSocket(CHANNEL_SERVER)
        return new Promise((resolve, reject) => {
            const onChannelCreation = async event => {
                try {
                    // Receive the channelID for the newly-created channel.
                    self.socket.removeEventListener('message', onChannelCreation)
                    const { channelid } = JSON.parse(event.data)
                    // The socket's ready, we can now initialize the TLS state-machine.
                    self.channelId = channelid
                    self.tlsconn = await tls.InsecureServerConnection.create(FAKE_PSK, FAKE_PSK_ID, data => {
                        // To send data over the websocket, it needs to be encoded as a safe string.
                        self.socket.send(tls.bytesToHex(data))
                    })
                    resolve(self)
                } catch (err) {
                    reject(err)
                }
            }
            // XXX TODO: listen for connection errors, and reject the promise.
            self.socket.addEventListener('message', onChannelCreation)
        })
    }

    static async connect(channelId) {
        const self = new this()
        self._makeSocket(CHANNEL_SERVER + channelId)
        return new Promise((resolve, reject) => {
            const onChannelEcho = async event => {
                try {
                  // The channelserver will echo back the provided channelId,
                  // which lets us know we're successully connected.
                  self.socket.removeEventListener('message', onChannelEcho)
                    // The socket's ready, we can now initialize the TLS state-machine.
                    self.channelId = channelId
                    self.tlsconn = await tls.InsecureClientConnection.create(FAKE_PSK, FAKE_PSK_ID, data => {
                        // To send data over the websocket, it needs to be encoded as a safe string.
                        self.socket.send(tls.bytesToHex(data))
                    })
                    resolve(self)
                } catch (err) {
                    reject(err)
                }
            }
            // XXX TODO: listen for connection errors, and reject the promise.
            self.socket.addEventListener('message', onChannelEcho)
        })
    }

    send(data) {
        this.tlsconn.send(tls.utf8ToBytes(data))
    }

    async close() {
        await this.tlsconn.close()
        this.tlsconn = null
        this.socket.close()
    }

    _makeSocket(uri) {
        this.socket = new WebSocket(uri);
        // Once the initial channelserver setup is done, push all data
        // received from websocket into the TLS state-machine to decrypt it,
        // then feed it back out via our own `onReceieve` callback.
        // XXX TODO: be a proper EventTarget?
        this.socket.addEventListener('message', async event => {
            if (this.tlsconn !== null) {
                const { message, sender } = JSON.parse(event.data)
                const data = await this.tlsconn.recv(tls.hexToBytes(message))
                if (data !== null) {
                    // Assume the application wants to deal with strings,
                    // not Uint8Array buffers as returned by the TLS layer.
                    this.onReceive(tls.bytesToUtf8(data), sender)
                }
            }
        })
    }
}