/* global __dirname, require, module*/

const env = require('yargs').argv.env;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

require('webpack');

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
let min = '';

if (env === 'min') {
  PLUGINS.push(new UglifyJsPlugin({minimize: true}));
  min = 'min.';
}

const config = [
  {
    entry: {
      deriver: __dirname + '/src/tls.js',
    },
    output: {
      path: __dirname + '/dist/tls',
      filename: `tls.${min}js`,
      library: 'fxaTls',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: MODULE_CONFIG,
    plugins: PLUGINS
  },
];

module.exports = config;
