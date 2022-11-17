import path from 'path';
import { fileURLToPath } from 'url';
import HtmlPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';
import babel from '@babel/register';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const context = path.join(dirname, '../../src');

export default function staticPages(pages, production) {
  babel({
    plugins: ['@babel/plugin-transform-modules-commonjs'],
  });

  // Add static pages.
  const staticFiles = [];

  const pageConfigs = Object.entries(pages).map(([name, pathname]) => {
    const fullPath = path.join(dirname, '../../', pathname);
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
              path.join(dirname, '../utils/loadStaticHtmlTemplate.cjs'),
              path.join(dirname, './extractLoader.cjs'),
              fullPath,
            ].join('!'),
            inject: false,
          })
        ) : (
          new HtmlPlugin({
            minify: false,
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
          use: path.join(dirname, '../utils/insertHtml.cjs'),
        },
        {
          test: /\.md$/,
          use: [
            'html-loader',
            path.join(dirname, '../utils/renderMarkdown.cjs'),
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
