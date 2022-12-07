import path from 'path';
import { pathToFileURL } from 'url';
import { pipeline } from 'stream';
import defaultFs from 'fs';
import hstream from 'hstream';
import router from 'router';
import serveStatic from 'serve-static';
import theme from '../theme';

function createManifest({ title }) {
  return {
    name: title,
    short_name: title,
    start_url: '.',
    theme_color: theme.palette.main,
    background_color: '#151515',
    display: 'standalone',
    icons: [{
      type: 'image/png',
      src: '/icon-white.png',
      sizes: '144x144',
    }],
  };
}

const defaultBasePath = path.join(__dirname, '../public/');

export default function uwaveWebClient(options = {}) {
  const {
    basePath = defaultBasePath,
    fs = defaultFs, // Should only be used by the dev server.
    title = 'üWave',
    ...clientOptions
  } = options;

  const indexHtml = new URL('./index.html', pathToFileURL(basePath));
  const passwordResetHtml = new URL('./src/password-reset/index.html', pathToFileURL(basePath));

  const clientRouter = router();
  const manifest = createManifest({ title });

  return clientRouter
    .get('/', (req, res, next) => {
      res.setHeader('content-type', 'text/html');

      // Note we can NOT change how the options injection works without consequence.
      // This middleware explicitly should be forwards compatible with static files
      // within the same major version. That simplifies the upgrade process for users.
      const transform = hstream({
        title,
        '#u-wave-config': JSON.stringify(clientOptions),
      });

      pipeline(fs.createReadStream(indexHtml), transform, res, (err) => {
        if (err) {
          next(err);
        }
      });
    })
    .get('/reset/:key', (req, res, next) => {
      res.setHeader('content-type', 'text/html');

      const transform = hstream({
        title,
        '#u-wave-config': JSON.stringify({ apiUrl: clientOptions.apiUrl }),
        '#reset-data': req.params.key,
      });

      pipeline(fs.createReadStream(passwordResetHtml), transform, res, (err) => {
        if (err) {
          next(err);
        }
      });
    })
    .get('/manifest.json', (req, res) => {
      res.json(manifest);
    })
    .get('/u-wave-web-config.json', (req, res) => {
      res.json(clientOptions);
    })
    .use(serveStatic(basePath));
}
