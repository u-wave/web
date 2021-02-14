'use strict';

const { builtinModules } = require('module');
const { Compilation } = require('webpack');
const { RawSource } = require('webpack').sources;
const pkg = require('../../package.json');

/**
 * webpack plugin to generate a package.json for the üWave Web middleware.
 */
class MiddlewarePackageJsonPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('MiddlewarePackageJsonPlugin', this.applyCompilation.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  applyCompilation(compilation) {
    compilation.hooks.processAssets.tapPromise({
      name: 'middleware package.json',
      stage: Compilation.PROCESS_ASSETS_STAGE_DERIVED,
    }, async () => {
      const stats = compilation.getStats().toJson();

      // Add all external modules from the bundle as package.json dependencies.
      const externals = stats.modules
        .filter((module) => module.name.startsWith('external '))
        .map((module) => {
          const name = module.name.slice('external "'.length, module.name.length - 1);
          const parts = name.split('/');
          if (name.startsWith('@')) {
            return `${parts[0]}/${parts[1]}`;
          }
          return parts[0];
        })
        .filter((name) => !builtinModules.includes(name));

      const dependencies = {
        // Used by the bin file.
        'env-schema': pkg.dependencies['env-schema'],
        minimist: pkg.dependencies.minimist,
      };
      externals.forEach((external) => {
        dependencies[external] = pkg.dependencies[external];
      });

      const middlewarePkg = {
        name: 'u-wave-web',
        version: pkg.version,
        description: pkg.description,
        author: pkg.author,
        license: pkg.license,
        repository: {
          ...pkg.repository,
          directory: 'npm',
        },
        type: 'commonjs',
        main: './middleware/index.js',
        engines: pkg.engines,
        dependencies,
      };

      compilation.emitAsset('package.json', new RawSource(
        JSON.stringify(middlewarePkg, null, 2),
      ));
    });
  }
}

module.exports = {
  MiddlewarePackageJsonPlugin,
};
