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

function plugins(isJsm) {
  // Adds a banner to the generated source
  const PLUGINS = [];
  if (isJsm) {
    const headerDoc = fs.readFileSync('./src/jsm_header.js.inc', 'utf8');
    PLUGINS.push(new WrapperPlugin({
      header: headerDoc,
    }));
  }
  PLUGINS.push(bannerPlugin);
  return PLUGINS;
}

const outputConfig = {
  library: LIBRARY_NAME,
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

const firefoxJsmConfig = {
  ...libraryConfig,
  output: {
    ...outputConfig,
    filename: `${LIBRARY_NAME}.js`,
    libraryTarget: 'var',
    libraryExport: 'PairingChannel',
  },
  plugins: plugins(true),
};

const babelLibraryConfig = {
  ...libraryConfig,
  output: {
    ...outputConfig,
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
  plugins: plugins(false),
};

const coverageLibraryConfig = {
  ...libraryConfig,
  output: {
    ...outputConfig,
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
  plugins: plugins(false),
};

const config = [
  firefoxJsmConfig,
  babelLibraryConfig,
  coverageLibraryConfig,
];

module.exports = config;
