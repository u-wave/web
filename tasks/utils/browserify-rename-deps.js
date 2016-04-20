import path from 'path';
import through from 'through2';
import bresolve from 'browser-resolve';

// Browserify plugin to point a package dependency to a different file.
// Pass an object like `{ bluebird: 'my-favourite-ponyfill' }`, and your
// generated bundle will contain your favourite ponyfill instead of Bluebird.

// Make sure paths `bresolve`d by renameDeps work the same as paths used
// elsewhere in our gulp tasks (relative to the project root).
const bresolveOpts = {
  filename: path.join(__dirname, '../../gulpfile.babel.js')
};

const rewireDependency = (row, oldDep, newDep) =>
  new Promise((resolve, reject) => {
    bresolve(newDep, bresolveOpts, (e, file) => {
      if (e) {
        reject(e);
      } else {
        row.deps[oldDep] = file; // eslint-disable-line no-param-reassign
        resolve();
      }
    });
  });

export default function renameDeps(b, map) {
  const depNames = Object.keys(map);

  b.pipeline.get('deps').push(through.obj(function processFile(row, enc, next) {
    depNames.reduce((p, dep) => (
      row.deps[dep] ? p.then(() => rewireDependency(row, dep, map[dep])) : p
    ), Promise.resolve())
      .then(() => {
        this.push(row);
        next();
      })
      .catch(e => next(e));
  }));

  // All require calls to the specified dependencies will be replaced, so we
  // can ignore them to also remove them from the bundle. Also ensure that the
  // replacements are included in the bundle.
  depNames.forEach(dep => {
    b.ignore(dep);
    b.require(map[dep]);
  });
}
