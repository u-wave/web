/* eslint-disable global-require */
require('loud-rejection/register');
const gulp = require('gulp');
const { colors, env, log } = require('gulp-util');
const emojione = require('u-wave-web-emojione');
const recaptchaTestKeys = require('recaptcha-test-keys');
const express = require('express');
const proxy = require('http-proxy-middleware');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const nodemon = require('nodemon');
const explain = require('explain-error');

function tryResolve(file, message) {
  try {
    // eslint-disable-next-line import/no-dynamic-require
    return require.resolve(file);
  } catch (e) {
    throw explain(e, message);
  }
}

function clearLine() {
  process.stdout.write('\x1B[2K\x1B[1G');
}

const devServerTask = (done) => {
  const serverPort = env.serverPort || 6042;

  const apiDevServer = tryResolve(
    'u-wave-http-api/dev/u-wave-api-dev-server',
    'Could not find the u-wave HTTP API module. Did you run `npm link u-wave-http-api`?',
  );
  const monitor = nodemon({
    script: apiDevServer,
    args: ['--port', String(serverPort), '--watch'],
    verbose: true,
  });

  monitor.once('start', done);
  monitor.on('log', (msg) => {
    clearLine();
    log(colors.grey('apiServer'), msg.colour);
  });
};

const apiServerTask = () => {
  const apiDevServer = tryResolve(
    'u-wave-http-api/dev/u-wave-api-dev-server',
    'Could not find the u-wave HTTP API module. Did you run `npm link u-wave-http-api`?',
  );

  require(apiDevServer); // eslint-disable-line import/no-dynamic-require
};

function apiServer(done) {
  if (env.watch) {
    devServerTask(done);
  } else {
    apiServerTask();
    done();
  }
}

function serve(done) {
  const port = env.port || 6041;
  const serverPort = env.serverPort || 6042;
  const watch = env.watch || false;

  const wpConfig = require('../webpack.config');
  const createWebClient = require('../src/middleware').default;

  const app = express();
  app.listen(port);

  const apiUrl = '/api';
  const socketUrl = `ws://localhost:${serverPort}`;

  app.use(apiUrl, proxy({ target: `http://localhost:${serverPort}/` }));
  app.use('/assets/emoji/', emojione.middleware());

  if (watch) {
    Object.keys(wpConfig.entry).forEach((chunk) => {
      const entry = wpConfig.entry[chunk];
      if (Array.isArray(entry)) {
        wpConfig.entry[chunk].unshift('webpack-hot-middleware/client');
      } else {
        wpConfig.entry[chunk] = [
          'webpack-hot-middleware/client',
          wpConfig.entry[chunk],
        ];
      }
    });

    wpConfig.entry.app.unshift('react-hot-loader/patch');
    wpConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    const compiler = webpack(wpConfig);
    const dev = webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: '/',
      serverSideRender: true,
    });

    // Delay responding to HTTP requests until the first build is complete.
    app.use((req, res, next) => {
      dev.waitUntilValid(() => {
        next();
      });
    });

    app.use(createWebClient(null, {
      apiUrl,
      socketUrl,
      emoji: emojione.emoji,
      title: 'üWave (Development)',
      publicPath: '/',
      // Point u-wave-web middleware to the virtual webpack filesystem.
      fs: dev.fileSystem,
      recaptcha: { key: recaptchaTestKeys.sitekey },
    }));

    app.use(dev);
    app.use(webpackHotMiddleware(compiler, {
      log,
      path: '/__webpack_hmr',
    }));

    dev.waitUntilValid(() => {
      done();
    });
  } else {
    app.use(createWebClient(null, {
      apiUrl,
      socketUrl,
      emoji: emojione.emoji,
      recaptcha: { key: recaptchaTestKeys.sitekey },
    }));
    done();
  }
}

// pass --no-api to use an already running API server (on `localhost:${--server-port}`).
exports.serve = env.api !== false
  ? gulp.series(apiServer, serve)
  : serve;
