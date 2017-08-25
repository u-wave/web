const Buffer = require('buffer').Buffer;
const env = require('gulp-util').env;
const concat = require('concat-stream');
const explain = require('explain-error');
const ytSource = require('u-wave-source-youtube');
const scSource = require('u-wave-source-soundcloud');
const recaptchaTestKeys = require('recaptcha-test-keys');
const express = require('express');
const config = require('./dev-server-config.json');
const mailDebug = require('debug')('uwave:mail');

function tryRequire(file, message) {
  try {
    // eslint-disable-next-line import/no-dynamic-require
    const mod = require(file);
    return mod.default || mod;
  } catch (e) {
    throw explain(e, message);
  }
}

function loadDevModules() {
  require('babel-register');
  const uwave = tryRequire('u-wave-core/src/index.js',
    'Could not find the u-wave core module. Did you run `npm install u-wave-core`?'
  );
  const createWebApi = tryRequire('u-wave-api-v1/src/index.js',
    'Could not find the u-wave API module. Did you run `npm install u-wave-api-v1`?'
  );

  return { uwave, createWebApi };
}

function loadProdModules() {
  const uwave = tryRequire('u-wave-core',
    'Could not find the u-wave core module. Did you run `npm install u-wave-core`?'
  );
  const createWebApi = tryRequire('u-wave-api-v1',
    'Could not find the u-wave API module. Did you run `npm install u-wave-api-v1`?'
  );

  return { uwave, createWebApi };
}

/**
 * üWave API development server.
 */
function start() {
  const port = env.port || 6042;
  const watch = env.watch || false;

  const modules = watch ? loadDevModules() : loadProdModules();
  const uwave = modules.uwave;
  const createWebApi = modules.createWebApi;

  const uw = uwave(config);

  uw.on('mongoError', (err) => {
    throw explain(err, 'Could not connect to MongoDB. Is it installed and running?');
  });

  uw.on('redisError', (err) => {
    throw explain(err, 'Could not connect to the Redis server. Is it installed and running?');
  });

  uw.source('youtube', ytSource, config.sources.youtube);
  uw.source('soundcloud', scSource, config.sources.soundcloud);

  const app = express();
  const server = app.listen(port);

  const apiUrl = '/v1';

  app.use(apiUrl, createWebApi(uw, {
    recaptcha: { secret: recaptchaTestKeys.secret },
    server,
    secret: Buffer.from('none', 'utf8'),
    mailTransport: {
      name: 'test',
      version: '0.0.0',
      send(mail, callback) {
        mail.message.createReadStream().pipe(concat((message) => {
          mailDebug(mail.message.getEnvelope().to, message.toString('utf8'));
          callback(null, {
            envelope: mail.message.getEnvelope(),
            messageId: mail.message.messageId()
          });
        }));
      }
    }
  }));

  return app;
}

start();
