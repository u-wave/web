/* eslint-disable global-require */
const path = require('path');
const escapeStringRegExp = require('escape-string-regexp');
const { DefinePlugin, ProgressPlugin } = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ExtractCssPlugin = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlSiblingChunksPlugin = require('html-webpack-include-sibling-chunks-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { Plugin: ShakePlugin } = require('webpack-common-shake');
const merge = require('webpack-merge');
const htmlMinifierOptions = require('./tasks/utils/htmlMinifierOptions');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDemo = process.env.DEMO === '1';

// Compile src/ on the fly so we can use components etc. during build time.
require('@babel/register').default({
  only: [
    new RegExp(escapeStringRegExp(path.join(__dirname, 'src'))),
    new RegExp(escapeStringRegExp(path.join(__dirname, 'tasks/webpack'))),
  ],
  plugins: [
    ['@babel/plugin-transform-modules-commonjs', { lazy: true }],
  ],
});

// Most webpack configuration is in this file. A few things are split up to make the
// core stuff easier to grasp.
//
// Other parts of the build are in the ./tasks/webpack/ folder:
//  - compileDependencies: Compiles dependencies that only ship ES2015+ to code that
//    works in all our browser targets.
const compileDependencies = require('./tasks/webpack/compileDependencies').default;
//  - compress: Emits precompressed gzip and brotli versions of static assets.
const compress = require('./tasks/webpack/compress').default;
//  - staticPages: Compiles static markdown pages to HTML.
const staticPages = require('./tasks/webpack/staticPages').default;
//  - analyze: Optionally generates a bundle size statistics page using
//    webpack-bundle-analyzer.
const analyze = require('./tasks/webpack/analyze').default;

const plugins = [
  new CopyPlugin([
    { from: '../assets/favicon.ico', to: 'favicon.ico' },
    { from: '../assets/icon-white.png', to: 'icon-white.png' },
  ]),
  new HtmlSiblingChunksPlugin(),
  new HtmlPlugin({
    chunks: ['polyfills', 'app'],
    template: './index.html',
    title: 'üWave',
    minify: nodeEnv === 'production' ? htmlMinifierOptions : false,
    loadingScreen: () => require('./tasks/utils/renderLoadingScreen')(),
  }),
  new HtmlPlugin({
    chunks: ['polyfills', 'passwordReset'],
    template: './password-reset.html',
    filename: 'password-reset.html',
    title: 'Reset Password',
    minify: nodeEnv === 'production' ? htmlMinifierOptions : false,
  }),
  new DefinePlugin({
    'process.env.FORCE_TOKEN': JSON.stringify(isDemo),
  }),
  new ProgressPlugin(),
  new LodashModuleReplacementPlugin({
    paths: true,
  }),
];

let optimization;

if (nodeEnv === 'production') {
  const SriPlugin = require('webpack-subresource-integrity');

  optimization = {
    runtimeChunk: 'single',
    splitChunks: {
      automaticNameDelimiter: '-',
      chunks: 'all',
    },
  };

  plugins.push(
    new ShakePlugin(),
    new ExtractCssPlugin({
      filename: 'static/[name]_[contenthash:7].css',
      chunkFilename: 'static/[name]_[contenthash:7].css',
    }),
    new SriPlugin({
      hashFuncNames: ['sha512'],
    }),
  );
}

const base = {
  context: path.join(__dirname, 'src'),
  entry: {
    polyfills: './polyfills.js',
    app: [
      isDemo ? './demo.js' : './app.js',
      './app.css',
    ],
    passwordReset: ['./password-reset/app.js'],
  },
  mode: nodeEnv === 'production' ? 'production' : 'development',
  // Quit if there are errors.
  bail: nodeEnv === 'production',
  devtool: nodeEnv === 'production' ? 'source-map' : 'inline-source-map',

  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: nodeEnv === 'production' ? 'static/[name]_[chunkhash:7].js' : '[name]_dev.js',
    chunkFilename: nodeEnv === 'production' ? 'static/[name]_[chunkhash:7].js' : '[name]_dev.js',
    crossOriginLoading: 'anonymous',
  },

  optimization,
  plugins,

  module: {
    rules: [
      // Static files and resources.
      {
        test: /\.mp3$/,
        use: [
          { loader: 'file-loader', query: { name: 'static/[name]_[hash:7].[ext]' } },
        ],
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: [
          { loader: 'file-loader', query: { name: 'static/[name]_[hash:7].[ext]' } },
          { loader: 'image-webpack-loader', query: { bypassOnDebug: true } },
        ],
      },

      {
        test: /\.html$/,
        use: require.resolve('./tasks/webpack/ejs-loader'),
      },

      // Locale files.
      {
        test: /\.yaml$/,
        type: 'json',
        use: 'yaml-loader',
      },

      // Stylesheets.
      {
        test: /\.css$/,
        use: [
          nodeEnv === 'development' ? 'style-loader' : ExtractCssPlugin.loader,
          'css-loader',
          'postcss-loader',
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
    ].filter(Boolean),
  },
  resolve: {
    alias: {
      // Use the ES modules versions of some packages.
      '@material-ui/core': path.join(__dirname, 'node_modules/@material-ui/core/es/'),
      '@material-ui/lab': path.join(__dirname, 'node_modules/@material-ui/lab/es/'),
      '@material-ui/utils': path.join(__dirname, 'node_modules/@material-ui/utils/es/'),
      // For some reason the CJS versions of these don't work in prod?
      'react-dnd': path.join(__dirname, 'node_modules/react-dnd/lib/esm/'),
      'react-dnd-html5-backend': path.join(__dirname, 'node_modules/react-dnd-html5-backend/lib/esm/'),
    },
    mainFields: [
      'browser',
      'module',
      'jsnext:main',
      'main',
    ],
  },
};

module.exports = merge([
  base,
  compileDependencies(),
  staticPages({
    privacy: './static/privacy.md',
  }, nodeEnv === 'production'),
  nodeEnv === 'production' && compress(),
  process.env.ANALYZE && analyze(process.env.ANALYZE),
].filter(Boolean));
