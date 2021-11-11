'use strict';

const h = require('react').createElement;
const prerender = require('./prerender.cjs');

module.exports = function renderMarkdown(source) {
  // eslint-disable-next-line global-require
  const MarkdownWithHtml = require('../../src/components/Markdown/WithHtml').default;

  const { html, css } = prerender(h(MarkdownWithHtml, { source }));
  if (css === '') {
    return html;
  }
  return `<style>${css}</style>${html}`;
};
