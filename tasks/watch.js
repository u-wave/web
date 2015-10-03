import { dest, watch } from 'gulp';
import { log } from 'gulp-util';
import { configure as babelify } from 'babelify';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';

const JS_PATHS = [ 'src/js/**/*.js', 'gulpfile.babel.js', 'tasks/*.js' ];
const JS_TASKS = [ 'eslint' ];
const CSS_PATHS = [ 'src/css/**/*.css' ];
const CSS_TASKS = [ 'css' ];

export default function watchTask() {
  const bundler = browserify({
    debug: true,
    entries: './src/js/app.js',
    cache: {},
    packageCache: {}
  }).transform(babelify({ stage: 0 }));

  const watcher = watchify(bundler);
  watcher.on('log', log.bind(null, 'watchify:'));

  function bundle() {
    return watcher
      .bundle()
      .pipe(source('out.js'))
      .pipe(dest('lib/'));
  }
  watcher.on('update', bundle);

  watch(JS_PATHS, JS_TASKS);
  watch(CSS_PATHS, CSS_TASKS);

  return bundle();
}
