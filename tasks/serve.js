import conf from './dev-server-config.json';

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

  const server = new UWaveServer(conf);
  const v1 = new UWaveAPI(conf);

  server.on('stopped', () => process.exit(0));
  server.on('started', uwave => {
    v1.registerWSServer(uwave);
  });

  server.registerAPI('/v1', v1.router);

  server.app.use(uwaveClient());

  server.start();
  server.server.listen(port);
}
