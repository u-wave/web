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
