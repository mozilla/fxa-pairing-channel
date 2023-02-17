/* global __dirname, require, module*/

const webpack = require('webpack');
const fs = require('fs');

const BANNER = `
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.

The following bundle is from an external repository at github.com/mozilla/fxa-pairing-channel,
it implements a shared library for two javascript environments to create an encrypted and authenticated
communication channel by sharing a secret key and by relaying messages through a websocket server.

It is used by the Firefox Accounts pairing flow, with one side of the channel being web
content from https://accounts.firefox.com and the other side of the channel being chrome native code.

This uses the event-target-shim node library published under the MIT license:
https://github.com/mysticatea/event-target-shim/blob/master/LICENSE

Bundle generated from https://github.com/mozilla/fxa-pairing-channel.git. Hash:[hash], Chunkhash:[chunkhash].
`;
const LIBRARY_NAME = 'FxAccountsPairingChannel';
const ENTRYPOINT = __dirname + '/src/index.js';
const EXPORT_PATH = __dirname + '/dist';

const WrapperPlugin = require('wrapper-webpack-plugin');
const bannerPlugin = new webpack.BannerPlugin({
  banner: BANNER
});
const headerPlugin = new WrapperPlugin({
  header(filename, args) {
    const headerDoc = fs.readFileSync('./src/mjs_header.js.inc', 'utf8');
    return headerDoc.replace("[hash]", args.hash).replace("[chunkhash]", args.chunkhash);
  },
});

const outputConfig = {
  // library: LIBRARY_NAME,
  path: EXPORT_PATH,
};

const libraryConfig = {
  entry: ENTRYPOINT,
  mode: 'production',
  output: {},
  optimization: {
    minimize: false,
  },
};

const firefoxMjsConfig = {
  ...libraryConfig,
  output: {
    ...outputConfig,
    filename: `${LIBRARY_NAME}.sys.mjs`,
    libraryTarget: 'module',
    libraryExport: 'PairingChannel',
  },
  experiments: {
    outputModule: true,
  },
  plugins: [headerPlugin],
};

const babelLibraryConfig = {
  ...libraryConfig,
  output: {
    ...outputConfig,
    library: LIBRARY_NAME,
    filename: `${LIBRARY_NAME}.babel.umd.js`,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-runtime'],
            presets: ['@babel/preset-env'],
          }
        }
      }
    ]
  },
  plugins: [bannerPlugin],
};

const coverageLibraryConfig = {
  ...libraryConfig,
  output: {
    ...outputConfig,
    library: LIBRARY_NAME,
    filename: `${LIBRARY_NAME}.babel.umd.coverage.js`,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-runtime', 'babel-plugin-istanbul'],
            presets: ['@babel/preset-env'],
          }
        }
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [bannerPlugin],
};

const config = [
  firefoxMjsConfig,
  babelLibraryConfig,
  coverageLibraryConfig,
];

module.exports = config;
