import gulp from 'gulp';
import { env } from 'gulp-util';
import runSeq from 'run-sequence';

function sequence(...tasks) {
  return cb => runSeq(...tasks, cb);
}

function exec(taskName) {
  return () => require(`./tasks/${taskName}`)(env);
}

gulp.task('css:compile', exec('compile-css'));
gulp.task('css:concat', exec('concat-css'));
gulp.task('css', sequence('css:compile', 'css:concat'));

gulp.task('js:lint', exec('lint-js'));
gulp.task('js:browserify', exec('browserify'));
gulp.task('js', sequence('js:lint', 'js:browserify'));

gulp.task('assets', exec('copy-assets'));

// TODO fix this, it's terrible :P
gulp.task('dist:final', exec('make-dist'));
gulp.task('dist', () => {
  env.minify = true;
  runSeq(
    [ 'js:browserify', 'css' ],
    'dist:final'
  );
});

gulp.task('watch', exec('watch'));

gulp.task('default', [ 'assets', 'js', 'css' ]);
