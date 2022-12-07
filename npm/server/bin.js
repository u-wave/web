#!/usr/bin/env node
/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import serveStatic from 'serve-static';
import minimist from 'minimist';
import envSchema from 'env-schema';
import createWebClient from './middleware.js';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const argv = minimist(process.argv.slice(2));

if (argv.h || argv.help) {
  console.log('u-wave-web');
  console.log('Version', pkg.version);
  console.log();
  console.log('Environment Variables:');
  console.log('  PORT');
  console.log('    Port to listen on. Defaults to 6041.');
  console.log('  CLIENT_TITLE');
  console.log('    Name to use in the <title> HTML element. Defaults to "üWave".');
  console.log('  API_URL');
  console.log('    Public URL of the üWave HTTP API to connect to. Defaults to "/api".');
  console.log('  SOCKET_URL');
  console.log('    Public URL of the üWave WebSocket API to connect to. Defaults to "/".');
  console.log();
  console.log('  RECAPTCHA_KEY [optional]');
  console.log('    ReCaptcha site key to confirm new registrations.');
  console.log('    The secret key must also be configured on the server side.');
  console.log('  EMOJI_DIR [optional]');
  console.log('    A directory with image files to use as custom emoji.');
  console.log('    File names are used as shortcodes. For example, smile.png');
  console.log('    will be available as :smile:.');
  console.log();
  process.exit(0);
}

const config = envSchema({
  schema: {
    type: 'object',
    properties: {
      PORT: {
        type: 'number',
        default: 6041,
      },
      API_URL: {
        type: 'string',
        default: '/api',
      },
      SOCKET_URL: {
        type: 'string',
        default: '/',
      },
      CLIENT_TITLE: {
        type: 'string',
        default: 'üWave',
      },
      RECAPTCHA_KEY: {
        type: 'string',
      },
    },
  },
});

const app = express();

const customEmoji = {};
if (process.env.EMOJI_DIR) {
  fs.readdirSync(process.env.EMOJI_DIR).forEach((filename) => {
    const { name } = path.parse(filename);
    customEmoji[name] = filename;
  });

  app.use('/assets/emoji', serveStatic(process.env.EMOJI_DIR));
}

app.use(createWebClient({
  apiUrl: config.API_URL,
  socketUrl: config.SOCKET_URL,
  title: config.CLIENT_TITLE,
  recaptcha: config.RECAPTCHA_KEY ? {
    key: config.RECAPTCHA_KEY,
  } : null,
  emoji: customEmoji,
}));

const server = app.listen(config.PORT, () => {
  const { port, address } = server.address();
  console.log(`Listening on ${address}:${port}`);
});
