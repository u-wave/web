import { createSelector } from 'reselect';

const baseSelector = state => state.errors;

export const firstErrorSelector = createSelector(
  baseSelector,
  errors => errors[0]
);
