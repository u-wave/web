import { createSelector } from '@reduxjs/toolkit';
import { supportsAuthStrategy } from '../reducers/auth';

export { userListSelector } from '../reducers/users';

export const supportsSocialAuthSelector = createSelector(
  supportsAuthStrategy('google'),
  (...support) => support.some(Boolean),
);
