import { createSelector } from 'reselect';

export const settingsSelector = state => state.settings;

export const volumeSelector = createSelector(
  settingsSelector,
  settings => settings.volume
);

export const isMutedSelector = createSelector(
  settingsSelector,
  settings => settings.muted
);
