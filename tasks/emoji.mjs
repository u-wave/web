/**
 * Create emoji image files in public/static/emoji.
 * vite will copy these to the /static/emoji folder in the build output.
 * TODO this could maybe be a webpack plugin? we need to be able to generate
 * a file with shortcode to filename mappings that we can import in the web client code.
 */
import crypto from 'crypto';
import fs from 'fs/promises';
import pMap from 'p-map';

const emojibaseShortcodesPath = new URL('../node_modules/emojibase-data/en/shortcodes/emojibase.json', import.meta.url);
const emojibaseShortcodes = JSON.parse(await fs.readFile(emojibaseShortcodesPath, { encoding: 'utf8' }));

const joypixelShortcodesPath = new URL('../node_modules/emojibase-data/en/shortcodes/joypixels.json', import.meta.url);
const joypixelShortcodes = JSON.parse(await fs.readFile(joypixelShortcodesPath, { encoding: 'utf8' }));

const twemojiDir = new URL('../node_modules/twemoji-emojis/vendor/svg/', import.meta.url);
const twemojis = await fs.readdir(twemojiDir);
const twemojiNames = twemojis.map((basename) => basename.replace(/\.\w+$/, ''));

const outputDir = new URL('../public/static/emoji/', import.meta.url);

const shortcodes = {};
function appendShortcode(hex, shortcode) {
  const imageName = `${hex.toLowerCase()}.svg`
  if (Array.isArray(shortcode)) {
    for (const c of shortcode) {
      shortcodes[c] = imageName;
    }
  } else {
    shortcodes[shortcode] = imageName;
  }
}

// Not all emoji have a joypixel shortcode. Track which ones are left over so
// we can use a different shortcode for those.
const remainingTwemoji = new Set(twemojiNames);
for (const [hex, shortcode] of Object.entries(joypixelShortcodes)) {
  if (!twemojiNames.includes(hex.toLowerCase())) {
    continue;
  }

  appendShortcode(hex, shortcode);
  remainingTwemoji.delete(hex.toLowerCase());
}

for (const hex of remainingTwemoji) {
  const shortcode = emojibaseShortcodes[hex.toUpperCase()];
  if (!shortcode) {
    continue;
  }

  appendShortcode(hex, shortcode);
}

console.log('generating', Object.keys(shortcodes).length, 'emoji...');

await fs.rm(outputDir, { force: true, recursive: true });
await fs.mkdir(outputDir, { recursive: true });
const shortcodeHashes = Object.fromEntries(
  await pMap(Object.entries(shortcodes), async ([shortcode, filename]) => {
    const bytes = await fs.readFile(new URL(filename, twemojiDir));
    const hash = crypto.createHash('sha1').update(bytes).digest('hex').slice(0, 7);
    const outName = `${hash}.svg`;
    await fs.writeFile(new URL(outName, outputDir), bytes);
    return [shortcode, outName];
  }),
);
await fs.writeFile(new URL('../src/utils/emojiShortcodes.js', import.meta.url), `
// GENERATED FILE: run \`npm run emoji\`
/* eslint-disable */
export default JSON.parse(${JSON.stringify(JSON.stringify(shortcodeHashes))});
`.trim());
