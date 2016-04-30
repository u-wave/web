import 'loud-rejection/register';
import express from 'express';
import { Buffer } from 'buffer';

import config from './dev-server-config.json';

function tryRequire(path, message) {
  try {
    const mod = require(path);
    return mod.default || mod;
  } catch (e) {
    e.message = `${message}\n"${path}" threw: ${e.message}`;
    throw e;
  }
}

export default function serveTask({ port = config.port }) {
  const uwave = tryRequire('u-wave-core',
    'Could not find the u-wave core module. Did you run `npm install u-wave-core`?'
  );
  const createWebApi = tryRequire('u-wave-api-v1',
    'Could not find the u-wave API module. Did you run `npm install u-wave-api-v1`?'
  );
  const createWebClient = tryRequire('../lib/middleware',
    'Could not find the client middleware. Did you run `gulp middleware`?'
  );

  let emoji = {};
  try {
    emoji = require('../lib/emoji.json');
  } catch (e) {
    console.warn('No precompiled Emoji set found: emoji disabled.');
    console.warn('To enable emoji on the dev server, run `gulp assets`.');
  }

  const ytSource = require('u-wave-source-youtube');
  const scSource = require('u-wave-source-soundcloud');

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
    .use(createWebClient(uw, {
      apiUrl,
      emoji
    }));

  uw.on('stopped', () => {
    process.exit(0);
  });
}
