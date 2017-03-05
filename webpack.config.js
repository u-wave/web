const readFile = require('fs').readFileSync;
const path = require('path');
const escapeStringRegExp = require('escape-string-regexp');
const DefinePlugin = require('webpack').DefinePlugin;
const ProgressPlugin = require('webpack').ProgressPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';

// Compile src/ on the fly so we can use components etc. during build time.
require('babel-register')({
  only: new RegExp(escapeStringRegExp(path.join(__dirname, 'src'))),
  plugins: [ 'transform-es2015-modules-commonjs' ]
});

const staticPages = {
  privacy: './static/privacy.md'
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
  removeOptionalTags: true
};

const extractAppCss = new ExtractTextPlugin({
  filename: '[name]_[contenthash:7].css',
  // Disable in development mode, so we can use CSS hot reloading.
  disable: nodeEnv === 'development'
});

const plugins = [
  new DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new CopyPlugin([
    { from: '../assets/favicon.ico', to: 'favicon.ico' }
  ]),
  new HtmlPlugin({
    chunks: [ 'app' ],
    inject: false,
    template: './index.html',
    minify: nodeEnv === 'production' ? htmlMinifierOptions : false,
    loadingScreen: () => require('./tasks/utils/renderLoadingScreen')()
  }),
  extractAppCss,
  new ProgressPlugin(),
  new LodashModuleReplacementPlugin({
    paths: true
  })
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

// Workaround: Seems like babel-loader doesn't pick up on the environment type
// correctly, so we manually load the .babelrc and add the production plugins
// if necessary.
const babelrc = JSON.parse(
  readFile(path.join(__dirname, '.babelrc'), 'utf8')
);
if (nodeEnv === 'production') {
  babelrc.plugins = babelrc.plugins.concat(babelrc.env.production.plugins);
}

const context = path.join(__dirname, 'src');
const entries = {
  app: [ './app.js', './app.css' ]
};

// Add static pages.
const staticFiles = [];
Object.keys(staticPages).forEach((name) => {
  const fullPath = path.join(__dirname, staticPages[name]);
  entries[name] = [
    path.relative(context, fullPath),
    './markdown.css'
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
      chunks: [ name ],
      filename: `${name}.html`,
      template: [
        require.resolve('./tasks/utils/loadStaticHtmlTemplate'),
        'extract-loader',
        fullPath
      ].join('!'),
      inject: false,
      minify: htmlMinifierOptions
    }));
  } else {
    plugins.push(new HtmlPlugin({
      chunks: [ name ],
      template: './markdown.dev.html',
      filename: `${name}.html`
    }));
  }
});

module.exports = {
  context,
  entry: entries,
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: '[name]_[hash].js',
    hashDigestLength: 7
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.mp3$/,
        use: [
          { loader: 'file-loader', query: { name: '[name]_[hash:7].[ext]' } }
        ]
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: [
          { loader: 'file-loader', query: { name: '[name]_[hash:7].[ext]' } },
          { loader: 'image-webpack-loader', query: { bypassOnDebug: true } }
        ]
      },
      {
        test: /\.css$/,
        use: extractAppCss.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'postcss-loader' ]
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
        use: [
          { loader: 'babel-loader', query: babelrc },
          nodeEnv !== 'production' && {
            loader: 'eslint-loader',
            query: { cache: true }
          }
        ].filter(Boolean)
      },
      nodeEnv !== 'production' && {
        // Hot reload static pages in development mode.
        test: staticFiles,
        use: require.resolve('./tasks/utils/insertHtml')
      },
      {
        test: /\.md$/,
        use: [
          'html-loader',
          require.resolve('./tasks/utils/renderMarkdown')
        ]
      }
    ].filter(Boolean)
  }
};
