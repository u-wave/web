import { createSelector } from 'reselect';

const baseSelector = state => state.errors;

// eslint-disable-next-line import/prefer-default-export
export const firstErrorSelector = createSelector(
  baseSelector,
  errors => errors[0],
);
