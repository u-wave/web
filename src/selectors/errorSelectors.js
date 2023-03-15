import { createSelector } from 'reselect';

/** @param {import('../redux/configureStore').StoreState} state */
const baseSelector = (state) => state.errors;

// eslint-disable-next-line import/prefer-default-export
export const firstErrorSelector = createSelector(
  baseSelector,
  (errors) => errors[0],
);
