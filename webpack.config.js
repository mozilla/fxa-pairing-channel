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
      test: /(\.jsx|\.js)$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/
    }
  ]
};

let PLUGINS = [];
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
    entry: {
      deriver: __dirname + '/src/index.js',
    },
    output: {
      path: __dirname + '/dist',
      filename: `tls.${min}js`,
      library: 'fxaTls',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: MODULE_CONFIG,
    plugins: PLUGINS
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
