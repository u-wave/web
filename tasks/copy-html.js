import { src, dest } from 'gulp';
import { transform as replace } from 'gulp-insert';
import { readFileSync } from 'fs';
import { join as joinPath } from 'path';
import minifyHtml from 'gulp-minify-html';
import when from 'gulp-if';

const COMPILED_CSS_PATH = joinPath(__dirname, '../lib/style.css');

function renderApp() {
  const React = require('react');
  const { renderToString } = require('react-dom/server');
  const App = require('../src/components/App');
  return renderToString(<App />);
}

export default function copyHtmlTask({ minify = false, prerender = false }) {
  return src('src/index.html')
    .pipe(when(prerender, replace(contents => contents.replace('<!-- App -->', renderApp))))
    .pipe(when(minify, replace(contents => contents.replace(
      '<link rel="stylesheet" href="style.css">',
      `<style>${readFileSync(COMPILED_CSS_PATH, 'utf8')}</style>`
    ))))
    .pipe(when(minify, minifyHtml()))
    .pipe(dest('lib/'));
}
