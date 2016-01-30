import router from 'router';
import serveStatic from 'serve-static';

export default function uwaveWebClient(basePath = __dirname) {
  return router()
    .use(serveStatic(basePath));
}
