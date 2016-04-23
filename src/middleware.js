import router from 'router';
import serveStatic from 'serve-static';

export default function uwaveWebClient(uw, options = {}) {
  const basePath = options.basePath !== undefined ? options.basePath : __dirname;

  return router()
    .use(serveStatic(basePath));
}
