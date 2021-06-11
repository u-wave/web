import 'make-promises-safe';
import chalk from 'chalk';
import emojione from 'u-wave-web-emojione';
import recaptchaTestKeys from 'recaptcha-test-keys';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import env from './env.mjs';

function waitForBuild(devMiddleware) {
  return (req, res, next) => {
    devMiddleware.waitUntilValid(() => {
      next();
    });
  };
}

async function serve(done) {
  const port = env.port || 6041;
  const serverPort = env.serverPort || 6042;
  const watch = env.watch || false;

  console.log(chalk.grey('client'), `starting on port ${port}`);

  const { default: getConfig } = await import('../webpack.config.mjs')
  const wpConfig = getConfig({ production: !watch }, {
    watch,
  });
  const { default: createWebClient } = await import('../src/middleware/index.js');

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
        basePath: new URL('../npm/public', import.meta.url).pathname,
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
      path: '/__webpack_hmr',
    }));

    dev.waitUntilValid(() => {
      console.log(chalk.grey('client'), 'ready');
      done();
    });
  } else {
    const webClient = createWebClient({
      apiUrl,
      socketUrl,
      emoji: emojione.emoji,
      basePath: new URL('../npm/public', import.meta.url).pathname,
      recaptcha: { key: recaptchaTestKeys.sitekey },
    });

    app.use(webClient);
    console.log(chalk.grey('client'), 'ready');
    done();
  }
}

serve((error) => {
  if (error) {
    console.error(error.stack);
    process.exit(1);
  }
});
