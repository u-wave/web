const path = require('path');
const escapeStringRegExp = require('escape-string-regexp');
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const ExtractCssPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const htmlMinifierOptions = require('./tasks/utils/htmlMinifierOptions');
const { MiddlewarePackageJsonPlugin } = require('./tasks/webpack/middleware');
const renderLoadingScreen = require('./tasks/utils/renderLoadingScreen');

// Compile src/ on the fly so we can use components etc. during build time.
require('@babel/register').default({
  only: [
    new RegExp(escapeStringRegExp(path.join(__dirname, 'src'))),
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
const compileDependencies = require('./tasks/webpack/compileDependencies');
//  - staticPages: Compiles static markdown pages to HTML.
const staticPages = require('./tasks/webpack/staticPages');
const getAnalysisConfig = require('./tasks/webpack/analyze');

function unused() {}

function getConfig(env, {
  watch = false,
  demo = false,
  analyze,
  dualBundles = process.env.MODULES === '1',
}) {
  const outputPackage = path.join(__dirname, 'packages/u-wave-web-middleware');

  const plugins = [];

  if (!demo) {
    plugins.push(new WebpackBar());
  }

  const middlewareConfig = {
    name: 'middleware',
    context: path.join(__dirname, 'src'),
    mode: env.production ? 'production' : 'development',
    // Quit if there are errors.
    bail: env.production,
    devtool: 'source-map',

    entry: './middleware/index.js',
    output: {
      path: outputPackage,
      filename: './middleware/index.js',
      chunkFilename: './middleware/[name].js',
      library: {
        type: 'commonjs-module',
      },
    },
    target: 'node',

    optimization: {
      minimize: false,
    },

    externals({ request }, callback) {
      if (request.startsWith('./') || request.startsWith('../')) {
        callback();
      } else {
        callback(null, `commonjs ${request}`);
      }
    },

    module: {
      rules: [
        { test: /\.js$/, use: 'babel-loader' },
      ],
    },

    plugins: [
      new MiddlewarePackageJsonPlugin(),
    ],
  };

  const baseConfig = merge({
    context: path.join(__dirname, 'src'),
    mode: env.production ? 'production' : 'development',
    // Quit if there are errors.
    bail: env.production,
    devtool: env.production ? 'source-map' : 'inline-source-map',

    experiments: {
      asset: true,
    },

    module: {
      rules: [
        // Static files and resources.
        {
          test: /\.mp3$/,
          type: 'asset',
        },
        {
          test: /\.(gif|jpe?g|png|svg)$/,
          type: 'asset',
          use: [
            !env.production && { loader: 'image-webpack-loader' },
          ].filter(Boolean),
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
            env.production ? ExtractCssPlugin.loader : 'style-loader',
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
            !env.production && {
              loader: 'eslint-loader',
              options: { cache: true },
            },
          ].filter(Boolean),
        },
      ],
    },
    resolve: {
      extensions: [
        '.mjs',
        '.js',
        '.json',
        '.wasm',
      ],
      alias: {
        // Node.js shims
        path: 'path-browserify',
      },
      mainFields: [
        'browser',
        'module',
        'jsnext:main',
        'main',
      ],
    },
  }, compileDependencies());

  const appConfig = merge(baseConfig, {
    entry: {
      polyfills: './polyfills.js',
      app: {
        import: [demo ? './demo.js' : './app.js', './app.css'],
        dependOn: 'polyfills',
      },
      passwordReset: {
        import: ['./password-reset/app.js'],
        dependOn: 'polyfills',
      },
    },
    output: {
      publicPath: '/',
      path: path.join(outputPackage, 'public'),
      filename: env.production ? 'static/[name]_[chunkhash:7].mjs' : '[name]_dev.mjs',
      chunkFilename: env.production ? 'static/[name]_[chunkhash:7].mjs' : '[name]_dev.mjs',
      assetModuleFilename: env.production ? 'static/[name]_[hash:7][ext]' : '[name][ext]',
      crossOriginLoading: 'anonymous',
    },

    plugins: plugins.filter(Boolean),
  });

  const hmrConfigPatch = {
    entry: {
      app: {
        import: ['webpack-hot-middleware/client'],
      },
      passwordReset: {
        import: ['webpack-hot-middleware/client'],
      },
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      new ReactRefreshPlugin(),
    ],
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
  };

  const productionConfigPatch = {
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        automaticNameDelimiter: '-',
        chunks: 'all',
      },
    },

    plugins: [
      new CleanWebpackPlugin(),
      new ExtractCssPlugin({
        esModule: true,
        filename: 'static/[name]_[contenthash:7].css',
        chunkFilename: 'static/[name]_[contenthash:7].css',
      }),
      new OptimizeCssPlugin(),
      new SriPlugin({
        hashFuncNames: ['sha512'],
      }),
    ],
  };

  const demoConfigPatch = {
    output: {
      path: path.join(__dirname, 'public'),
    },
    plugins: [
      new DefinePlugin({
        'process.env.FORCE_TOKEN': JSON.stringify(demo),
      }),
    ],
  };

  const legacyConfigPatch = {
    name: 'legacy',
    output: {
      filename: env.production ? 'static/[name]_[chunkhash:7].js' : '[name]_dev.js',
      chunkFilename: env.production ? 'static/[name]_[chunkhash:7].js' : '[name]_dev.js',
      ecmaVersion: 5,
    },
  };

  // Must be used together with an app config to work correctly.
  const staticPagesConfigPatch = merge(
    {
      plugins: [
        new CopyPlugin({
          patterns: [
            { from: '../assets/favicon.ico', to: 'favicon.ico' },
            { from: '../assets/icon-white.png', to: 'icon-white.png' },
          ],
        }),
        new HtmlPlugin({
          chunks: ['polyfills', 'app'],
          template: './index.html',
          title: 'üWave',
          minify: env.production ? htmlMinifierOptions : false,
          scriptLoading: 'defer',
          loadingScreen: (...args) => renderLoadingScreen(...args),
        }),
        new HtmlPlugin({
          chunks: ['polyfills', 'passwordReset'],
          template: './password-reset.html',
          filename: 'password-reset.html',
          title: 'Reset Password',
          minify: env.production ? htmlMinifierOptions : false,
          scriptLoading: 'defer',
        }),
      ],
    },
    staticPages({
      privacy: './static/privacy.md',
    }, env.production),
  );

  const loadingScreenConfig = merge(baseConfig, {
    entry: './components/LoadingScreen',
    output: {
      path: path.join(outputPackage, 'public'),
      filename: 'loadingScreen.js',
      library: {
        type: 'commonjs',
      },
    },
    optimization: {
      minimize: false,
    },
    target: 'node',
  });

  let activeAppConfig = appConfig;
  if (watch) {
    // The `hmrConfigPatch` comes first so the hmr entry points are ran first.
    activeAppConfig = merge(hmrConfigPatch, activeAppConfig);
  }
  if (env.production) {
    activeAppConfig = merge(activeAppConfig, productionConfigPatch);
  }
  if (!dualBundles) {
    activeAppConfig = merge(activeAppConfig, legacyConfigPatch);
  }
  if (demo) {
    activeAppConfig = merge(activeAppConfig, demoConfigPatch);
  }

  let siteConfig = merge(activeAppConfig, staticPagesConfigPatch, { name: 'app' });
  if (analyze) {
    siteConfig = merge(siteConfig, getAnalysisConfig(analyze));
  }

  unused(loadingScreenConfig);

  const configs = [middlewareConfig, siteConfig];

  if (dualBundles) {
    const legacyAppConfig = merge(activeAppConfig, legacyConfigPatch);

    configs.push(legacyAppConfig);
  }
  return configs;
}

module.exports = getConfig;
