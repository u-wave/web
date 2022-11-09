import * as path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import WebpackBar from 'webpackbar';
import ExtractCssPlugin from 'mini-css-extract-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import { SubresourceIntegrityPlugin } from 'webpack-subresource-integrity';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlMinimizerPlugin from 'html-minimizer-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import { merge } from 'webpack-merge';
import renderLoadingScreen from './tasks/utils/renderLoadingScreen.cjs';

// Most webpack configuration is in this file. A few things are split up to make the
// core stuff easier to grasp.
//
// Other parts of the build are in the ./tasks/webpack/ folder:
//  - compileDependencies: Compiles dependencies that only ship ES2015+ to code that
//    works in all our browser targets.
import compileDependencies from './tasks/webpack/compileDependencies.mjs';
//  - staticPages: Compiles static markdown pages to HTML.
import staticPages from './tasks/webpack/staticPages.mjs';
import getAnalysisConfig from './tasks/webpack/analyze.mjs';
import getNpmConfig from './tasks/webpack/npm.mjs';

const { DefinePlugin, HotModuleReplacementPlugin } = webpack;

function unused() {}

function getConfig(env, {
  profiling = false,
  watch = false,
  demo = false,
  analyze,
  dualBundles = false,
}) {
  const plugins = [];

  if (!demo) {
    plugins.push(new WebpackBar());
  }

  const outputPackage = fileURLToPath(new URL('./npm', import.meta.url));

  const npmConfig = getNpmConfig(env, outputPackage);

  const baseConfig = {
    context: fileURLToPath(new URL('./src', import.meta.url)),
    mode: env.production ? 'production' : 'development',
    // Quit if there are errors.
    bail: env.production,
    devtool: env.production ? 'source-map' : 'inline-source-map',

    output: {
      clean: true,
    },

    module: {
      rules: [
        // Static files and resources.
        {
          test: /\.(mp3|woff2?)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(gif|jpe?g|png|svg)$/,
          type: 'asset/resource',
        },

        {
          test: /\.html$/,
          use: fileURLToPath(new URL('./tasks/webpack/ejs-loader.cjs', import.meta.url)),
        },

        // Locale files.
        {
          test: /\.yaml$/,
          exclude: /en\.yaml$/,
          use: { loader: 'yaml-loader', options: { asJSON: true } },
          type: 'asset/resource',
          generator: {
            filename: env.production ? 'static/[name]_[contenthash:7].json' : '[name].json',
          },
        },
        //  English is embedded in the bundle, we always need it as a fallback.
        {
          test: /en\.yaml$/,
          type: 'json',
          parser: {
            parse: yaml.load,
          },
        },

        // Stylesheets.
        {
          test: /\.css$/,
          use: [
            env.production ? ExtractCssPlugin.loader : 'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        },

        {
          test: /\.js$/,
          include: /node_modules/,
          resolve: {
            byDependency: {
              esm: { fullySpecified: false },
            },
          },
        },

        // JS loader for our own code:
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: (info) => ({
            loader: 'babel-loader',
            options: {
              caller: {
                // Name of the compiler config: 'app' for modern JS,
                // 'legacy' for IE11 support.
                compiler: info.compiler,
              },
            },
          }),
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
        'react/jsx-runtime.js': 'react/jsx-runtime',
        'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
      },
      mainFields: [
        'browser',
        'module',
        'jsnext:main',
        'main',
      ],
    },
  };

  const appConfig = merge(baseConfig, {
    name: 'app',
    entry: {
      polyfills: 'triage-polyfills',
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
      filename: env.production ? 'static/[name]_[contenthash:7].js' : '[name]_dev.js',
      chunkFilename: env.production ? 'static/[name]_[contenthash:7].js' : '[name]_dev.js',
      assetModuleFilename: env.production ? 'static/[name]_[contenthash:7][ext]' : '[name][ext]',
      crossOriginLoading: 'anonymous',
    },
    target: ['web'],

    plugins: plugins.filter(Boolean),

    resolve: {
      alias: {
        'triage-polyfills': './polyfills-modern.js',
      },
    },
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
  };

  const productionConfigPatch = {
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        automaticNameDelimiter: '-',
        chunks: 'all',
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: profiling ? {
              keep_fnames: true,
              keep_classnames: true,
            } : {},
            compress: {
              passes: 2,
            },
          },
        }),
        new CssMinimizerPlugin(),
        new HtmlMinimizerPlugin({
          minimizerOptions: {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeTagWhitespace: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
          },
        }),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
          },
        }),
      ],
    },

    cache: {
      type: 'filesystem',
    },

    plugins: [
      new ExtractCssPlugin({
        filename: 'static/[name]_[contenthash:7].css',
        chunkFilename: 'static/[name]_[contenthash:7].css',
      }),
      new SubresourceIntegrityPlugin({
        hashFuncNames: ['sha384', 'sha512'],
      }),
    ],
  };

  const demoConfigPatch = {
    plugins: [
      new DefinePlugin({
        'process.env.FORCE_TOKEN': JSON.stringify(demo),
      }),
    ],
  };

  const legacyConfigPatch = merge({
    name: 'app-legacy',
    output: {
      filename: env.production ? 'static/l_[name]_[contenthash:7].js' : 'l_[name]_dev.js',
      chunkFilename: env.production ? 'static/l_[name]_[contenthash:7].js' : 'l_[name]_dev.js',
    },
    target: ['web', 'es5'],
    resolve: {
      alias: {
        'triage-polyfills': './polyfills-legacy.js',
      },
    },
  }, compileDependencies());

  // Must be used together with an app config to work correctly.
  const staticPagesConfigPatch = merge(
    {
      plugins: [
        new CopyPlugin({
          patterns: [
            { from: '../assets/favicon.ico', to: 'favicon.ico' },
            { from: '../assets/icon-white.png', to: 'icon-white.png' },
            { from: '../assets/emoji/', to: 'static/emoji/' },
          ],
        }),
        new HtmlPlugin({
          chunks: ['polyfills', 'app'],
          template: './index.html',
          title: 'üWave',
          scriptLoading: 'defer',
          loadingScreen: (...args) => renderLoadingScreen(...args),
        }),
        new HtmlPlugin({
          chunks: ['polyfills', 'passwordReset'],
          template: './password-reset.html',
          filename: 'password-reset.html',
          title: 'Reset Password',
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
    target: 'node12',
  });

  let activeAppConfig = appConfig;
  if (watch) {
    // The `hmrConfigPatch` comes first so the hmr entry points are ran first.
    activeAppConfig = merge(hmrConfigPatch, activeAppConfig);
  }
  if (profiling) {
    activeAppConfig = merge(appConfig, {
      resolve: {
        alias: {
          'react-dom': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        },
      },
    });
  }
  if (env.production) {
    activeAppConfig = merge(activeAppConfig, productionConfigPatch);
  }
  if (!dualBundles) {
    // activeAppConfig = merge(activeAppConfig, legacyConfigPatch);
  }
  if (demo) {
    activeAppConfig = merge(activeAppConfig, demoConfigPatch);
  }

  let siteConfig = merge(activeAppConfig, staticPagesConfigPatch);
  if (analyze) {
    siteConfig = merge(siteConfig, getAnalysisConfig(analyze));
  }

  unused(loadingScreenConfig);

  const configs = [npmConfig, siteConfig];

  if (dualBundles) {
    const legacyAppConfig = merge(activeAppConfig, legacyConfigPatch);

    configs.push(legacyAppConfig);
  }
  return configs;
}

export default getConfig;
