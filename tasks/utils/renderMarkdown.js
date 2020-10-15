'use strict';

const h = require('react').createElement;
const prerender = require('./prerender');

module.exports = function renderMarkdown(source) {
  // eslint-disable-next-line global-require
  const Markdown = require('../../src/components/Markdown').default;

  const { html, css } = prerender(h(Markdown, { source }));
  if (css === '') {
    return html;
  }
  return `<style>${css}</style>${html}`;
};
