const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const { relative } = require('path');
const chalk = require('chalk');
const log = require('fancy-log');
const babel = require('gulp-babel');
const yaml = require('gulp-yaml');
const newer = require('gulp-newer');
const through = require('through2');

const src = 'src/**/*.js';
const destEs = 'es/';
const destCommonjs = 'lib/';

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
    },
  },
});

const rewriteMuiImports = (rx, replace) => () => ({
  visitor: {
    ImportDeclaration(path) {
      const source = path.get('source');
      source.node.value = source.node.value.replace(rx, replace);
    },
  },
});

function jsLocales() {
  return gulp.src('locale/*.yaml')
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
    .pipe(gulp.dest('lib/locale'));
}

function jsBabel() {
  // We'll always compile this in production mode so other people using the
  // client as a library get the optimised versions of components.
  // Save the environment value so we can restore it later.
  const oldEnv = process.env.BABEL_ENV;
  process.env.BABEL_ENV = 'production';

  return gulp.src([src, '!**/__tests__/**'])
    .pipe(newer(destCommonjs))
    .pipe(through.obj((file, enc, cb) => {
      const path = relative(`${__dirname}/../`, file.path);
      log(`Compiling '${chalk.cyan(path)}'...`);
      cb(null, file);
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      plugins: [
        rewriteLocaleImports,
        rewriteMuiImports(/^@material-ui\/core\//, '@material-ui/core/es/'),
        rewriteMuiImports(/^@material-ui\/icons\//, '@material-ui/icons/es/'),
      ],
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
        '@babel/plugin-syntax-object-rest-spread',
        '@babel/plugin-transform-modules-commonjs',
        'module:babel-plugin-dynamic-import-node',
        rewriteMuiImports(/^@material-ui\/core\/es\//, '@material-ui/core/'),
        rewriteMuiImports(/^@material-ui\/icons\/es\//, '@material-ui/icons/'),
      ],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destCommonjs))
    .on('end', () => {
      process.env.BABEL_ENV = oldEnv;
    });
}

module.exports = {
  locales: jsLocales,
  babel: jsBabel,
};
