require('loud-rejection/register');
const gulp = require('gulp');
const env = require('gulp-util').env;
const emojione = require('u-wave-web-emojione');
const ytSource = require('u-wave-source-youtube');
const scSource = require('u-wave-source-soundcloud');
const express = require('express');
const Buffer = require('buffer').Buffer;
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const wpConfig = require('../webpack.config');
const config = require('./dev-server-config.json');

function tryRequire(file, message) {
  try {
    // eslint-disable-next-line import/no-dynamic-require
    const mod = require(file);
    return mod.default || mod;
  } catch (e) {
    e.message = `${message}\n"${file}" threw: ${e.message}`;
    throw e;
  }
}

gulp.task('serve', () => {
  const port = env.port || config.port;
  const watch = env.watch || false;

  const uwave = tryRequire('u-wave-core',
    'Could not find the u-wave core module. Did you run `npm install u-wave-core`?'
  );
  const createWebApi = tryRequire('u-wave-api-v1',
    'Could not find the u-wave API module. Did you run `npm install u-wave-api-v1`?'
  );
  const createWebClient = tryRequire('../lib/middleware',
    'Could not find the client middleware. Did you run `npm run build`?'
  );

  const uw = uwave(config);

  uw.source('youtube', ytSource, config.sources.youtube);
  uw.source('soundcloud', scSource, config.sources.soundcloud);

  const app = express();
  const server = app.listen(port);

  const apiUrl = '/v1';

  app
    .use(apiUrl, createWebApi(uw, {
      recaptcha: false,
      server,
      secret: new Buffer('none', 'utf8')
    }))
    .use('/assets/emoji/', emojione.middleware());

  if (watch) {
    wpConfig.entry.app = [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client'
    ].concat(wpConfig.entry.app);
    wpConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
    const compiler = webpack(wpConfig);
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: '/'
    }));
    app.use(webpackHotMiddleware(compiler, {
      log: require('gulp-util').log,
      path: '/__webpack_hmr'
    }));
  }

  app.use(createWebClient(uw, {
    apiUrl,
    emoji: emojione.emoji
  }));

  uw.on('stopped', () => {
    process.exit(0);
  });
});
