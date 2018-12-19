# fxa-pairing-channel [![CircleCI](https://circleci.com/gh/mozilla/fxa-pairing-channel/tree/master.svg?style=svg)](https://circleci.com/gh/mozilla/fxa-pairing-channel/tree/master)

This repo will eventually contain the crypto layer for the FxA pairing flow.
Our current plan is to implement a small subset of TLS1.3, but we're still
working through the details.

For now, you can try out a "mock" version of the crypto layer which uses
the same message sequence as TLS1.3, but doesn't actually do any of the crypto.
See the example integration in `./demo/tlschannel.js` and try it out live
by loading `./demo/test_client.html` and `./demo/test_server.html` in
parallel webpages.
