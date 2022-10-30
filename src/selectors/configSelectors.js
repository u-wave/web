import { createSelector } from 'reselect';
import defaultEmoji from '../utils/emojiShortcodes';

export const configSelector = (state) => state.config;

export const serverNameSelector = createSelector(configSelector, (config) => {
  return config.name ?? 'üWave';
});
export const serverLogoSelector = createSelector(configSelector, (config) => {
  if (config.logo) {
    const ASSET_BASE_URL = new URL('/assets/', window.location.href);
    return new URL(config.logo.replace(/^\//, ''), ASSET_BASE_URL);
  }
  return null;
});

export const requestOptionsSelector = createSelector(
  configSelector,
  (config) => {
    const options = {};
    if (config.apiUrl) {
      options.apiUrl = config.apiUrl;
    }
    return options;
  },
);

export const availableEmojiImagesSelector = createSelector(
  configSelector,
  (config) => ({ ...defaultEmoji, ...config.emoji }),
);

export const availableEmojiNamesSelector = createSelector(
  availableEmojiImagesSelector,
  (emoji) => new Set(Object.keys(emoji)),
);

// This is slightly hacky: custom emoji will be hosted on
// a different URL so we have to mark them.
// TODO(goto-bus-stop) I think builtins and custom emoji
// should be separated entirely so that we can interpret
// unicode emoji as builtin ones.
export const customEmojiNamesSelector = createSelector(
  configSelector,
  (config) => new Set(Object.keys(config.emoji ?? {})),
);

const reCaptchaSelector = createSelector(
  configSelector,
  (config) => config.recaptcha,
);

export const reCaptchaSiteKeySelector = createSelector(
  reCaptchaSelector,
  (rc) => (rc ? rc.key : false),
);

export const rolesSelector = createSelector(
  configSelector,
  (config) => config.roles,
);

/**
 * Simple memoization function that only supports single-argument, pure functions.
 *
 * @template Argument,ReturnType
 * @param {(arg: Argument) => ReturnType} fn
 * @return {(arg: Argument) => ReturnType}
 */
function memoizePermanently(fn) {
  const cache = new Map();
  return (argument) => {
    if (cache.has(argument)) {
      return cache.get(argument);
    }
    const value = fn(argument);
    cache.set(argument, value);
    return value;
  };
}

export const roleSelector = memoizePermanently((roleName) => createSelector(
  rolesSelector,
  (roles) => roles[roleName],
));

// TODO make this configurable.
export const roleColorsSelector = () => ({
  admin: '#ff3b74',
  manager: '#05daa5',
  moderator: '#00b3dc',
  special: '#fc911d',
  default: '',
});
