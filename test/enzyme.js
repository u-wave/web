'use strict';

const enzyme = require('enzyme');
const Adapter = require('@eps1lon/enzyme-adapter-react-17');

enzyme.configure({
  adapter: new Adapter(),
});
