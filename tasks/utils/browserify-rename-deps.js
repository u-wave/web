import through from 'through2';
import bresolve from 'browser-resolve';

// Browserify plugin to point a package dependency to a different file.
// Pass an object like `{ bluebird: 'my-favourite-ponyfill' }`, and your
// generated bundle will contain your favourite ponyfill instead of Bluebird.

const rewireDependency = (row, oldDep, newDep) => {
  return new Promise((resolve, reject) => {
    bresolve(newDep, (e, file) => {
      if (e) return reject(e);
      row.deps[oldDep] = file;
      resolve();
    });
  });
};

export default function renameDeps(b, map) {
  const depNames = Object.keys(map);

  b.pipeline.get('deps').push(through.obj(function processFile(row, enc, next) {
    depNames.reduce((p, dep) => {
      return row.deps[dep]
        ? p.then(() => rewireDependency(row, dep, map[dep]))
        : p;
    }, Promise.resolve())
      .then(() => {
        this.push(row);
        next();
      })
      .catch(e => next(e));
  }));

  // All require calls to the specified dependencies will be replaced, so we
  // can ignore them to also remove them from the bundle.
  depNames.forEach(dep => b.ignore(dep));
}
