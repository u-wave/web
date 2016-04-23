import { src, dest } from 'gulp';
import { transform } from 'gulp-insert';
import { readFileSync } from 'fs';
import { join as joinPath } from 'path';
import cheerio from 'cheerio';
import minifyHtml from 'gulp-htmlmin';
import when from 'gulp-if';

import renderLoadingScreen from './utils/renderLoadingScreen';
import renderApp from './utils/renderApp';

// The core function of the HTML task is to copy the index.html file from the
// source directory to the compiled directory. However, it can also do a few
// more things, like minification and prerendering the üWave React app ahead of
// time. Both of those will make it feel like üWave loads incredibly fast, even
// though it won't do much until the JavaScript is loaded as well.

const COMPILED_CSS_PATH = joinPath(__dirname, '../lib/app.css');

// Used to apply a function to a DOM element identified by `selector`.
const apply = (selector, fn) =>
  contents => {
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

const enableMinifierOptions = arr => {
  const object = {};
  arr.forEach(key => {
    object[key] = true;
  });
  return object;
};

const minifierOptions = enableMinifierOptions([
  'removeComments', 'collapseWhitespace', 'collapseBooleanAttributes',
  'removeTagWhitespace', 'removeAttributeQuotes', 'removeRedundantAttributes',
  'removeScriptTypeAttributes', 'removeStyleLinkTypeAttributes', 'removeOptionalTags'
]);

export default function copyHtmlTask({ minify = false, prerender = false }) {
  return src('src/index.html')
    .pipe(insert('#app-loading', renderLoadingScreen))
    .pipe(when(prerender, insert('#app', renderApp)))
    // When minifying, we inline the app CSS in a <style> tag. This saves an
    // HTTP request when loading the page.
    .pipe(when(minify, transform(apply('link[href="app.css"]', el =>
      el.replaceWith(`<style>${readFileSync(COMPILED_CSS_PATH, 'utf8')}</style>`)
    ))))
    // minifyHtml makes HTML really, really compact.
    .pipe(when(minify, minifyHtml(minifierOptions)))
    .pipe(dest('lib/'));
}
