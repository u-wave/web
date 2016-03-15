import conf from './dev-server-config.json';
import { readFileSync } from 'fs';
import { join } from 'path';

function tryRequire(path, message) {
  try {
    const mod = require(path);
    return mod.default || mod;
  } catch (e) {
    e.message = `${message}\n"${path}" threw: ${e.message}`;
    throw e;
  }
}

export default function serveTask({ port = conf.server.port }) {
  const uwaveClient = tryRequire('../lib/middleware',
    'Could not find the client middleware. Did you run `gulp middleware`?'
  );
  const UWaveServer = tryRequire('u-wave/lib/server',
    'Could not find the u-wave server module. Did you run `npm install u-wave`?'
  );
  const UWaveAPI = tryRequire('u-wave-api-v1/lib/api',
    'Could not find the u-wave API module. Did you run `npm install u-wave-api-v1`?'
  );

  process.on('unhandledRejection', reason => {
    console.error('Unhandled rejection:');
    throw reason;
  });

  const uw = new UWaveServer(conf);
  const v1 = new UWaveAPI(uw, {
    secret: readFileSync(join(__dirname, './dev-test-secret.txt'))
  });

  uw.on('stopped', () => process.exit(0));

  uw.app
    .use('/v1', v1.router)
    .use(uwaveClient());

  uw.start();
  uw.server.listen(port);
}
