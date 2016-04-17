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

export default function serveTask({ port = config.server.port }) {
  const uwave = tryRequire('u-wave-core',
    'Could not find the u-wave core module. Did you run `npm install u-wave-core`?'
  );
  const createWebApi = tryRequire('u-wave-api-v1',
    'Could not find the u-wave API module. Did you run `npm install u-wave-api-v1`?'
  );
  const createWebClient = tryRequire('../lib/middleware',
    'Could not find the client middleware. Did you run `gulp middleware`?'
  );

  const uw = uwave(config);

  const app = express();
  const server = app.listen(port);

  app
    .use('/v1', createWebApi(uw, {
      server,
      secret: new Buffer('none', 'utf8')
    }))
    .use(createWebClient(uw, {}));

  uw.on('stopped', () => {
    process.exit(0);
  });
}
