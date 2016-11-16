const gulp = require('gulp');
const env = require('gulp-util').env;
const runSeq = require('run-sequence');

function sequence(...tasks) {
  return cb => runSeq(...tasks, cb);
}

function exec(taskName) {
  // eslint-disable-next-line import/no-dynamic-require
  return () => require(`./tasks/${taskName}`)(env);
}

// TODO move CSS into webpack.
gulp.task('css:clean', exec('clean-css'));
gulp.task('css:compile', exec('compile-css'));
gulp.task('css:watch', exec('watch-css'));
gulp.task('css', sequence('css:clean', 'css:compile'));

gulp.task('js:lint', exec('lint-js'));
gulp.task('js:clean', exec('clean-js'));
gulp.task('js:babel', exec('babel'));
gulp.task('js', [ 'js:babel', 'webpack' ]);

// TODO move html into webpack?
gulp.task('html', exec('copy-html'));

gulp.task('clean', exec('clean-all'));

gulp.task('assets', exec('copy-assets'));

gulp.task('webpack', [ 'assets' ], exec('webpack'));
gulp.task('watch', [ 'assets', 'css', 'html' ], exec('watch'));

gulp.task('middleware', [ 'js:babel' ]); // compatibility
gulp.task('serve', exec('serve'));

gulp.task('set-watching', () => {
  env.watch = true;
});

gulp.task('start', sequence('set-watching', 'js:babel', [ 'watch', 'serve' ]));

gulp.task('build', sequence('assets', 'js', 'css', 'html'));

gulp.task('default', [ 'build' ]);
