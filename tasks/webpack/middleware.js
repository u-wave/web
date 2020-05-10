const { builtinModules } = require('module');
const { RawSource } = require('webpack-sources');
const pkg = require('../../package.json');

/**
 * webpack plugin to generate a package.json for the üWave Web middleware.
 */
class MiddlewarePackageJsonPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapPromise('middleware package.json', async (currentCompiler, callback) => {
      const stats = currentCompiler.getStats().toJson();

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

      const dependencies = {};
      externals.forEach((external) => {
        dependencies[external] = pkg.dependencies[external];
      });

      const middlewarePkg = {
        name: 'u-wave-web-middleware',
        version: pkg.version,
        description: pkg.description,
        author: pkg.author,
        license: pkg.license,
        repository: pkg.repository,
        type: 'commonjs',
        main: './middleware/index.js',
        engines: pkg.engines,
        dependencies,
      };

      currentCompiler.assets['package.json'] = new RawSource(
        JSON.stringify(middlewarePkg, null, 2),
      );

      if (callback) {
        callback();
      }
    });
  }
}

module.exports = {
  MiddlewarePackageJsonPlugin,
};
