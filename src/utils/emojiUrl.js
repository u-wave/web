// URL, relative to the web client, where emoji can be found.
const EMOJI_BASE_PATH = '/assets/emoji/';

/**
 * Get the full URL for an emoji.
 *
 * @example
 * emojiUrl('smile.png')
 * // → 'https://demo.u-wave.net/assets/emoji/smile.png'
 * @example
 * emojiUrl('https://example.com/my-emote.png')
 * // → 'https://example.com/my-emote.png'
 *
 * @param {string} filenameOrUrl - The file name for a local emoji or a full URL to a remote one.
 */
function emojiUrl(filenameOrUrl) {
  const dirname = new URL(EMOJI_BASE_PATH, window.location.href);
  return new URL(filenameOrUrl, dirname);
}

export default emojiUrl;
