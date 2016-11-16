const gulp = require('gulp');
const exec = require('child_process').exec;
const relative = require('path').relative;
const colors = require('gulp-util').colors;
const log = require('gulp-util').log;
const babel = require('gulp-babel');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const through = require('through2');
const npmRunPath = require('npm-run-path');
const webpack = require('webpack');
const del = require('del');

const src = 'src/**/*.js';
const destEs = 'es/';
const destCommonjs = 'lib/';

gulp.task('js:clean', () => del([
  'public/app.js',
  'public/app.js.map',
  'lib/**/*.js',
  'es/**/*.js'
]));

gulp.task('js:babel', () => {
  // We'll always compile this in production mode so other people using the
  // client as a library get the optimised versions of components.
  // Save the environment value so we can restore it later.
  const oldEnv = process.env.BABEL_ENV;
  process.env.BABEL_ENV = 'production';

  return gulp.src(src)
    .pipe(plumber())
    .pipe(newer(destEs))
    .pipe(through.obj((file, enc, cb) => {
      const path = relative(`${__dirname}/../`, file.path);
      log(`Compiling '${colors.cyan(path)}'...`);
      cb(null, file);
    }))
    .pipe(babel())
    .pipe(gulp.dest(destEs))
    .pipe(babel({
      babelrc: false,
      plugins: [ 'transform-es2015-modules-commonjs' ]
    }))
    .pipe(gulp.dest(destCommonjs))
    .on('end', () => {
      process.env.BABEL_ENV = oldEnv;
    });
});

gulp.task('webpack', () => {
  const config = require('../webpack.config');

  return new Promise((resolve, reject) => {
    webpack(config, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
});

gulp.task('js:lint', () => (
  new Promise((resolve, reject) => {
    const env = npmRunPath.env();
    exec('eslint --cache --color .', { env }, (error, stdout) => {
      if (error) {
        console.error(stdout);
        reject(error);
        return;
      }
      resolve();
    });
  })
));
