# fxa-pairing-channel [![CircleCI](https://circleci.com/gh/mozilla/fxa-pairing-channel/tree/master.svg?style=svg)](https://circleci.com/gh/mozilla/fxa-pairing-channel/tree/master)

This repo implements a shared library for two javascript environments
to create an encrypted and authenticated communication channel, by
sharing a secret key and by relaying messages through a websocket server.

It is used by the [Firefox Accounts pairing flow](
https://mozilla.github.io/ecosystem-platform/docs/features/firefox-accounts/pairing),
with one side of the channel being web content from https://accounts.firefox.com and
the other side of the channel being a signed-in Firefox instance.


API
===

To use this library, each side needs to agree on the URL of a
[channelserver](https://github.com/mozilla-services/channelserver)
instance which they can use to exchange messages via WebSocket:

```
const CHANNEL_SERVER_URL = "wss://channelserver.services.mozilla.com"
```

The main abstraction is the `PairingChannel` class.
One side of the connection can create a new channel like this:

```
const channel = await PairingChannel.create(CHANNEL_SERVER_URL);
console.log(channel.channelId, channel.channelKey);
```

This produces a `channelId` and `channelKey` that need to be transferred to
the intended client, perhaps by scanning them from a QR code.

The client can then connect to the channel like this:

```
const {channelId, channelKey} = OBTAIN_THESE_BY_SOME_OUT_OF_BAND_MECHANISM();
const channel = await PairingChannel.connect(CHANNEL_SERVER_URL, channelId, channelKey);
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


Crypto
======

Under the hood, the `PairingChannel` implements the "externally-provisioned
pre-shared key" mode of [TLS1.3](https://tools.ietf.org/html/rfc8446).
Each side of the channel can thus be assured that its peer is in possession
of the `channelKey`, and that their traffic is protected from anyone who
does not possess this key, even from the intermediary channelserver through
which they exchange messages.

As a consumer of this library, you shouldn't need to care about any of those
details though - just use the provided APIs to handle all the Crypto bits
for you.


Development and Maintenance
===========================

This library is basically "done", inasmuch as it works and we are not planning
any feature additions. We are still maintaining it to keep up-to-date with tooling
and dependency changes, security fixes, etc.

### Source Code

The main source code for the library is found under `./src`. Since the code gets
vendored into the Firefox client distribution, we try to avoid taking any external
dependencies (currently the only dependency is the `event-target-shim` package).

### Tests

There is an extensive test suite under `./test`, covering many of the crypto edge-cases
that motived the choice to use TLS rather than an ad-hoc protocol. To run them use the
usual npm test runner:

```
npm test
```

This uses the [Karma](https://karma-runner.github.io) test runner to execute
the tests in a live browser.

Running the tests will also produces coverage reports under `./coverage`,
which can be viewed with a web browser. We strive for very close to 100%
test coverage, because this is crypto-related code where even the edgiest
of edge-cases can have serious consequences if mis-handled.

### Build Artifacts

The main sources get transpiled into two built distribution artifacts, one for use by
web content and one for vendoring into the Firefox source tree:

* `./dist/FxAccountsPairingChannel.babel.umd.js` is transpiled to ES5-compatible JavaScript
  using [Babel](https://babeljs.io/), and is suitable for use in web content that must
  run in any (within reason!) browser. This is the artifact that gets used on the FxA
  website for the client side of the pairing flow.
* `./dist/FxAccountsPairingChannel.sys.mjs` is Firefox browser code, suitable only for use
  within the Firefox browser application itself. This gets manually copied over into
  [`mozilla-central/services/fxaccounts/FxAccountsPairingChannel.sys.mjs`](
  https://searchfox.org/mozilla-central/source/services/fxaccounts/FxAccountsPairingChannel.sys.mjs)
  when making a new release.

To generate these files from the current `./src` tree, run:

```
npm run build
```

For ease of consumption, we check the resulting built artifacts in to the Git repo.

### Release Process

Use `npm version` and `npm publish` to cut a new release, after ensuring that the tests pass
and the correct artifacts have been built:

```
npm run build
npm test
npm version [major | minor | patch] -m "Prepare version %s"
npm publish
git push origin vX.Y.Z
```

Then, open a [Bugzilla Bug](https://bugzilla.mozilla.org/enter_bug.cgi?product=Firefox&component=Firefox%20Accounts) to update the vendored copy of the library in mozilla-central.
Copy `./dist/FxAccountsPairingChannel.sys.mjs` to [`services/fxaccounts/FxAccountsPairingChannel.sys.mjs`](
https://searchfox.org/mozilla-central/source/services/fxaccounts/FxAccountsPairingChannel.sys.mjs) in
the mozilla-central source tree. The details of how to submit the resulting patch to mozilla-central
are outside the scope of this document.
