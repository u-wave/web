import 'make-promises-safe';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import recaptchaTestKeys from 'recaptcha-test-keys';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import env from './env.mjs';
import getConfig from '../webpack.config.mjs';

const CLIENT_TAG = '\x1B[90mclient\x1B[39m';

function waitForBuild(devMiddleware) {
  return (req, res, next) => {
    devMiddleware.waitUntilValid(() => {
      next();
    });
  };
}

const port = env.port || 6041;
const serverPort = env.serverPort || 6042;
const watch = env.watch || false;

console.log(CLIENT_TAG, `starting on port ${port}`);

const wpConfig = getConfig({ production: !watch }, {
  watch,
});

const require = createRequire(import.meta.url);
const { default: register } = require('@babel/register');
register({
  plugins: ['@babel/plugin-transform-modules-commonjs'],
});
const createWebClient = require('../src/middleware').default;

const app = express();
app.listen(port);

const serverUrl = new URL(process.env.SERVER_URL || `http://localhost:${serverPort}/`);

const apiUrl = '/api';
const socketUrl = Object.assign(new URL(serverUrl.href), { protocol: 'ws:' }).href;

app.use(apiUrl, createProxyMiddleware({
  target: serverUrl.href,
}));

if (watch) {
  const compiler = webpack(wpConfig);
  const dev = webpackDevMiddleware(compiler, {
    serverSideRender: true,
    outputFileSystem: {
      ...fs,
      join: path.join,
      mkdirp: (dirPath, cb) => fs.mkdir(dirPath, { recursive: true }, cb),
    },
  });

  let webClient = (req, res, next) => next(new Error('Build not complete'));
  const valid = new Promise((resolve) => dev.waitUntilValid(() => {
    webClient = createWebClient({
      apiUrl,
      socketUrl,
      title: 'üWave (Development)',
      basePath: fileURLToPath(new URL('../npm/public/', import.meta.url)),
      publicPath: '/',
      // Point u-wave-web middleware to the virtual webpack filesystem.
      fs: dev.context.outputFileSystem,
      recaptcha: { key: recaptchaTestKeys.sitekey },
    });
    resolve();
  }));

  // Delay responding to HTTP requests until the first build is complete.
  app.use(waitForBuild(dev));
  app.use((req, res, next) => webClient(req, res, next));
  app.use(dev);
  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
  }));

  await valid;
  console.log(CLIENT_TAG, 'ready');
} else {
  const webClient = createWebClient({
    apiUrl,
    socketUrl,
    basePath: fileURLToPath(new URL('../npm/public/', import.meta.url)),
    recaptcha: { key: recaptchaTestKeys.sitekey },
  });

  app.use(webClient);
  console.log(CLIENT_TAG, 'ready');
}
