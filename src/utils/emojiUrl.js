// URL, relative to the web client, where emoji can be found.
const CUSTOM_EMOJI_BASE_PATH = '/assets/emoji/';
const BUILTIN_EMOJI_BASE_PATH = '/static/emoji/';

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
 * @param {boolean} isCustom
 */
function emojiUrl(filenameOrUrl, isCustom) {
  const basePath = isCustom ? CUSTOM_EMOJI_BASE_PATH : BUILTIN_EMOJI_BASE_PATH;
  const baseUrl = new URL(basePath, window.location.href);
  return new URL(filenameOrUrl, baseUrl);
}

export default emojiUrl;
