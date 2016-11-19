const path = require('path');
const DefinePlugin = require('webpack').DefinePlugin;
const ProgressPlugin = require('webpack').ProgressPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';

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
  removeOptionalTags: true
};

const extractAppCss = new ExtractTextPlugin({
  filename: '[name]_[hash].css',
  // Disable in development mode, so we can use CSS hot reloading.
  disable: nodeEnv === 'development'
});

const plugins = [
  new DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new HtmlPlugin({
    chunks: [ 'app' ],
    inject: false,
    template: './index.html',
    minify: nodeEnv === 'production' ? htmlMinifierOptions : false,
    loadingScreen: () => require('./tasks/utils/renderLoadingScreen')()
  }),
  extractAppCss,
  new ProgressPlugin()
];

if (nodeEnv === 'production') {
  const LoaderOptionsPlugin = require('webpack').LoaderOptionsPlugin;
  const OccurrenceOrderPlugin = require('webpack').optimize.OccurrenceOrderPlugin;
  const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;

  plugins.push(
    new OccurrenceOrderPlugin(),
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new UglifyJsPlugin({
      // Yeah… Enables some riskier minification that doesn't work in IE8.
      // But üWave doesn't work in IE8 _anyway_, so we don't care.
      compress: {
        screw_ie8: true,
        pure_getters: true,
        unsafe: true,
        warnings: false
      },
      output: { screw_ie8: true },
      // Rename top-level (global scope) variables to shorter names too.
      // There's no other code that depends on those variables to be
      // available, so it doesn't really matter what they're called!
      mangle: { toplevel: true }
    })
  );
}

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: [ './app.js', './app.css' ]
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: '[name]_[hash].js'
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: extractAppCss.extract({
          fallbackLoader: 'style-loader',
          loader: [ 'css-loader', 'postcss-loader' ]
        })
      },
      {
        test: /\.yaml$/,
        use: [ 'json-loader', 'yaml-loader' ]
      },
      {
        test: /\.json$/,
        use: [ 'json-loader' ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ]
      }
    ]
  }
};
