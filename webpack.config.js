/* global __dirname, require, module*/

const fs = require('fs');

const webpack = require('webpack');
const env = require('yargs').argv.env;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WrapperPlugin = require('wrapper-webpack-plugin');

const BANNER = `
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.

Bundle generated from https://github.com/mozilla/fxa-pairing-tls.git. Hash:[hash], Chunkhash:[chunkhash].
`;

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
PLUGINS.push(new webpack.BannerPlugin({
  banner: BANNER
}));

// .jsm export for Firefox
// strict mode for the whole bundle
const JSM_WRAPPER = new WrapperPlugin({
  test: /\.jsm$/, // only wrap output of bundle files with '.jsm' extension
  header: fs.readFileSync('./src/jsm/header.js', 'utf8'),
  footer: fs.readFileSync('./src/jsm/footer.js', 'utf8')
});
FIREFOX_PLUGINS.push(JSM_WRAPPER);
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
      filename: `FxAccountsTlsSubset.jsm`,
      library: 'fxaPairingTLS',
      libraryTarget: 'umd',
      path: __dirname + '/dist',
      umdNamedDefine: true
    },
    plugins: FIREFOX_PLUGINS,
  },
];

module.exports = config;
