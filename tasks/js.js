const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const { relative } = require('path');
const { colors, log } = require('gulp-util');
const babel = require('gulp-babel');
const yaml = require('gulp-yaml');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const through = require('through2');
const webpack = require('webpack');
const del = require('del');

const src = 'src/**/*.js';
const destEs = 'es/';
const destCommonjs = 'lib/';

gulp.task('js:clean', () => del([
  'public/app_*.js',
  'public/app_*.js.map',
  'lib/**/*.js',
  'es/**/*.js'
]));

// Very naive Babel plugin to rewrite imports of locale YAML files to their
// javascript versions.
const rewriteLocaleImports = () => ({
  visitor: {
    ImportDeclaration(path) {
      const source = path.get('source');
      source.node.value = source.node.value.replace(/^\.\.\/locale\/(.*?)\.yaml/, './locale/$1.js');
    },
    CallExpression(path) {
      if (path.get('callee').isImport()) {
        const source = path.get('arguments.0');
        source.node.value = source.node.value.replace(/^\.\.\/locale\/(.*?)\.yaml/, './locale/$1.js');
      }
    }
  }
});

gulp.task('js:locales', () =>
  gulp.src('locale/*.yaml')
    .pipe(yaml({ space: 2 }))
    .pipe(through.obj((file, enc, cb) => {
      /* eslint-disable no-param-reassign */
      file.jsonText = file.contents.toString('utf-8');
      file.path = file.path.replace(/\.json$/, '.js');
      file.contents = Buffer.from(`export default ${file.jsonText};`);
      /* eslint-enable no-param-reassign */
      cb(null, file);
    }))
    .pipe(gulp.dest('es/locale'))
    .pipe(through.obj((file, enc, cb) => {
      // eslint-disable-next-line no-param-reassign
      file.contents = Buffer.from(`module.exports = ${file.jsonText};`);
      cb(null, file);
    }))
    .pipe(gulp.dest('lib/locale')));

gulp.task('js:babel', [ 'js:locales' ], () => {
  // We'll always compile this in production mode so other people using the
  // client as a library get the optimised versions of components.
  // Save the environment value so we can restore it later.
  const oldEnv = process.env.BABEL_ENV;
  process.env.BABEL_ENV = 'production';

  return gulp.src(src)
    .pipe(plumber())
    .pipe(newer(destCommonjs))
    .pipe(through.obj((file, enc, cb) => {
      const path = relative(`${__dirname}/../`, file.path);
      log(`Compiling '${colors.cyan(path)}'...`);
      cb(null, file);
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      plugins: [ rewriteLocaleImports ]
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destEs))
    .pipe(through.obj((file, enc, cb) => {
      if (/\.js$/.test(file.path)) {
        cb(null, file);
      } else {
        cb();
      }
    }))
    .pipe(babel({
      babelrc: false,
      plugins: [
        'transform-es2015-modules-commonjs',
        'dynamic-import-node'
      ]
    }))
    .pipe(sourcemaps.write('.'))
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
