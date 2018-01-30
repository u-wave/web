const fs = require('fs');
const createTemplate = require('lodash/template');

/**
 * A Webpack loader that creates a template for html-webpack-plugin to render
 * a static HTML page.
 */
module.exports = function loadStaticHtmlTemplate(source) {
  const cb = this.async();
  const parentTemplate = require.resolve('../../src/markdown.prod.html');

  // Extract the likely title from the document.
  const title = source.split(/<h1[^>]*>|<\/h1>/)[1]
    .replace(/<.*?>/g, '').trim(); // strip html tags

  fs.readFile(parentTemplate, 'utf8', (err, templateSource) => {
    if (err) {
      cb(err);
      return;
    }

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
  });
};
