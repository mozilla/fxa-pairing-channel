/* global __dirname, require, module*/

const webpack = require('webpack');
const fs = require('fs');

const BANNER = `
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.

Bundle generated from https://github.com/mozilla/fxa-pairing-channel.git. Hash:[hash], Chunkhash:[chunkhash].
`;
const LIBRARY_NAME = 'FxAccountsPairingChannel';
const ENTRYPOINT = __dirname + '/src/index.js';
const EXPORT_PATH = __dirname + '/dist';

const MODULE_CONFIG = {
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
};

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
    libraryExport: 'InsecurePairingChannel',
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
  module: MODULE_CONFIG,
  plugins: plugins(false),
};

const config = [
  firefoxJsmConfig,
  babelLibraryConfig,
];

module.exports = config;
