/* global __dirname, require, module*/

const fs = require('fs');

const webpack = require('webpack');
const env = require('yargs').argv.env;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const BANNER = `
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.

Bundle generated from https://github.com/mozilla/fxa-pairing-channel.git. Hash:[hash], Chunkhash:[chunkhash].
`;

const bannerPlugin = new webpack.BannerPlugin({
  banner: BANNER
});

const MODULE_CONFIG = {
  rules: [
    {
      exclude: /(node_modules|bower_components)/,
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
const FIREFOX_PLUGINS = [];

// Adds a banner to the generated source
PLUGINS.push(bannerPlugin);
FIREFOX_PLUGINS.push(bannerPlugin);

let min = '';

if (env === 'min') {
  PLUGINS.push(new UglifyJsPlugin({minimize: true}));
  min = 'min.';
}

const config = [
  {
    // Front-end module
    entry: __dirname + '/src/index.js',
    module: MODULE_CONFIG,
    output: {
      filename: `fxaPairingTLS.${min}js`,
      library: 'fxaPairingTLS',
      libraryTarget: 'umd',
      path: __dirname + '/dist',
      umdNamedDefine: true
    },
    plugins: PLUGINS,
    optimization: {
      minimize: false,
    },
  },
  {
    // Firefox module
    entry: __dirname + '/src/index.js',
    module: {},
    output: {
      filename: `FxAccountsTlsSubset.js`,
      library: 'fxaPairingTLS',
      libraryTarget: 'commonjs2',
      path: __dirname + '/dist',
      umdNamedDefine: true
    },
    optimization: {
      minimize: false,
    },
    plugins: FIREFOX_PLUGINS,
  },
];

module.exports = config;
