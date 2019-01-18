# fxa-pairing-channel [![CircleCI](https://circleci.com/gh/mozilla/fxa-pairing-channel/tree/master.svg?style=svg)](https://circleci.com/gh/mozilla/fxa-pairing-channel/tree/master)

This repo implements a shared library for two javascript environments
to create an encrypted and authenticated communication channel, by
sharing a secret key and by relaying messages through a websocket server.

It will be used by the Firefox Accounts pairing flow, with one side
of the channel being web content from https://accounts.firefox.com and
the other side of the channel being a signed-in Firefox instance.

The connection will *eventually* be secured using a pre-shared key
and TLS1.3, but that code is still in progress. To parallelize
client development we've published an initial version with a
correctly-shapred API but no meaningful security.

API
===

The main abstraction is the `InsecurePairingChannel` class.
One side of the connection can create a new channel like this:

```
const channel = await InsecurePairingChannel.create(CHANNEL_SERVER_URL);
console.log(channel.channelId, channel.channelKey);
```

The `channelId` and `channelKey` then need to be transferred to
the intended client, perhaps by scanning a QR code.  It can then
connect to the channel like this:

```
const channel = await InsecurePairingChannel.connect(CHANNEL_SERVER_URL, channelId, channelKey);
```

Both ends of the channel can then send and receive messages using a websocket-like
interface:

```
channel.send("ping")

channel.addEventListener("message", event => {
  const {msg} = event.detail.data;
  console.log(msg); // "pong"
}
```

You can try out a more complete demo of this API by loading
`./demo/test_client.html` and `./demo/test_server.html` in
parallel webpages and watching them pass messages back and forth.