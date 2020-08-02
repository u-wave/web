/* eslint-disable global-require */
require('loud-rejection/register');
const { once } = require('events');
const { promisify } = require('util');
const path = require('path');
const log = require('fancy-log');
const chalk = require('chalk');
const emojione = require('u-wave-web-emojione');
const recaptchaTestKeys = require('recaptcha-test-keys');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware').default;
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

function devServerTask() {
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

  monitor.on('log', (msg) => {
    clearLine();
    log(chalk.grey('apiServer'), msg.colour);
  });

  return once(monitor, 'start');
}

function apiServerTask() {
  const apiDevServer = tryResolve(
    'u-wave-http-api/dev/u-wave-api-dev-server',
    'Could not find the u-wave HTTP API module. Did you run `npm link u-wave-http-api`?',
  );

  require(apiDevServer); // eslint-disable-line import/no-dynamic-require
}

async function apiServer() {
  if (env.watch) {
    log(chalk.grey('apiServer'), 'starting in watch mode');
    await devServerTask();
  } else {
    log(chalk.grey('apiServer'), 'starting');
    apiServerTask();
  }
}

function waitForBuild(devMiddleware) {
  return (req, res, next) => {
    devMiddleware.waitUntilValid(() => {
      next();
    });
  };
}

function clientServer(done) {
  const port = env.port || 6041;
  const serverPort = env.serverPort || 6042;
  const watch = env.watch || false;

  log(chalk.grey('client'), `starting on port ${port}`);

  const wpConfig = require('../webpack.config')({ production: !watch }, {
    watch,
  });
  const createWebClient = require('../src/middleware').default;

  const app = express();
  app.listen(port);

  const apiUrl = '/api';
  const socketUrl = `ws://localhost:${serverPort}`;

  app.use(apiUrl, createProxyMiddleware({
    target: process.env.SERVER_URL || `http://localhost:${serverPort}/`,
  }));
  app.use('/assets/emoji/', emojione.middleware());

  if (watch) {
    const compiler = webpack(wpConfig);
    const dev = webpackDevMiddleware(compiler, {
      serverSideRender: true,
    });

    let webClient = (req, res, next) => next(new Error('Build not complete'));
    dev.waitUntilValid(() => {
      webClient = createWebClient({
        apiUrl,
        socketUrl,
        emoji: emojione.emoji,
        title: 'üWave (Development)',
        basePath: path.join(__dirname, '../packages/u-wave-web-middleware/public'),
        publicPath: '/',
        // Point u-wave-web middleware to the virtual webpack filesystem.
        fs: dev.context.outputFileSystem,
        recaptcha: { key: recaptchaTestKeys.sitekey },
      });
    });

    // Delay responding to HTTP requests until the first build is complete.
    app.use(waitForBuild(dev));
    app.use((req, res, next) => webClient(req, res, next));
    app.use(dev);
    app.use(webpackHotMiddleware(compiler, {
      log,
      path: '/__webpack_hmr',
    }));

    dev.waitUntilValid(() => {
      log(chalk.grey('client'), 'ready');
      done();
    });
  } else {
    const webClient = createWebClient({
      apiUrl,
      socketUrl,
      emoji: emojione.emoji,
      basePath: path.join(__dirname, '../packages/u-wave-web-middleware/public'),
      recaptcha: { key: recaptchaTestKeys.sitekey },
    });

    app.use(webClient);
    log(chalk.grey('client'), 'ready');
    done();
  }
}

// pass --no-api to use an already running API server (on `localhost:${--server-port}`).
async function serve() {
  if (env.api !== false) {
    await apiServer();
  }

  return promisify(clientServer)();
}

exports.serve = serve;
