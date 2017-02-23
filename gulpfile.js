const gulp = require('gulp');
const env = require('gulp-util').env;
const del = require('del');
const runSeq = require('run-sequence');

require('./tasks/js');
require('./tasks/serve');
require('./tasks/watch');

gulp.task('set-watching', () => {
  env.watch = true;
});

gulp.task('css:clean', () =>
  del([ 'public/app_*.css' ])
);

gulp.task('clean', () =>
  del([ 'public/', 'es/', 'lib/' ])
);

gulp.task('start', (cb) => {
  runSeq(
    'set-watching',
    [ 'watch', 'serve' ],
    cb
  );
});

gulp.task('build', [ 'js:babel' ]);

gulp.task('default', [ 'build' ]);
