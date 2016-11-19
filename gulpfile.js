const gulp = require('gulp');
const env = require('gulp-util').env;
const del = require('del');
const runSeq = require('run-sequence');

if (env.minify) {
  process.env.NODE_ENV = 'production';
}

require('./tasks/js');
require('./tasks/assets');
require('./tasks/serve');
require('./tasks/watch');

gulp.task('set-watching', () => {
  env.watch = true;
});

gulp.task('css:clean', () =>
  del([ 'public/app_*.css' ])
);

gulp.task('clean',
  [ 'js:clean', 'css:clean' ],
  () => del('public/', 'es/', 'lib/')
);

gulp.task('start', (cb) => {
  runSeq(
    'set-watching',
    [ 'assets', 'js:babel' ],
    [ 'watch', 'serve' ],
    cb
  );
});

gulp.task('js', [ 'js:babel', 'webpack' ]);

gulp.task('build', (cb) => {
  runSeq('assets', 'js', cb);
});

gulp.task('default', [ 'build' ]);
