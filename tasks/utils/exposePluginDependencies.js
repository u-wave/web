import * as path from 'path';
import through from 'through2';

// Likely peerDependencies for plugins.
export const EXPORT_MAIN = 0;
export const EXPORT_SUBMODULES = 1;

function shouldIncludeMainModule(expose, name) {
  return expose[name] === EXPORT_MAIN;
}

function shouldIncludeSubModule(expose, name, subPath) {
  if (name in expose) {
    if (expose[name] === EXPORT_SUBMODULES) {
      return true;
    }
    if (expose[name] instanceof RegExp && expose[name].test(subPath)) {
      return true;
    }
  }
  return false;
}

/**
 * Browserify plugin that exposes specific modules under their "normal" name,
 * instead of their index.
 *
 * FIXME probably doesn't work so well with symlinked dependencies…
 */
export default function exposePluginDependencies(b, exposeModules) {
  const webBasePath = path.join(__dirname, '../../');
  const dependencyNames = Object.keys(exposeModules);
  const dependencyMains = {};
  for (const name of dependencyNames) {
    try {
      dependencyMains[name] = require(`${name}/package.json`).main
        .replace(/^[./]+/, ''); // Strip preceding "./"
    } catch (e) {
      // Ignore
    }
  }

  function expose(id, name) {
    return {
      id: name,
      source: `module.exports=require(${JSON.stringify(id)})`,
      deps: {},
      file: `/expose/${id}/${name}`
    };
  }

  b.pipeline.get('label').push(through.obj(function ondata(row, enc, next) {
    this.push(row);

    const modulePath = path.relative(webBasePath, row.file);

    // Expose (local) web client modules.
    // FIXME Should add an option to exposePluginDependencies to do this in a less
    // hacky manner.
    const uwMatch = modulePath.match(/^src\/(.*?)$/);
    if (uwMatch) {
      if (shouldIncludeSubModule(exposeModules, 'u-wave-web', `lib/${uwMatch[1]}`)) {
        this.push(expose(row.id, `u-wave-web/lib/${uwMatch[1].replace(/(\/index)?\.js$/, '')}`));
      }
      next();
      return;
    }

    // Direct dependencies of u-wave-web, and potential peerDependencies for
    // plugins.
    const externalMatch = modulePath.match(/^node_modules\/([^/]*?)\/(.*?)$/);
    if (!externalMatch) {
      next();
      return;
    }
    const name = externalMatch[1];
    const internalPath = externalMatch[2];
    const isTransitive = internalPath.indexOf('node_modules') !== -1;
    if (!isTransitive) {
      const main = dependencyMains[name];
      // Expose "main" files under the module name.
      if (internalPath === main && shouldIncludeMainModule(exposeModules, name)) {
        this.push(expose(row.id, name));
      // Expose submodules under their path, without `.js`.
      } else if (shouldIncludeSubModule(exposeModules, name, internalPath)) {
        this.push(expose(row.id, `${name}/${internalPath.replace(/(\/index)?\.js$/, '')}`));
      }
    }
    next();
  }));
}
