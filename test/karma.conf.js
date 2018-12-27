// karma.conf.js
module.exports = function (config) {
  config.set({
    browsers: ['Firefox'],
    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: 'html',

        // require specific files after Mocha is initialized
        require: [
          require.resolve('../node_modules/chai/chai.js'),
          require.resolve('../dist/tls.js'),
        ],
      }
    },
    files: [
      '**/*.js'
    ],
    frameworks: ['mocha', 'chai'],
    nocache: true,
  });
};
