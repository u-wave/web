import { src, dest } from 'gulp';
import { transform } from 'gulp-insert';
import { readFileSync } from 'fs';
import { join as joinPath } from 'path';
import cheerio from 'cheerio';
import minifyHtml from 'gulp-minify-html';
import when from 'gulp-if';

// The core function of the HTML task is to copy the index.html file from the
// source directory to the compiled directory. However, it can also do a few
// more things, like minification and prerendering the üWave React app ahead of
// time. Both of those will make it feel like üWave loads incredibly fast, even
// though it won't do much until the JavaScript is loaded as well.

const COMPILED_CSS_PATH = joinPath(__dirname, '../lib/style.css');

// Renders the React app to a string. It's surprisingly straightforward because
// React is cool.
function renderApp() {
  const React = require('react');
  const { renderToString } = require('react-dom/server');
  const App = require('../src/components/App');
  return renderToString(<App />);
}

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

export default function copyHtmlTask({ minify = false, prerender = false }) {
  return src('src/index.html')
    .pipe(when(prerender, insert('#app', renderApp)))
    // When minifying, we inline the app CSS in a <style> tag. This saves an
    // HTTP request when loading the page.
    .pipe(when(minify, transform(apply('link[href="style.css"]', el =>
      el.replaceWith(`<style>${readFileSync(COMPILED_CSS_PATH, 'utf8')}</style>`)
    ))))
    // minifyHtml makes HTML really, really compact.
    .pipe(when(minify, minifyHtml()))
    .pipe(dest('lib/'));
}
