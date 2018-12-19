/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

describe('fxaPairingTLS', () => {

  const FAKE_PSK = fxaPairingTLS.utf8ToBytes('fake psk');
  const FAKE_PSK_ID = fxaPairingTLS.utf8ToBytes('fake psk id');

  describe('ClientConnection interface', () => {

    let tlsClient, SENT_DATA;

    beforeEach(async () => {
      SENT_DATA = [];
      tlsClient = await fxaPairingTLS.InsecureClientConnection.create(FAKE_PSK, FAKE_PSK_ID, async data => {
        SENT_DATA.push(data);
      });
    });

    it('should correctly initialize with a PSK', () => {
      assert.deepEqual(tlsClient.psk, FAKE_PSK);
      assert.deepEqual(tlsClient.pskId, FAKE_PSK_ID);
    });

    it('should send initial handshake data on creation', () => {
      assert.equal(SENT_DATA.length, 1);
    });

    it('should offer send, recv, and close methods', () => {
      assert.equal(typeof tlsClient.send, 'function');
      assert.equal(typeof tlsClient.recv, 'function');
      assert.equal(typeof tlsClient.close, 'function');
    });

  });

  describe('ServerConnection interface', () => {

    let tlsServer, SENT_DATA;

    beforeEach(async () => {
      SENT_DATA = [];
      tlsServer = await fxaPairingTLS.InsecureServerConnection.create(FAKE_PSK, FAKE_PSK_ID, async data => {
        SENT_DATA.push(data);
      });
    });

    it('should correctly initialize with a PSK', () => {
      assert.deepEqual(tlsServer.psk, FAKE_PSK);
      assert.deepEqual(tlsServer.pskId, FAKE_PSK_ID);
    });

    it('should not send any data before receiving data from the client', () => {
      assert.equal(SENT_DATA.length, 0);
    });

    it('should offer send, recv, and close methods', () => {
      assert.equal(typeof tlsServer.send, 'function');
      assert.equal(typeof tlsServer.recv, 'function');
      assert.equal(typeof tlsServer.close, 'function');
    });

  });

  describe('a Client and Server connected together', () => {

    it('should communicate successfully if they have the same PSK', async () => {
      // Use some careful promises to stitch the two peers together
      // into a single state-machine that doesn't have any deadlocks.
      const CLIENT_RECV_P = [];
      const SERVER_RECV_P = [];
      let clientP = null;
      const serverP = fxaPairingTLS.InsecureServerConnection.create(FAKE_PSK, FAKE_PSK_ID, data => {
        CLIENT_RECV_P.push(clientP.then(client => client.recv(data)));
      });
      clientP = fxaPairingTLS.InsecureClientConnection.create(FAKE_PSK, FAKE_PSK_ID, data => {
        SERVER_RECV_P.push(serverP.then(server => server.recv(data)));
      });

      // Send some application-level data.
      const client = await clientP;
      await client.send(fxaPairingTLS.utf8ToBytes('hello world!'));

      // Server receives ClientHello, no application data yet.
      assert.equal(await SERVER_RECV_P[0], null);

      // Client receives ServerHello and server Finished, no application data yet.
      assert.equal(await CLIENT_RECV_P[0], null);

      // Server receives client Finished, no application data yet.
      assert.equal(await SERVER_RECV_P[1], null);

      // Server receives client ApplicationData.
      assert.equal(fxaPairingTLS.bytesToUtf8(await SERVER_RECV_P[2]), 'hello world!');
    });

    it('should fail to complete the handshake if they have a different PSK', async () => {
      const WRONG_PSK = fxaPairingTLS.utf8ToBytes('wrong psk');
      const WRONG_PSK_ID = fxaPairingTLS.utf8ToBytes('wrong psk id');

      const SERVER_RECV_P = [];
      const serverP = fxaPairingTLS.InsecureServerConnection.create(FAKE_PSK, FAKE_PSK_ID, data => {
        assert.fail('server should not try to send any data');
      });
      await fxaPairingTLS.InsecureClientConnection.create(WRONG_PSK, WRONG_PSK_ID, data => {
        SERVER_RECV_P.push(serverP.then(server => server.recv(data)));
      });

      // Server receives ClientHello, and errors out.
      try {
        await SERVER_RECV_P[0];
        assert.fail('should have thrown');
      } catch (err) {
        assert.ok(err.message.endsWith('client did not offer a matching PSK'));
      }

      // XXX TODO: the server should send an explicit error signal to the client,
      // causing the client to also enter an error state.
    });

  });
});
