import { createSelector } from 'reselect';
import baseSelector from './baseSelector';

export const pageSelector = createSelector(
  baseSelector,
  base => base.users.currentPage,
);

export const usersSelector = createSelector(
  baseSelector,
  base => base.users.users,
);

