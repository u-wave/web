/* eslint-disable global-require */
const h = require('react').createElement;
const prerender = require('./prerender');

module.exports = function renderLoadingScreen() {
  const LoadingScreen = require('../../src/components/LoadingScreen').default;

  return prerender(h(LoadingScreen));
};
