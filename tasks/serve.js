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
const env = require('./env');

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
    logProvider: () => ({
      log: log,
      debug: log,
      info: log.info,
      warn: log.warn,
      error: log.error,
    }),
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

serve((error) => {
  if (error) {
    console.error(error.stack);
    process.exit(1);
  }
});
