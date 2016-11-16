const gulp = require('gulp');
const env = require('gulp-util').env;
const transform = require('gulp-insert').transform;
const readFileSync = require('fs').readFileSync;
const path = require('path');
const cheerio = require('cheerio');
const minifyHtml = require('gulp-htmlmin');
const when = require('gulp-if');

const renderLoadingScreen = require('./utils/renderLoadingScreen');

// The core function of the HTML task is to copy the index.html file from the
// source directory to the compiled directory. It also adds a loading screen to
// the page, and inlines the CSS stylesheet if minification is enabled.

const COMPILED_CSS_PATH = path.join(__dirname, '../public/app.css');

// Used to apply a function to a DOM element identified by `selector`.
const apply = (selector, fn) =>
  (contents) => {
    // cheerio is like a lightweight jQuery on the server. It parses HTML into
    // cheerio objects (and not a full DOM tree!) so we can change it easily.
    const $ = cheerio.load(contents);
    fn($(selector));
    // Return the full changed HTML source code.
    return $.html();
  };

// Used to insert HTML into a DOM element identified by `selector`.
const insert = (selector, fn) =>
  transform(apply(selector,
    el => el.html(fn())
  ));

const minifierOptions = {
  removeComments: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeTagWhitespace: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  removeOptionalTags: true
};

gulp.task('html', () => (
  gulp.src('src/index.html')
    .pipe(insert('#app-loading', renderLoadingScreen))
    // When minifying, we inline the app CSS in a <style> tag. This saves an
    // HTTP request when loading the page.
    .pipe(when(env.minify, transform(apply('link[href="app.css"]', el =>
      el.replaceWith(`<style>${readFileSync(COMPILED_CSS_PATH, 'utf8')}</style>`)
    ))))
    // minifyHtml makes HTML really, really compact.
    .pipe(when(env.minify, minifyHtml(minifierOptions)))
    .pipe(gulp.dest('public/'))
));
