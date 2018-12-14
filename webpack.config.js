/* global __dirname, require, module*/

const env = require('yargs').argv.env;
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MODULE_CONFIG = {
  rules: [
    {
      test: /(\.jsx|\.js)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
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
    entry: __dirname + '/src/index.js',
    output: {
      path: __dirname + '/dist',
      filename: `tls.${min}js`,
      library: 'tls',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: MODULE_CONFIG,
    plugins: PLUGINS
  },
];

module.exports = config;
