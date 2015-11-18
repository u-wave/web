import { src, dest } from 'gulp';
import { transform as replace } from 'gulp-insert';
import minifyHtml from 'gulp-minify-html';
import when from 'gulp-if';

function renderApp() {
  const React = require('react');
  const { renderToString } = require('react-dom/server');
  const App = require('../src/components/App');
  return renderToString(<App />);
}

export default function copyHtmlTask({ minify = false, prerender = false }) {
  return src('src/index.html')
    .pipe(when(prerender, replace(contents => contents.replace('<!-- App -->', renderApp))))
    .pipe(when(minify, minifyHtml()))
    .pipe(dest('lib/'));
}
