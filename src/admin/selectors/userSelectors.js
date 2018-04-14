import { createSelector } from 'reselect';
import baseSelector from './baseSelector';

export const pageSizeSelector = () => 25;
export const pageSelector = createSelector(
  baseSelector,
  base => base.users.currentPage,
);
export const totalUsersSelector = createSelector(
  baseSelector,
  base => base.users.totalUsers,
);
export const filterSelector = createSelector(
  baseSelector,
  base => base.users.filter,
);

export const usersSelector = createSelector(
  baseSelector,
  base => base.users.users,
);

