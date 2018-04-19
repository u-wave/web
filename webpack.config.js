/* eslint-disable global-require */
const path = require('path');
const escapeStringRegExp = require('escape-string-regexp');
const { ProgressPlugin } = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ExtractCssPlugin = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlSiblingChunksPlugin = require('html-webpack-include-sibling-chunks-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-pwa-manifest');

const nodeEnv = process.env.NODE_ENV || 'development';

// Compile src/ on the fly so we can use components etc. during build time.
require('@babel/register').default({
  only: [
    new RegExp(escapeStringRegExp(path.join(__dirname, 'src'))),
  ],
  plugins: ['@babel/plugin-transform-modules-commonjs'],
});

const staticPages = {
  privacy: './static/privacy.md',
};

// Minification options used in production mode.
const htmlMinifierOptions = {
  removeComments: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeTagWhitespace: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  removeOptionalTags: true,
  minifyCSS: true,
};

const noConfigBabelLoader = {
  loader: 'babel-loader',
  query: {
    babelrc: false,
    presets: [
      ['@babel/preset-env', {
        modules: false,
        // Don't assume dependencies are OK with being run in loose mode
        loose: false,
        forceAllTransforms: true,
      }],
    ],
  },
};

const plugins = [
  new CopyPlugin([
    { from: '../assets/favicon.ico', to: 'favicon.ico' },
  ]),
  new HtmlSiblingChunksPlugin(),
  new HtmlPlugin({
    chunks: ['app'],
    template: './index.html',
    title: 'üWave',
    minify: nodeEnv === 'production' ? htmlMinifierOptions : false,
    loadingScreen: () => require('./tasks/utils/renderLoadingScreen')(),
  }),
  new HtmlPlugin({
    chunks: ['passwordReset'],
    template: './password-reset.html',
    filename: 'password-reset.html',
    title: 'Reset Password',
    minify: nodeEnv === 'production' ? htmlMinifierOptions : false,
  }),
  new ProgressPlugin(),
  new LodashModuleReplacementPlugin({
    paths: true,
  }),
  new ManifestPlugin(require('./src/manifest').default),
];

let optimization;

if (nodeEnv === 'production') {
  const CompressionPlugin = require('compression-webpack-plugin');
  const brotli = require('brotli/compress');
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  const SriPlugin = require('webpack-subresource-integrity');

  const compressible = /\.(js|css|svg|mp3)$/;

  optimization = {
    runtimeChunk: 'single',
    splitChunks: {
      automaticNameDelimiter: '-',
      chunks: 'all',
    },
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          toplevel: true,
          compress: {
            pure_getters: true,
            unsafe: true,
          },
        },
      }),
    ],
  };

  plugins.push(
    new ExtractCssPlugin({
      filename: '[name]_[contenthash:7].css',
      chunkFilename: '[name]_[contenthash:7].css',
    }),
    // Add Gzip-compressed files.
    new CompressionPlugin({
      test: compressible,
      asset: '[path].gz[query]',
      algorithm: 'gzip',
    }),
    // Add Brotli-compressed files.
    new CompressionPlugin({
      test: compressible,
      asset: '[path].br[query]',
      algorithm(buffer, opts, cb) {
        const result = brotli(buffer);
        if (result) {
          cb(null, Buffer.from(result));
        } else {
          cb(null, buffer);
        }
      },
    }),
    new SriPlugin({
      hashFuncNames: ['sha512'],
    }),
  );
}

const context = path.join(__dirname, 'src');
const entries = {
  app: ['./app.js', './app.css'],
  passwordReset: ['./password-reset/app.js'],
};

// Add static pages.
const staticFiles = [];
Object.keys(staticPages).forEach((name) => {
  const fullPath = path.join(__dirname, staticPages[name]);
  entries[name] = [
    path.relative(context, fullPath),
    './markdown.css',
  ];

  staticFiles.push(fullPath);

  if (nodeEnv === 'production') {
    // When compiling static pages in production mode, we use the static page
    // contents as the template, and wrap it in the _actual_ template using a
    // custom loader.
    // This is very hacky indeed.
    // The problem is that we need to insert compiled Markdown and any
    // potential CSS into the HTML using the HtmlPlugin, but it's really hard
    // to find the compiled markdown when you're just in a template.
    // This could use a better alternative :p
    plugins.push(new HtmlPlugin({
      chunks: [name],
      filename: `${name}.html`,
      template: [
        require.resolve('./tasks/utils/loadStaticHtmlTemplate'),
        'extract-loader',
        fullPath,
      ].join('!'),
      inject: false,
      minify: htmlMinifierOptions,
    }));
  } else {
    plugins.push(new HtmlPlugin({
      chunks: [name],
      template: './markdown.dev.html',
      filename: `${name}.html`,
    }));
  }
});

module.exports = {
  context,
  entry: entries,
  mode: nodeEnv === 'production' ? 'production' : 'development',
  // Quit if there are errors.
  bail: nodeEnv === 'production',
  devtool: nodeEnv === 'production' ? 'source-map' : 'inline-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: nodeEnv === 'production' ? '[name]_[chunkhash:7].js' : '[name]_dev.js',
    chunkFilename: nodeEnv === 'production' ? '[name]_[chunkhash:7].js' : '[name]_dev.js',
    crossOriginLoading: 'anonymous',
  },
  optimization,
  plugins,
  module: {
    rules: [
      {
        test: /\.mp3$/,
        use: [
          { loader: 'file-loader', query: { name: '[name]_[hash:7].[ext]' } },
        ],
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: [
          { loader: 'file-loader', query: { name: '[name]_[hash:7].[ext]' } },
          { loader: 'image-webpack-loader', query: { bypassOnDebug: true } },
        ],
      },
      {
        test: /\.css$/,
        use: [
          nodeEnv === 'development' ? 'style-loader' : ExtractCssPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.yaml$/,
        use: [
          noConfigBabelLoader,
          require.resolve('./tasks/utils/jsonLoader'),
          'yaml-loader',
        ],
      },
      // JS loader for dependencies that use ES2015+:
      {
        test: /\.js$/,
        include: [
          /url-regex/,
          /truncate-url/,
          /format-duration/,
          /object-values/,
          /material-ui\/es/,
          /material-ui-icons\/es/,
        ],
        use: [
          noConfigBabelLoader,
        ],
      },
      // JS loader for our own code:
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          nodeEnv !== 'production' && {
            loader: 'eslint-loader',
            query: { cache: true },
          },
        ].filter(Boolean),
      },
      nodeEnv !== 'production' && {
        // Hot reload static pages in development mode.
        test: staticFiles,
        use: require.resolve('./tasks/utils/insertHtml'),
      },
      {
        test: /\.md$/,
        use: [
          'html-loader',
          require.resolve('./tasks/utils/renderMarkdown'),
        ],
      },
    ].filter(Boolean),
  },
  resolve: {
    alias: {
      'material-ui': path.join(__dirname, 'node_modules/material-ui/es/'),
      '@material-ui/icons': path.join(__dirname, 'node_modules/@material-ui/icons/es/'),
    },
    mainFields: [
      'browser',
      'module',
      'jsnext:main',
      'main',
    ],
  },
};
