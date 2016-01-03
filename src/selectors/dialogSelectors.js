import assign from 'object-assign';
import { createSelector } from 'reselect';
import { authErrorSelector } from './userSelectors';

const baseSelector = state => state.dialogs;

const merge = dialog => ({ ...dialog.payload, open: dialog.open });

export const loginDialogSelector = createSelector(
  baseSelector,
  authErrorSelector,
  (dialogs, error) => assign(merge(dialogs.login), { error })
);

export const editMediaDialogSelector = createSelector(
  baseSelector,
  dialogs => merge(dialogs.editMedia)
);
