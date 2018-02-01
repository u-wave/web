import path from 'path';
import defaultFs from 'fs';
import hstream from 'hstream';
import router from 'router';
import serveStatic from 'connect-gzip-static';

export default function uwaveWebClient(uw, options = {}) {
  const {
    basePath = path.join(__dirname, '../public'),
    fs = defaultFs, // Should only be used by the dev server.
    title = 'üWave',
    ...clientOptions
  } = options;

  const clientRouter = router();

  return clientRouter
    .get('/', (req, res) => {
      const transform = hstream({
        title,
        '#u-wave-config': JSON.stringify(clientOptions)
      });

      fs.createReadStream(path.join(basePath, 'index.html'), 'utf8')
        .pipe(transform)
        .pipe(res);
    })
    .get('/reset/:key', (req, res) => {
      const transform = hstream({
        title,
        '#u-wave-config': JSON.stringify({ apiUrl: clientOptions.apiUrl }),
        '#reset-data': req.params.key
      });

      fs.createReadStream(path.join(basePath, 'password-reset.html'), 'utf8')
        .pipe(transform)
        .pipe(res);
    })
    .get('/u-wave-web-config.json', (req, res) => {
      res.json(clientOptions);
    })
    .use(serveStatic(basePath));
}
