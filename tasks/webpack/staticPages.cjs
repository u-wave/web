'use strict';

const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const htmlMinifierOptions = require('../utils/htmlMinifierOptions.cjs');

const context = path.join(__dirname, '../../src');

module.exports = function staticPages(pages, production) {
  require('@babel/register').default({
    plugins: ['@babel/plugin-transform-modules-commonjs'],
  });

  // Add static pages.
  const staticFiles = [];

  const pageConfigs = Object.entries(pages).map(([name, pathname]) => {
    const fullPath = path.join(__dirname, '../../', pathname);
    const config = {
      entry: {
        [name]: [
          path.relative(context, fullPath),
          './markdown.css',
        ],
      },
      plugins: [
        production ? (
          // When compiling static pages in production mode, we use the static page
          // contents as the template, and wrap it in the _actual_ template using a
          // custom loader.
          // This is very hacky indeed.
          // The problem is that we need to insert compiled Markdown and any
          // potential CSS into the HTML using the HtmlPlugin, but it's really hard
          // to find the compiled markdown when you're just in a template.
          // This could use a better alternative :p
          new HtmlPlugin({
            chunks: [name],
            filename: `${name}.html`,
            template: [
              require.resolve('../utils/loadStaticHtmlTemplate.cjs'),
              require.resolve('./extractLoader.cjs'),
              fullPath,
            ].join('!'),
            inject: false,
            minify: htmlMinifierOptions,
          })
        ) : (
          new HtmlPlugin({
            chunks: [name],
            template: './markdown.dev.html',
            filename: `${name}.html`,
          })
        ),
      ],
    };

    staticFiles.push(fullPath);

    return config;
  });

  const loaders = {
    module: {
      rules: [
        !production && {
          // Hot reload static pages in development mode.
          test: staticFiles,
          use: require.resolve('../utils/insertHtml.cjs'),
        },
        {
          test: /\.md$/,
          use: [
            'html-loader',
            require.resolve('../utils/renderMarkdown.cjs'),
          ],
        },
      ].filter(Boolean),
    },
  };

  return merge([
    ...pageConfigs,
    loaders,
  ]);
};
