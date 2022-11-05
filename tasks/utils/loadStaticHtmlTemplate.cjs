'use strict';

const fs = require('fs/promises');
const createTemplate = require('lodash/template');

/**
 * A Webpack loader that creates a template for html-webpack-plugin to render
 * a static HTML page.
 */
module.exports = async function loadStaticHtmlTemplate(source) {
  const cb = this.async();
  const parentTemplate = require.resolve('../../src/markdown.prod.html');

  try {
    const { fromHtml } = await import('hast-util-from-html');
    const { toText } = await import('hast-util-to-text');
    // Extract the likely title from the document.
    const title = toText(fromHtml(source.split(/<h1[^>]*>|<\/h1>/)[1], { fragment: true }));

    const templateSource = await fs.readFile(parentTemplate, 'utf8');

    // Rest of this is similar to the default html-webpack-plugin loader.
    // https://github.com/jantimon/html-webpack-plugin/blob/b8fd1427bc7714f0b37e1ef8ed9e4477a7bbafcd/lib/loader.js
    const template = createTemplate(templateSource);

    cb(null, `
      module.exports = (data) => {
        const title = ${JSON.stringify(title)};
        const contents = ${JSON.stringify(source)};
        const compilation = data.compilation;
        const webpack = data.webpack;
        const webpackConfig = data.webpackConfig;
        const htmlWebpackPlugin = data.htmlWebpackPlugin;

        return (${template.source})();
      };
    `);
  } catch (err) {
    cb(err);
  }
};
