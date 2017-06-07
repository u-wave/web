import * as path from 'path';
import * as defaultFs from 'fs';
import trumpet from 'trumpet';
import router from 'router';
import serveStatic from 'serve-static';

function injectConfig(config) {
  const transform = trumpet();
  transform.select('#u-wave-config')
    .createWriteStream()
    .end(JSON.stringify(config));
  return transform;
}

export default function uwaveWebClient(uw, options = {}) {
  const {
    basePath = path.join(__dirname, '../public'),
    fs = defaultFs, // Should only be used by the dev server.
    ...clientOptions
  } = options;

  const clientRouter = router();

  return clientRouter
    .get('/', (req, res) => {
      fs.createReadStream(path.join(basePath, 'index.html'), 'utf8')
        .pipe(injectConfig(clientOptions))
        .pipe(res);
    })
    .use(serveStatic(basePath));
}
