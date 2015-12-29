import gulp, { dest } from 'gulp';
import { log } from 'gulp-util';
import babelify from 'babelify';
import browserify from 'browserify';
import hmr from 'browserify-hmr';
import watchify from 'watchify';
import seq from 'run-sequence';
import source from 'vinyl-source-stream';

// The watch task is a bit like a "live" version of the JS and CSS tasks.
// It recompiles both CSS and JS on change. If you combine this task with the
// Serve task, you'll also get real live updates in the browser, as well, which
// is really nice for developing!

// TODO add moar comments below ☟

const JS_PATHS = [ 'src/**/*.js', 'gulpfile.babel.js', 'tasks/*.js' ];
const JS_TASKS = [ 'js:lint' ];
const CSS_PATHS = [ 'src/**/*.css' ];
const CSS_TASKS = [ 'css' ];
const HTML_PATHS = [ 'src/index.html' ];
const HTML_TASKS = [ 'html' ];
const MIDDLEWARE_PATHS = [ 'src/middleware.js' ];
const MIDDLEWARE_TASKS = [ 'middleware' ];

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

// Define a separate Gulp task for the Browserify bundling. This will be run
// on update instead of immediately calling bundle(), mostly because this will
// log a few lines so you can see that it's recompiling.
gulp.task('watch:bundle', bundle);

export default function watchTask() {
  const babelOptions = {
    stage: 0,
    plugins: [ 'react-transform' ],
    extra: {
      'react-transform': {
        transforms: [
          { transform: 'react-transform-hmr', imports: [ 'react' ], locals: [ 'module' ] },
          { transform: 'react-transform-catch-errors', imports: [ 'react', 'redbox-react' ] }
        ]
      }
    }
  };

  watcher = browserify({
    debug: true,
    entries: './src/app.js',
    cache: {},
    packageCache: {}
  });
  watcher.transform(babelify, babelOptions);
  watcher.plugin(watchify);
  watcher.plugin(hmr, { mode: 'websocket' });
  watcher.on('log', log.bind(null, 'watchify:'));
  watcher.on('update', () => {
    gulp.start('watch:bundle');
  });

  gulp.watch(JS_PATHS, JS_TASKS);
  gulp.watch(CSS_PATHS, CSS_TASKS);
  gulp.watch(HTML_PATHS, HTML_TASKS);
  // the server does have to be restarted for this to apply, so it's not super
  // useful to watch. you won't have to rerun the middleware task manually
  // though, so that's a small plus…
  gulp.watch(MIDDLEWARE_PATHS, MIDDLEWARE_TASKS);

  seq('assets', 'css', 'html', 'middleware');

  return bundle();
}
