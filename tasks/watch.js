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

// These constants are used to figure out which tasks to run when a file
// changes.
const JS_PATHS = [ 'src/**/*.js', 'gulpfile.babel.js', 'tasks/*.js' ];
// Note that we're only _linting_ our JavaScript here! The re-bundling is done
// separately below.
const JS_TASKS = [ 'js:lint' ];

const CSS_PATHS = [ 'src/**/*.css' ];
const CSS_TASKS = [ 'css' ];

const HTML_PATHS = [ 'src/index.html' ];
const HTML_TASKS = [ 'html' ];
const MIDDLEWARE_PATHS = [ 'src/middleware.js' ];
const MIDDLEWARE_TASKS = [ 'middleware' ];

// This will hold our file watcher object that'll recompile our JavaScript on
// change. Yes, this is global! Luckily we can be fairly certain that only one
// "watch" task runs at a time :)
let watcher;

// Compiles/bundles our JavaScript. More details below, when we initialise the
// `watcher` object!
function bundle() {
  const stream = watcher.bundle();
  // TODO recover from errors… particularly parse errors are nasty because they
  // are quite common when saving files regularly while you're editing them.
  stream.on('error', e => {
    log('watchify error:', e.stack || e.message);
  });
  return stream
    // Assign a name and save in lib/out.js.
    .pipe(source('out.js'))
    .pipe(dest('lib/'));
}

// Define a separate Gulp task for the Browserify bundling. This will be run
// on update instead of immediately calling bundle(), mostly because this will
// tell Gulp to log a few lines so you can see that it's recompiling.
gulp.task('watch:bundle', bundle);

export default function watchTask() {
  // We have a lot more options to hand to Babel now, because we want our React
  // components to rerender when the files are updated.
  const babelOptions = {
    // The react-transform plugin for Babel allows us to apply transforms to
    // React Components only.
    plugins: [
      [ 'react-transform', {
        transforms: [
          // The HMR React transform is the thing that rerenders React
          // components when their source code change. HMR is short for Hot
          // Module Reloading.
          { transform: 'react-transform-hmr', imports: [ 'react' ], locals: [ 'module' ] },
          // The catch-errors transform keeps our application from blowing up
          // when an error occurs in the render() method of a component. This
          // means that you can make mistakes freely while developing and still
          // get the live updates as you fix them.
          // The redbox-react import here shows a big red box on the screen if
          // an error occured, with stack trace and all.
          { transform: 'react-transform-catch-errors', imports: [ 'react', 'redbox-react' ] }
        ]
      } ]
    ]
  };

  // Browserify again! For more on Browserify, see the /tasks/browserify.js
  // file.
  watcher = browserify({
    debug: true,
    entries: './src/app.js',
    // These options are for the Watchify plugin (see below). I'm not sure what
    // exactly they do and I don't really care either. So long as it works! \m/
    cache: {},
    packageCache: {}
  });
  watcher.transform(babelify, babelOptions);
  // So this is where Part 1 of the magic happens. Watchify watches our
  // JavaScript files for changes, and if the files change, it emits an "update"
  // event. We can then re-run the browserify.bundle() call to get a new
  // compiled JavaScript bundle. Also, Watchify makes sure that only files that
  // changed are passed through Babel again, so we save a lot of recompilation
  // time here.
  watcher.plugin(watchify);
  // And this is Part 2 of the magic. Once again, HMR is short for Hot Module
  // Reloading. When Watchify detects an update, the HMR plugin sends the new
  // files to connected browsers, and replaces the modules right there without
  // refreshing the page.
  watcher.plugin(hmr, { mode: 'websocket' });
  // We'll show something on the command line when Watchify is done creating a
  // new bundle, too.
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

  // Run a bunch of other tasks to make sure we have everything to run the üWave
  // application, ready to go. This isn't strictly necessary, but you don't have
  // to remember to run plain `gulp` before `gulp watch` now, so that's nice.
  seq('assets', 'css', 'html', 'middleware');

  // Create an initial bundle.
  // The "watch" task will finish once the initial bundle is created, but
  // Watchify will keep running, so no need to worry :)
  return bundle();
}
