import gulp from 'gulp';
import { env } from 'gulp-util';
import runSeq from 'run-sequence';

import * as uw from './tasks/utils/extension';

function readBuildConfig(path) {
  const lib = require(path);
  const makeConfig = typeof lib === 'function' ? lib : lib.default;
  return makeConfig(uw);
}

env.config = env.config || env.c || './tasks/default-config';

const config = readBuildConfig(env.config);

function sequence(...tasks) {
  return cb => runSeq(...tasks, cb);
}

function exec(taskName) {
  return () => require(`./tasks/${taskName}`).default(env, config);
}

gulp.task('css:clean', exec('clean-css'));
gulp.task('css:compile', exec('compile-css'));
gulp.task('css', sequence('css:clean', 'css:compile'));

gulp.task('js:lint', exec('lint-js'));
gulp.task('js:clean', exec('clean-js'));
gulp.task('js:browserify', exec('browserify'));
gulp.task('js', sequence('js:clean', 'js:browserify'));

gulp.task('html', exec('copy-html'));

gulp.task('clean', exec('clean-all'));

gulp.task('assets', exec('copy-assets'));

gulp.task('watch', exec('watch'));

gulp.task('middleware', exec('middleware'));
gulp.task('serve', exec('serve'));

gulp.task('default', sequence('clean', [ 'assets', 'js', 'css', 'middleware' ], 'html'));
