/* global __dirname, require, module*/

const env = require('yargs').argv.env;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
require('webpack');

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
let min = '';

if (env === 'min') {
  PLUGINS.push(new UglifyJsPlugin({minimize: true}));
  min = 'min.';
}

const config = [
  {
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
  },
];

module.exports = config;
