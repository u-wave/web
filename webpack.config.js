const path = require('path');
const DefinePlugin = require('webpack').DefinePlugin;
const ProgressPlugin = require('webpack').ProgressPlugin;
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;

const nodeEnv = process.env.NODE_ENV || 'development';

const plugins = [
  new DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new ProgressPlugin()
];

if (nodeEnv === 'production') {
  const LoaderOptionsPlugin = require('webpack').LoaderOptionsPlugin;
  const DedupePlugin = require('webpack').optimize.DedupePlugin;
  const OccurrenceOrderPlugin = require('webpack').optimize.OccurrenceOrderPlugin;
  const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;

  plugins.push(
    new OccurrenceOrderPlugin(),
    new DedupePlugin(),
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
        unsafe: true
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
    app: './app.js'
  },
  output: {
    publicPath: path.join(__dirname, 'public'),
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  plugins,
  module: {
    rules: [
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
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: true,
    plugins: [
      new HotModuleReplacementPlugin()
    ]
  }
};
