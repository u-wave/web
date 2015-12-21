import { src, dest } from 'gulp';
import { transform } from 'gulp-insert';
import { readFileSync } from 'fs';
import { join as joinPath } from 'path';
import cheerio from 'cheerio';
import minifyHtml from 'gulp-minify-html';
import when from 'gulp-if';

const COMPILED_CSS_PATH = joinPath(__dirname, '../lib/style.css');

function renderApp() {
  const React = require('react');
  const { renderToString } = require('react-dom/server');
  const App = require('../src/components/App');
  return renderToString(<App />);
}

const apply = (selector, fn) =>
  contents => {
    const $ = cheerio.load(contents);
    fn($(selector));
    return $.html();
  };

const insert = (selector, fn) =>
  transform(apply(selector,
    el => el.html(fn())
  ));

export default function copyHtmlTask({ minify = false, prerender = false }) {
  return src('src/index.html')
    .pipe(when(prerender, insert('#app', renderApp)))
    .pipe(when(minify, transform(apply('link[href="style.css"]', el =>
      el.replaceWith(`<style>${readFileSync(COMPILED_CSS_PATH, 'utf8')}</style>`)
    ))))
    .pipe(when(minify, minifyHtml()))
    .pipe(dest('lib/'));
}
