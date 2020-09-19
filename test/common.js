const { JSDOM } = require('jsdom');

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
