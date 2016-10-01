import gulp from 'gulp';
import { buildExternalHelpers } from 'babel-core';
import babelify from 'babelify';
import browserify from 'browserify';
import uglifyify from 'uglifyify';
import yamlify from 'yamlify';
import buffer from 'gulp-buffer';
import collapse from 'bundle-collapser/plugin';
import envify from 'loose-envify/custom';
import { transform as insert } from 'gulp-insert';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import when from 'gulp-if';

import exposePluginDependencies, { EXPORT_MAIN } from './utils/exposePluginDependencies';

export const exposeModules = {
  react: EXPORT_MAIN,
  'react-dom': EXPORT_MAIN,
  'react-redux': EXPORT_MAIN,
  'react-dnd': EXPORT_MAIN,
  // Not exposing SVG icons because their use is a bit all over the place.
  // Really we should pick a few components to expose here and leave plugins
  // to include the rest.
  'material-ui': /^(styles\/)?([^\/]+)(\/index)?\.js$/,
  'u-wave-web': /^lib\/constants(\/([^\/]+)\.js)?$/
};

// The browserify task compiles all the necessary modules into a single file,
// called a "bundle". It includes both üWave's own modules, like the React
// components and Redux reducers, and dependency files like React itself.

export default function browserifyTask({ minify = false }) {
  process.env.NODE_ENV = minify ? 'production' : 'development';

  // Browserify works by passing a single entry point file, which contains the
  // code that starts the application. It'll combine all of them into a single
  // file that can be included simply by using a <script> tag.
  const b = browserify({
    debug: true,
    // The main üWave application file.
    entries: './src/app.js'
  });

  // Replace Bluebird with es6-promise.
  // Bluebird is only used by dependencies for its most basic Promises
  // functionality, so we can just use the es6-promise olyfill module that we
  // already use elsewhere. This shaves some 20kb off the final minified+gzipped
  // bundle (that's > 15%).
  b.require('./src/utils/Promise', { expose: 'bluebird' });

  b.transform(yamlify);

  // Babelify transforms the üWave source code, which is written in JavaScript
  // of the future and JSX, to JavaScript of today.
  b.transform(babelify, {
    plugins: [
      // Babel uses helpers for some common tasks like merging objects or creating
      // classes. Normally it'd add them right at the top of every file, but we'll
      // generate our own helper file later, so we can use its External Helpers
      // feature.
      // https://developit.github.io/babel-legacy-docs/docs/advanced/external-helpers/
      'external-helpers'
    ]
  });

  // Envify replaces `process.env.*` occurrences with constant values. This is
  // mostly used to disable development tools for deployed code, because those
  // tools can take up a lot of space otherwise.
  // This doesn't actually _remove_ the unnecessary code yet, it just turns it
  // into code like:
  //     if ("production" === "development") { logDeveloperInfo(); }
  // …which will be removed by uglify.js later down the line.
  b.transform(envify({
    _: 'purge',
    NODE_ENV: process.env.NODE_ENV
  }), { global: true });

  if (minify) {
    b.transform(uglifyify, {
      global: true,
      mangle: false
    });
    // Browserify assigns numbers to all modules, but normally uses the full
    // module names in the compiled source. That's perfectly fine, but we can
    // shave off a bunch of bytes if it'd just use the assigned numbers instead,
    // because they are much shorter :)
    // The bundle-collapser plugin replaces the full module names with their
    // assigned numbers!
    b.plugin(collapse);
  }

  b.plugin(exposePluginDependencies, exposeModules);

  // This will store the Babel helpers that were used by the üWave code.
  const helpers = {};
  function maybeAddExternalHelpersHandler(tr) {
    if (tr instanceof babelify) {
      // Attaches an event listener to the Babelify transform only.
      // Babelify emits a "babelify" event when it's done transforming a single
      // module. The event data includes an array of the helpers that were used
      // by the module.
      tr.once('babelify', ({ metadata }) => {
        metadata.usedHelpers.forEach((helper) => {
          helpers[helper] = true;
        });
      });
    }
  }

  function getHelpers() {
    return `${buildExternalHelpers(Object.keys(helpers), 'var')}`;
  }

  return b
    .on('transform', maybeAddExternalHelpersHandler)
    .bundle()
    // Assign a file name to the generated bundle.
    .pipe(source('app.js'))
    // The generated bundle is a stream, but Uglify.js doesn't work on streams,
    // so we convert it to a Buffer instead.
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(insert(contents => `${getHelpers()}; \n ${contents}`))
      .pipe(when(minify, uglify({
        // Yeah… Enables some riskier minification that doesn't work in IE8.
        // But üWave doesn't work in IE8 _anyway_, so we don't care.
        compress: {
          screw_ie8: true,
          pure_getters: true,
          unsafe: true
        },
        output: { screw_ie8: true },
        // Rename top-level (global scope) variables to shorter names too.
        // There's no other code that depends on those variables to be
        // available, so it doesn't really matter what they're called!
        mangle: { toplevel: true }
      })))
    .pipe(sourcemaps.write('./'))
    // Output to public/app.js!
    .pipe(gulp.dest('public/'));
}
