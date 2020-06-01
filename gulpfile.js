/* eslint-disable global-require */
const gulp = require('gulp');
const path = require('path');
const { promisify } = require('util');
const webpack = require('webpack');
const rimraf = require('rimraf');
const writeFile = promisify(require('fs').writeFile);
const env = require('./tasks/env');
const serve = require('./tasks/serve');

const middlewareDir = path.join(__dirname, 'packages/u-wave-web-middleware');

function setWatching(done) {
  env.watch = true;
  done();
}

function clean(done) {
  rimraf(`${middlewareDir}/{public,middleware}`, done);
}

const start = gulp.series(setWatching, serve.serve);

function prod(done) {
  // Load this later because it adds require compile hooks.
  // Those don't need to run on the above imports.
  const wpConfig = require('./webpack.config');
  const compiler = webpack(wpConfig);

  compiler.run((err, stats) => {
    if (err) {
      compiler.purgeInputFileSystem();
      done(err);
    } else {
      process.stdout.write(stats.toString({
        colors: true,
      }));
      if (stats.hasErrors()) {
        done(new Error('There were errors'));
      } else {
        done();
      }
    }
  });
}

async function buildMiddleware() {
  // eslint-disable-next-line import/no-dynamic-require
  const middlewarePkg = require(`${middlewareDir}/package.json`);

  const rollup = require('rollup');
  const bundle = await rollup.rollup({
    input: './src/middleware/index.js',
    external: [
      ...Object.keys(middlewarePkg.dependencies),
      ...require('module').builtinModules,
    ],
    plugins: [
      require('@rollup/plugin-babel').default(),
      require('@rollup/plugin-node-resolve').default({
        preferBuiltins: true,
      }),
    ],
  });

  await bundle.write({
    format: 'cjs',
    file: path.join(middlewareDir, 'middleware', 'index.js'),
    sourcemap: true,
  });

  await bundle.write({
    format: 'esm',
    file: path.join(middlewareDir, 'middleware', 'index.mjs'),
    sourcemap: true,
  });
}

function copyMiddlewareMeta() {
  return gulp.src('./LICENSE')
    .pipe(gulp.dest(middlewareDir));
}

async function updateMiddlewarePackageJson() {
  // eslint-disable-next-line import/no-dynamic-require
  const middlewarePkg = require(`${middlewareDir}/package.json`);
  const pkg = require('./package.json');

  // Sync versions.
  middlewarePkg.version = pkg.version;
  Object.keys(middlewarePkg.dependencies).forEach((name) => {
    middlewarePkg.dependencies[name] = pkg.dependencies[name];
  });

  await writeFile(`${middlewareDir}/package.json`, `${JSON.stringify(middlewarePkg, null, 2)}\n`);
}

const middleware = gulp.parallel(
  buildMiddleware,
  copyMiddlewareMeta,
  updateMiddlewarePackageJson,
);

module.exports = {
  setWatching,
  serve: serve.serve,
  start,
  clean,
  middleware,
  prod: gulp.series(clean, gulp.parallel(prod, middleware)),
};
