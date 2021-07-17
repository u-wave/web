'use strict';

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.ya?ml$': '<rootDir>/test/yaml-transform.js',
    '\\.js$': 'babel-jest',
  },
};
