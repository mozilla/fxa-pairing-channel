/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

describe('FxAccountsPairingChannel', () => {
  const CHANNEL_SERVER = 'wss://dev.channelserver.nonprod.cloudops.mozgcp.net';

  describe('a Client and Server connected together', () => {

    it('should communicate successfully if they have the same PSK', async () => {
      // Use some careful promises to stitch the two peers together
      // into a single state-machine that doesn't have any deadlocks.
      const CLIENT_RECV = [];
      const SERVER_RECV = [];
      const server = await FxAccountsPairingChannel.InsecurePairingChannel.create(CHANNEL_SERVER);
      const messageReceived = new Promise(res => {
        server.addEventListener('message', ({detail: {data}}) => {
          SERVER_RECV.push(data.msg);
          res();
        });
      });
      const {channelId, channelKey} = server;
      const client = await FxAccountsPairingChannel.InsecurePairingChannel.connect(CHANNEL_SERVER, channelId, channelKey);
      client.addEventListener('message', ({detail: {data}}) => {
        CLIENT_RECV.push(data.msg);
      });

      // Send some application-level data.
      await client.send({msg: 'Hi test message!'});

      await messageReceived;

      // Server receives client ApplicationData.
      assert.equal(SERVER_RECV[0], 'Hi test message!');
    });

    it('should fail to complete the handshake if they have a different PSK', async () => {
      // const SERVER_ERR = [];
      // const SERVER_RECV = [];
      // const server = await FxAccountsPairingChannel.InsecurePairingChannel.create(CHANNEL_SERVER);
      // server.addEventListener('message', ({detail: {payload}}) => {
      //   SERVER_RECV.push(new TextDecoder().decode(payload));
      // });
      // const errorReceived = new Promise(res => {
      //   server.addEventListener('error', event => {
      //     SERVER_ERR.push(event);
      //     res();
      //   });
      // });
      // const {channelId} = server;
      // const wrongPsk = new Uint8Array(crypto.getRandomValues(new Uint8Array(server.channelKey.length)));
      // const client = await FxAccountsPairingChannel.InsecurePairingChannel.connect(CHANNEL_SERVER, channelId, wrongPsk);

      // await client.send(new TextEncoder().encode('Hi test message!'));

      // await errorReceived;

      // assert.equal(SERVER_ERR[0].error, 'boom');
      // assert.equal(SERVER_RECV[0].length, 0);
    });

  });
});
