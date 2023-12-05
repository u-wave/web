import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert';
import pMap from 'p-map';
import serveStatic from 'serve-static';

const emojibaseShortcodesPath = new URL('../node_modules/emojibase-data/en/shortcodes/emojibase.json', import.meta.url);
const joypixelShortcodesPath = new URL('../node_modules/emojibase-data/en/shortcodes/joypixels.json', import.meta.url);
const twemojiDir = new URL('../node_modules/twemoji-emojis/vendor/svg/', import.meta.url);

/**
 * Collect twemoji images, determine their shortcodes, build a map of shortcode to file names.
 *
 * Images are output in the build.
 * Joypixels shortcodes are used if available: this is for backwards compatibility. Emojibase shortcodes
 * are used for emoji that do not have a Joypixel shortcode.
 * The mapping of shortcodes to file names can be imported by JS as `virtual:emoji-shortcodes`.
 */
export default function emojiPlugin () {
  let shortcodeToOutName;
  const filesToEmit = new Map();

  return {
    name: 'emoji',
    async configureServer (server) {
      server.middlewares.use(serveStatic(fileURLToPath(twemojiDir)));
    },
    async buildStart () {
      const emojibaseShortcodes = JSON.parse(await fs.readFile(emojibaseShortcodesPath, { encoding: 'utf8' }));
      const joypixelShortcodes = JSON.parse(await fs.readFile(joypixelShortcodesPath, { encoding: 'utf8' }));

      const twemojis = await fs.readdir(twemojiDir);
      const twemojiNames = twemojis.map((basename) => basename.replace(/\.\w+$/, ''));

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

      if (this.meta.watchMode) {
        shortcodeToOutName = Object.entries(shortcodes);
      } else {
        shortcodeToOutName = await pMap(Object.entries(shortcodes), async ([shortcode, filename]) => {
          const bytes = await fs.readFile(new URL(filename, twemojiDir));
          const hash = crypto.createHash('sha1').update(bytes).digest('hex').slice(0, 7);
          const outName = `${hash}.svg`;
          if (filesToEmit.has(outName)) {
            assert(filesToEmit.get(outName).equals(bytes));
          } else {
            filesToEmit.set(outName, bytes);
          }
          return [shortcode, outName];
        });
      }
    },
    async generateBundle () {
      for (const [outName, bytes] of filesToEmit) {
        this.emitFile({
          type: 'asset',
          fileName: `static/emoji/${outName}`,
          source: bytes,
        });
      }
    },
    async resolveId (id) {
      if (id === 'virtual:emoji-shortcodes') {
        return '\0virtual:emoji-shortcodes'
      }
    },
    async load (id) {
      if (id === '\0virtual:emoji-shortcodes') {
        return `export default JSON.parse(${
          JSON.stringify(JSON.stringify(Object.fromEntries(shortcodeToOutName)))
        })`;
      }
    },
  }
}
