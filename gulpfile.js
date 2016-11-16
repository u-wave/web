const gulp = require('gulp');
const env = require('gulp-util').env;
const del = require('del');
const runSeq = require('run-sequence');

if (env.minify) {
  process.env.NODE_ENV = 'production';
}

require('./tasks/css');
require('./tasks/js');
require('./tasks/assets');
require('./tasks/html');
require('./tasks/serve');
require('./tasks/watch');

gulp.task('set-watching', () => {
  env.watch = true;
});

gulp.task('clean',
  [ 'js:clean', 'css:clean' ],
  () => del('public/', 'es/', 'lib/')
);

gulp.task('start', (cb) => {
  runSeq(
    'set-watching',
    [ 'assets', 'js:babel', 'css' ],
    'html',
    [ 'watch', 'serve' ],
    cb
  );
});

gulp.task('js', [ 'js:babel', 'webpack' ]);

gulp.task('build', (cb) => {
  runSeq('assets', 'js', 'css', 'html', cb);
});

gulp.task('default', [ 'build' ]);
