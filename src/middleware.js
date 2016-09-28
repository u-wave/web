import { load as loadHtml } from 'cheerio';
import * as path from 'path';
import * as fs from 'fs';
import router from 'router';
import serveStatic from 'serve-static';

function injectConfig(html, config, { pluginsScript, pluginsStyle } = {}) {
  const $ = loadHtml(html);
  $('#u-wave-config').text(JSON.stringify(config));
  if (pluginsScript) {
    $('#u-wave-plugins').attr('src', pluginsScript);
  } else {
    $('#u-wave-plugins').remove();
  }
  if (pluginsStyle) {
    $('#u-wave-plugins-style').attr('href', pluginsStyle);
  } else {
    $('#u-wave-plugins-style').remove();
  }
  return $.html();
}

export default function uwaveWebClient(uw, options = {}) {
  const {
    basePath = __dirname,
    pluginsScript = null,
    pluginsScriptFile = null,
    pluginsStyle = null,
    pluginsStyleFile = null,
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
    .get('/', (req, res, next) => {
      fs.readFile(path.join(basePath, 'index.html'), 'utf8', (err, content) => {
        if (err) {
          next();
          return;
        }
        res.end(injectConfig(
          content,
          clientOptions,
          {
            pluginsScript: (pluginsScriptFile || pluginsScript) ? pluginsScriptName : null,
            pluginsStyle: (pluginsStyleFile || pluginsStyle) ? pluginsStyleName : null
          }
        ));
      });
    })
    .use(serveStatic(basePath));
}
