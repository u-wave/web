import { load as loadHtml } from 'cheerio';
import * as path from 'path';
import { readFile } from 'fs';
import router from 'router';
import serveStatic from 'serve-static';

function injectConfig(html, config) {
  const $ = loadHtml(html);
  $('#u-wave-config').text(JSON.stringify(config));
  return $.html();
}

export default function uwaveWebClient(uw, options = {}) {
  const {
    basePath = __dirname,
    ...clientOptions
  } = options;

  return router()
    .get('/', (req, res, next) => {
      readFile(path.join(basePath, 'index.html'), 'utf8', (err, content) => {
        if (err) {
          next();
          return;
        }
        res.end(injectConfig(content, clientOptions));
      });
    })
    .use(serveStatic(basePath));
}
