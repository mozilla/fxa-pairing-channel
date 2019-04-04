/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


/* eslint-disable no-unused-vars */
const {
  TLSCloseNotify,
  TLSError,
  PairingChannel,
} = FxAccountsPairingChannel;

const {
  BufferReader,
  BufferWriter,
  ClientConnection,
  Connection,
  DecryptionState,
  EncryptedExtensions,
  EncryptionState,
  Finished,
  HASH_LENGTH,
  KeySchedule,
  NewSessionTicket,
  RecordLayer,
  ServerConnection,
  arrayToBytes,
  hexToBytes,
  hkdfExpand,
  bytesAreEqual,
  bytesToHex,
  bytesToUtf8,
  utf8ToBytes,
  zeros,
} = FxAccountsPairingChannel._internals;
/* eslint-enable no-unused-vars */

describe('FxAccountsPairingChannel', () => {
  const CHANNEL_SERVER = 'wss://dev.channelserver.nonprod.cloudops.mozgcp.net';

  it('throws when network connection fails', async () => {
    await assert.throwsAsync(async () => {
      await PairingChannel.create('wss://nonexistent.example.com');
    }, Error, 'Error while creating the pairing channel');
  });

  describe('a Client and Server connected together', function () {
    // These tests hit the network, cut them some slack.
    this.timeout(10000);

    it('should communicate successfully if they have the same PSK', async () => {
      // Use some careful promises to stitch the two peers together
      // into a single state-machine that doesn't have any deadlocks.
      const CLIENT_RECV = [];
      const SERVER_RECV = [];
      const server = await PairingChannel.create(CHANNEL_SERVER);

      const serverReceived = new Promise((resolve, reject) => {
        server.addEventListener('message', ({detail: {data}}) => {
          SERVER_RECV.push(data.msg);
          resolve();
        });
        server.addEventListener('error', err => {
          reject(err);
        });
      });
      const {channelId, channelKey} = server;
      const client = await PairingChannel.connect(CHANNEL_SERVER, channelId, channelKey);
      const clientReceived = new Promise((resolve, reject) => {
        client.addEventListener('message', ({ detail: { data } }) => {
          CLIENT_RECV.push(data);
          resolve();
        });
        client.addEventListener('error', err => {
          reject(err);
        });
      });

      // Send some application-level data.
      await client.send({msg: 'Hi test message!'});

      await serverReceived;

      // Server receives client ApplicationData.
      assert.equal(CLIENT_RECV.length, 0);
      assert.equal(SERVER_RECV.length, 1);
      assert.equal(SERVER_RECV[0], 'Hi test message!');

      // Server responds and closes.
      await server.send('Oh look, a response!');

      await clientReceived;

      assert.equal(CLIENT_RECV.length, 1);
      assert.equal(SERVER_RECV.length, 1);
      assert.equal(CLIENT_RECV[0], 'Oh look, a response!');

      await server.close();
      await client.close();
      assert.ok(server.closed);
      assert.ok(client.closed);
    });

    it('should fail to complete the handshake if they have a different PSK', async () => {
      const SERVER_ERR = [];
      const SERVER_RECV = [];
      const server = await PairingChannel.create(CHANNEL_SERVER);
      server.addEventListener('message', ({detail: {payload}}) => {
        SERVER_RECV.push(new TextDecoder().decode(payload));
      });
      const errorReceived = new Promise(res => {
        server.addEventListener('error', event => {
          //console.log('ERROR RECV', event.detail, event.detail.error);
          SERVER_ERR.push(event);
          res();
        });
      });
      const {channelId} = server;
      const wrongPsk = new Uint8Array(crypto.getRandomValues(new Uint8Array(server.channelKey.length)));
      const client = await PairingChannel.connect(CHANNEL_SERVER, channelId, wrongPsk);

      assert.throwsAsync(async () => {
        await client.send(new TextEncoder().encode('Hi test message!'));
      }, TLSError, 'DECRYPT_ERROR');

      await errorReceived;

      assert.equal(SERVER_ERR[0].detail.error.message, 'TLS Alert: DECRYPT_ERROR (51)');
      assert.equal(SERVER_RECV.length, 0);
    });
  });
});
