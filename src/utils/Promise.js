// This file is used instead of Bluebird by dependencies.
// See /tasks/browserify.js for more.

// Expose Promise as a default export. This module works with dependencies that
// expect Bluebird: Bluebird exports a Promise object as "module.exports", but
// es6-promise exports a `.Promise` property instead.
export { Promise as default } from 'es6-promise';
