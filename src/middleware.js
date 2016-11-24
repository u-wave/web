import * as path from 'path';
import * as defaultFs from 'fs';
import trumpet from 'trumpet';
import router from 'router';
import serveStatic from 'serve-static';

function injectConfig(config, { pluginsScript, pluginsStyle } = {}) {
  const transform = trumpet();
  transform.select('#u-wave-config')
    .createWriteStream()
    .end(JSON.stringify(config));
  if (pluginsScript) {
    transform.select('#u-wave-plugins').setAttribute('src', pluginsScript);
  }
  if (pluginsStyle) {
    transform.select('#u-wave-plugins-style').setAttribute('href', pluginsStyle);
  }
  return transform;
}

export default function uwaveWebClient(uw, options = {}) {
  const {
    basePath = path.join(__dirname, '../public'),
    pluginsScript = null,
    pluginsScriptFile = null,
    pluginsStyle = null,
    pluginsStyleFile = null,
    fs = defaultFs, // Should only be used by the dev server.
    ...clientOptions
  } = options;

  const pluginsScriptName = 'custom.js';
  const pluginsStyleName = 'custom.css';
  const clientRouter = router();

  if (pluginsScriptFile) {
    clientRouter.get(`/${pluginsScriptName}`, (req, res) => {
      res.writeHeader(200, { 'content-type': 'application/javascript' });
      fs.createReadStream(pluginsScriptFile).pipe(res);
    });
  } else if (pluginsScript) {
    clientRouter.get(`/${pluginsScriptName}`, (req, res) => {
      res.writeHeader(200, { 'content-type': 'application/javascript' });
      res.end(pluginsScript);
    });
  }

  if (pluginsStyleFile) {
    clientRouter.get(`/${pluginsStyleName}`, (req, res) => {
      res.writeHeader(200, { 'content-type': 'text/css' });
      fs.createReadStream(pluginsStyleFile).pipe(res);
    });
  } else if (pluginsStyle) {
    clientRouter.get(`/${pluginsStyleName}`, (req, res) => {
      res.writeHeader(200, { 'content-type': 'text/css' });
      res.end(pluginsStyle);
    });
  }

  return clientRouter
    .get('/', (req, res) => {
      fs.createReadStream(path.join(basePath, 'index.html'), 'utf8')
        .pipe(injectConfig(
          clientOptions,
          {
            pluginsScript: (pluginsScriptFile || pluginsScript) ? pluginsScriptName : null,
            pluginsStyle: (pluginsStyleFile || pluginsStyle) ? pluginsStyleName : null
          }
        ))
        .pipe(res);
    })
    .use(serveStatic(basePath));
}
