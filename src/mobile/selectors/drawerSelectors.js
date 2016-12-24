import { createSelector } from 'reselect';

const baseSelector = state => state.mobile;

// eslint-disable-next-line import/prefer-default-export
export const drawerIsOpenSelector = createSelector(baseSelector, base => base.drawer);
