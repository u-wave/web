import { createSelector } from 'reselect';
import { reCaptchaSiteKeySelector } from './configSelectors';
import { volumeSelector } from './settingSelectors';
import { supportsSocialAuthSelector } from './userSelectors';

/** @param {import('../redux/configureStore').StoreState} state */
const baseSelector = (state) => state.dialogs;

const merge = (dialog) => ({ ...dialog.payload, open: dialog.open });

export const loginDialogSelector = createSelector(
  baseSelector,
  reCaptchaSiteKeySelector,
  supportsSocialAuthSelector,
  (dialogs, siteKey, supportsSocialAuth) => Object.assign(merge(dialogs.login), {
    useReCaptcha: !!siteKey,
    reCaptchaSiteKey: siteKey ?? null,
    supportsSocialAuth,
  }),
);

export const editMediaDialogSelector = createSelector(
  baseSelector,
  (dialogs) => merge(dialogs.editMedia),
);

export const previewMediaDialogSelector = createSelector(
  baseSelector,
  volumeSelector,
  (dialogs, volume) => ({
    ...merge(dialogs.previewMedia),
    volume,
  }),
);

export const isPreviewMediaDialogOpenSelector = createSelector(
  baseSelector,
  (dialogs) => dialogs.previewMedia && !!dialogs.previewMedia.open,
);
