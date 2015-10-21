import gulp from 'gulp';
import { log } from 'gulp-util';
import { configure as babelify } from 'babelify';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';

const dest = ::gulp.dest;

const JS_PATHS = [ 'src/js/**/*.js', 'gulpfile.babel.js', 'tasks/*.js' ];
const JS_TASKS = [ 'js:lint' ];
const CSS_PATHS = [ 'src/css/**/*.css' ];
const CSS_TASKS = [ 'css' ];

let watcher;

function bundle() {
  const stream = watcher.bundle();
  stream.on('error', e => {
    log('watchify error:', e.stack || e.message);
  });
  return stream
    .pipe(source('out.js'))
    .pipe(dest('lib/'));
}

gulp.task('watch:bundle', bundle);

export default function watchTask() {
  const bundler = browserify({
    debug: true,
    entries: './src/js/app.js',
    cache: {},
    packageCache: {}
  }).transform(babelify({ stage: 0 }));

  watcher = watchify(bundler);
  watcher.on('log', log.bind(null, 'watchify:'));
  watcher.on('update', () => {
    gulp.start('watch:bundle');
  });

  gulp.watch(JS_PATHS, JS_TASKS);
  gulp.watch(CSS_PATHS, CSS_TASKS);

  gulp.start('css');
  gulp.start('assets');

  return bundle();
}
