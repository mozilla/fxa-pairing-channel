/* global __dirname, require, module*/

const webpack = require('webpack');

const BANNER = `
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.

Bundle generated from https://github.com/mozilla/fxa-pairing-channel.git. Hash:[hash], Chunkhash:[chunkhash].
`;
const LIBRARY_NAME = 'FxAccountsPairingChannel';
const ENTRYPOINT = __dirname + '/src/index.js';
const EXPORT_PATH = __dirname + '/dist';

const bannerPlugin = new webpack.BannerPlugin({
  banner: BANNER
});

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

const PLUGINS = [];

// Adds a banner to the generated source
PLUGINS.push(bannerPlugin);

const outputConfig = {
  library: LIBRARY_NAME,
  libraryTarget: 'commonjs2',
  path: EXPORT_PATH,
  umdNamedDefine: true,
};

const libraryConfig = {
  entry: ENTRYPOINT,
  mode: 'production',
  output: {},
  optimization: {
    minimize: false,
  },
  plugins: PLUGINS,
};

const commonJsConfig = {
  ...libraryConfig,
  output: {
    ...outputConfig,
    filename: `${LIBRARY_NAME}.js`
  }
};

const babelLibraryConfig = {
  ...libraryConfig,
  output: {
    ...outputConfig,
    filename: `${LIBRARY_NAME}.babel.umd.js`,
    libraryTarget: 'umd'
  },
  module: MODULE_CONFIG,
};

const config = [
  commonJsConfig,
  babelLibraryConfig,
];

module.exports = config;
