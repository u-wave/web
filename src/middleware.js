import { createReadStream } from 'fs';
import { join as joinPath } from 'path';

function express() {
  try {
    return require('express');
  } catch (e) {
    throw new Error('Could not find express');
  }
}

export default function uwaveWebClient(basePath = __dirname) {
  const createRouter = express().Router;
  return createRouter()
    .get('/', (req, res) => {
      createReadStream(joinPath(basePath, './index.html')).pipe(res);
    })
    .use(express().static(basePath));
}
