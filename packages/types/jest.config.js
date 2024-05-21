const base = require('../../jest.config');

module.exports = {
  ...base,
  rootDir: './build',
  name: 'drivers',
  displayName: '@cdc3/drivers',
  collectCoverage: true,
  verbose: true,
  coverageThreshold: {
    global: {
      statements: 5,
      branches: 5,
      functions: 5,
      lines: 5,
    },
  },
};
