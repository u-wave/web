import assign from 'object-assign';
import { createSelector } from 'reselect';
import { reCaptchaSiteKeySelector } from './configSelectors';
import { volumeSelector } from './settingSelectors';
import { authErrorSelector } from './userSelectors';

const baseSelector = state => state.dialogs;

const merge = dialog => ({ ...dialog.payload, open: dialog.open });

export const loginDialogSelector = createSelector(
  baseSelector,
  authErrorSelector,
  reCaptchaSiteKeySelector,
  (dialogs, error, siteKey) => assign(merge(dialogs.login), {
    error,
    useReCaptcha: !!siteKey,
    reCaptchaSiteKey: siteKey || null
  })
);

export const editMediaDialogSelector = createSelector(
  baseSelector,
  dialogs => merge(dialogs.editMedia)
);

export const previewMediaDialogSelector = createSelector(
  baseSelector,
  volumeSelector,
  (dialogs, volume) => ({
    ...merge(dialogs.previewMedia),
    volume
  })
);

export const isPreviewMediaDialogOpenSelector = createSelector(
  baseSelector,
  dialogs => dialogs.previewMedia && !!dialogs.previewMedia.open
);
