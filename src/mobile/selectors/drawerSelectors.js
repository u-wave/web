import { createSelector } from 'reselect';

const baseSelector = state => state.mobile;

export const drawerIsOpenSelector = createSelector(
  baseSelector,
  base => base.drawer,
);

export const usersDrawerIsOpenSelector = createSelector(
  baseSelector,
  base => base.usersDrawer,
);
