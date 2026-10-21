import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import yauzl from 'yauzl';
import svgDir from './index.mjs';

const dirname = import.meta.dirname;
const zipFile = path.join(dirname, 'twemoji.zip');

const response = await fetch('https://github.com/jdecked/twemoji/archive/refs/heads/main.zip');
if (!response.ok) {
  throw new Error(`${response.status} ${response.statusText}`);
}

await pipeline(
  Readable.fromWeb(response.body),
  fs.createWriteStream(zipFile),
);

// Refresh the whole thing
await fs.promises.rm(svgDir, { recursive: true, force: true });
await fs.promises.mkdir(svgDir, { recursive: true });

const zip = await yauzl.openPromise(zipFile);
let count = 0;
for await (const entry of zip.eachEntry()) {
  if (entry.fileName.startsWith('twemoji-main/assets/svg/')) {
    await pipeline(
      await zip.openReadStreamPromise(entry),
      fs.createWriteStream(path.join(svgDir, path.basename(entry.fileName))),
    );
    count += 1;
  }
}

console.log('Extracted', count, 'emojis');
