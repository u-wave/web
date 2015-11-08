import gulp, { dest } from 'gulp';
import { log } from 'gulp-util';
import babelify from 'babelify';
import browserify from 'browserify';
import hmr from 'browserify-hmr';
import watchify from 'watchify';
import source from 'vinyl-source-stream';

const JS_PATHS = [ 'src/**/*.js', 'gulpfile.babel.js', 'tasks/*.js' ];
const JS_TASKS = [ 'js:lint' ];
const CSS_PATHS = [ 'src/**/*.css' ];
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

  gulp.start('css');
  gulp.start('assets');

  return bundle();
}
