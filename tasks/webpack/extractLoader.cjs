'use strict';

const vm = require('vm');
const assert = require('assert');
const NodeTemplatePlugin = require('webpack/lib/node/NodeTemplatePlugin');
const NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');
const LoaderTargetPlugin = require('webpack/lib/LoaderTargetPlugin');
const LibraryTemplatePlugin = require('webpack/lib/LibraryTemplatePlugin');
const ExternalsPlugin = require('webpack/lib/ExternalsPlugin');
const EntryPlugin = require('webpack/lib/EntryPlugin');
const deepmerge = require('deepmerge');
const pkg = require('../../package.json');

function evalModule(code, { filename }) {
  const target = { exports: {} };
  vm.runInNewContext(code, {
    require,
    module: target,
    exports: target.exports,
    __filename: filename,
    URL,
  });
  return target.exports;
}

module.exports = function extractLoader() {};
module.exports.pitch = function extractLoaderPitch(entrypoint) {
  const callback = this.async();

  const rnd = Math.random().toString(36).slice(2);
  // eslint-disable-next-line no-underscore-dangle
  const compiler = this._compilation.createChildCompiler(`extract-loader ${entrypoint}`, {
    filename: `__tmp_for_extract-loader${rnd}_[name].js`,
  });

  compiler.options.module = deepmerge(compiler.options.module, {
    parser: {
      javascript: {
        url: 'relative',
      },
    },
  });

  // Target Node.js
  new NodeTemplatePlugin().apply(compiler);
  new NodeTargetPlugin().apply(compiler);
  new LibraryTemplatePlugin(null, 'commonjs').apply(compiler);
  new LoaderTargetPlugin('node').apply(compiler);
  new EntryPlugin(compiler.context, `!!${entrypoint}`, { name: 'main' }).apply(compiler);

  // node_modules dependencies should be require()-able, probably
  const dependencies = Object.keys(pkg.dependencies);
  // eslint-disable-next-line no-shadow
  new ExternalsPlugin('commonjs', ({ request }, callback) => {
    if (dependencies.some((dep) => request === dep || request.startsWith(`${dep}/`))) {
      callback(null, `commonjs ${request}`);
    } else {
      callback();
    }
  }).apply(compiler);

  compiler.runAsChild((err, entries, compilation) => {
    if (err) {
      callback(err);
    } else {
      const mainChunk = entries[0];
      const mainJsFiles = Array.from(mainChunk.files).filter((f) => f.endsWith('.js'));
      assert.strictEqual(mainJsFiles.length, 1, 'extract-loader build must output a single file.');
      const mainAsset = compilation.assets[mainJsFiles[0]];

      const code = mainAsset.source();
      const result = evalModule(code, {
        filename: entrypoint,
      }).default;

      mainChunk.files.forEach((file) => {
        // eslint-disable-next-line no-underscore-dangle
        this._compilation.deleteAsset(file);
      });

      callback(null, result);
    }
  });
};
