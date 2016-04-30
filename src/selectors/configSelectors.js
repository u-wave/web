import { createSelector } from 'reselect';

export const configSelector = state => state.config;

export const requestOptionsSelector = createSelector(
  configSelector,
  config => {
    const options = {};
    if (config.apiUrl) {
      options.apiUrl = config.apiUrl;
    }
    return options;
  }
);

export const availableEmojiImagesSelector = createSelector(
  configSelector,
  config => config.emoji
);

export const availableEmojiNamesSelector = createSelector(
  availableEmojiImagesSelector,
  emoji => Object.keys(emoji)
);
