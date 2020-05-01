/* eslint-disable global-require */
const gulp = require('gulp');
const path = require('path');
const { promisify } = require('util');
const webpack = require('webpack');
const rimraf = require('rimraf');
const writeFile = promisify(require('fs').writeFile);
const env = require('./tasks/env');
const js = require('./tasks/js');
const serve = require('./tasks/serve');

const middlewareDir = path.join(__dirname, 'packages/u-wave-web-middleware');

function setWatching(done) {
  env.watch = true;
  done();
}

function cleanDist(done) {
  rimraf(`${middlewareDir}/{public,middleware}`, done);
}
function cleanEs(done) {
  rimraf('es', done);
}
function cleanLib(done) {
  rimraf('lib', done);
}
const clean = gulp.parallel(cleanDist, cleanEs, cleanLib);

const start = gulp.series(setWatching, serve.serve);

const build = gulp.parallel(js.locales, js.babel);

async function prod() {
  // Load this later because it adds require compile hooks.
  // Those don't need to run on the above imports.
  const wpConfig = require('./webpack.config');
  const compiler = webpack(wpConfig);
  const run = promisify(compiler.run.bind(compiler));
  const close = promisify(compiler.close.bind(compiler));

  let stats;
  try {
    stats = await run();
  } catch (err) {
    compiler.purgeInputFileSystem();
    throw err;
  } finally {
    await close();
  }

  process.stdout.write(stats.toString({
    colors: true,
  }));

  if (stats.hasErrors()) {
    throw new Error('There were errors');
  }
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
      require('rollup-plugin-babel')({
        runtimeHelpers: true,
        caller: { target: 'node' },
      }),
      require('@rollup/plugin-node-resolve')({
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
  build,
  clean,
  default: build,
  middleware: gulp.series(build, middleware),
  prod: gulp.series(cleanDist, build, gulp.parallel(prod, middleware)),
};
