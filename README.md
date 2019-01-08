# fxa-pairing-tls [![CircleCI](https://circleci.com/gh/mozilla/fxa-pairing-tls/tree/master.svg?style=svg)](https://circleci.com/gh/mozilla/fxa-pairing-tls/tree/master)
FxA Pairing TLS dot js

This repo will eventually contain the crypto layer for the FxA pairing flow.
Our current plan is to implement a small subset of TLS1.3, but we're still
working through the details.

For now, you can try out a "mock" version of the crypto layer which uses
the same message sequence as TLS1.3, but doesn't actually do any of the crypto.
Try it out live by loading `./demo/test_client.html` and `./demo/test_server.html` in
parallel webpages.
