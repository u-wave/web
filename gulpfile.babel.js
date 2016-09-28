import gulp from 'gulp';
import { env } from 'gulp-util';
import runSeq from 'run-sequence';

function sequence(...tasks) {
  return cb => runSeq(...tasks, cb);
}

function exec(taskName) {
  return () => require(`./tasks/${taskName}`).default(env);
}

gulp.task('css:clean', exec('clean-css'));
gulp.task('css:compile', exec('compile-css'));
gulp.task('css', sequence('css:clean', 'css:compile'));

gulp.task('js:lint', exec('lint-js'));
gulp.task('js:clean', exec('clean-js'));
gulp.task('js:babel', exec('babel'));
gulp.task('js:rollup', exec('rollup'));
gulp.task('js:browserify', exec('browserify'));
gulp.task('js:bundle', sequence('js:rollup', 'js:browserify'));
gulp.task('js', sequence([ 'js:babel', 'js:bundle' ]));

gulp.task('html', exec('copy-html'));

gulp.task('clean', exec('clean-all'));

gulp.task('assets', exec('copy-assets'));

gulp.task('watch', exec('watch'));

gulp.task('middleware', exec('babel')); // compatibility
gulp.task('serve', exec('serve'));

gulp.task('start', [ 'watch' ], () => {
  gulp.start('serve');
});

gulp.task('build', sequence('assets', 'js', 'css', 'html'));

gulp.task('default', [ 'build' ]);
