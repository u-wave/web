'use strict';

const { createElement: h } = require('react');
const prerender = require('./prerender.cjs');

async function renderMarkdown(source) {
  const { default: Markdown } = await import('react-markdown');
  const { default: rehypeRaw } = await import('rehype-raw');

  const { html, css } = prerender(h(Markdown, {
    rehypePlugins: [rehypeRaw],
  }, source));
  if (css === '') {
    return html;
  }
  return `<style>${css}</style>${html}`;
}

module.exports = renderMarkdown;
