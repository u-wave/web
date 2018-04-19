/* eslint-disable global-require */
require('loud-rejection/register');
const gulp = require('gulp');
const log = require('fancy-log');
const chalk = require('chalk');
const emojione = require('u-wave-web-emojione');
const recaptchaTestKeys = require('recaptcha-test-keys');
const express = require('express');
const proxy = require('http-proxy-middleware');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const nodemon = require('nodemon');
const explain = require('explain-error');
const env = require('./env');

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
    log(chalk.grey('apiServer'), msg.colour);
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

function addHotReloadingClient(entry) {
  const CLIENT = ['react-hot-loader/patch', 'webpack-hot-middleware/client'];
  if (Array.isArray(entry)) {
    return [...CLIENT, ...entry];
  }
  return [...CLIENT, entry];
}

function waitForBuild(devMiddleware) {
  return (req, res, next) => {
    devMiddleware.waitUntilValid(() => {
      next();
    });
  };
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
      wpConfig.entry[chunk] = addHotReloadingClient(entry);
    });

    wpConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    const compiler = webpack(wpConfig);
    const dev = webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: '/',
      serverSideRender: true,
    });

    const webClient = createWebClient(null, {
      apiUrl,
      socketUrl,
      emoji: emojione.emoji,
      title: 'üWave (Development)',
      publicPath: '/',
      // Point u-wave-web middleware to the virtual webpack filesystem.
      fs: dev.fileSystem,
      recaptcha: { key: recaptchaTestKeys.sitekey },
    });

    // Delay responding to HTTP requests until the first build is complete.
    app.use(waitForBuild(dev));
    app.use(webClient);
    app.use(dev);
    app.use(webpackHotMiddleware(compiler, {
      log,
      path: '/__webpack_hmr',
    }));

    dev.waitUntilValid(() => {
      done();
    });
  } else {
    const webClient = createWebClient(null, {
      apiUrl,
      socketUrl,
      emoji: emojione.emoji,
      recaptcha: { key: recaptchaTestKeys.sitekey },
    });

    app.use(webClient);
    done();
  }
}

// pass --no-api to use an already running API server (on `localhost:${--server-port}`).
exports.serve = env.api !== false
  ? gulp.series(apiServer, serve)
  : serve;
