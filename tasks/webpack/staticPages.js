import path from 'path';
import HtmlPlugin from 'html-webpack-plugin';
import merge from 'webpack-merge';
import htmlMinifierOptions from '../utils/htmlMinifierOptions';

const context = path.join(__dirname, '../../src');

export default function staticPages(pages, production) {
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
              require.resolve('../utils/loadStaticHtmlTemplate'),
              'extract-loader',
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
          use: require.resolve('../utils/insertHtml'),
        },
        {
          test: /\.md$/,
          use: [
            'html-loader',
            require.resolve('../utils/renderMarkdown'),
          ],
        },
      ].filter(Boolean),
    },
  };

  return merge([
    ...pageConfigs,
    loaders,
  ]);
}
