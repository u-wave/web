import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';

export const configSelector = state => state.config;

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
  config => config.emoji || {},
);

export const availableEmojiNamesSelector = createSelector(
  availableEmojiImagesSelector,
  emoji => Object.keys(emoji),
);

const reCaptchaSelector = createSelector(
  configSelector,
  config => config.recaptcha,
);

export const reCaptchaSiteKeySelector = createSelector(
  reCaptchaSelector,
  rc => (rc ? rc.key : false),
);

export const rolesSelector = createSelector(
  configSelector,
  config => config.roles,
);

export const roleSelector = memoize(roleName => createSelector(
  rolesSelector,
  roles => roles[roleName],
));
