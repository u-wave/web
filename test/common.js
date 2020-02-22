const { JSDOM } = require('jsdom');
const chai = require('chai');

const dom = new JSDOM();

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

require('@babel/register').default({
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    'module:babel-plugin-dynamic-import-node',
  ],
});
require('yaml-hook/register');

enzyme.configure({
  adapter: new Adapter(),
});

chai.use(require('chai-enzyme')());

// Mock an asset like Webpack's file-loader.
function mockAsset(modulePath) {
  const path = require.resolve(modulePath);
  require.cache[path] = {
    exports: path,
  };
}

mockAsset('../assets/audio/mention.mp3');
