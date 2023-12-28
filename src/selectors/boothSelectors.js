import { historyIDSelector, isCurrentDJSelector } from '../reducers/booth';
import { currentUserHasRoleSelector } from './userSelectors';

// eslint-disable-next-line import/prefer-default-export
export const canSkipSelector = (state) => {
  const historyID = historyIDSelector(state);
  if (!historyID) {
    return false;
  }

  const hasRole = currentUserHasRoleSelector(state);
  const isCurrentDJ = isCurrentDJSelector(state);
  return isCurrentDJ ? hasRole('booth.skip.self') : hasRole('booth.skip.other');
};
