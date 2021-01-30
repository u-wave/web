const { JSDOM } = require('jsdom');
const log = require('why-is-node-running');

const dom = new JSDOM();

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

require('@babel/register');
require('yaml-hook/register');

enzyme.configure({
  adapter: new Adapter(),
});

// React's internal `scheduler` package has unclosed handles
// so we have to force-exit the tests or Node.js keeps running
exports.mochaHooks = {
  afterAll() {
    setTimeout(() => {
      log();
      process.exit();
    }, 500);
  },
};
