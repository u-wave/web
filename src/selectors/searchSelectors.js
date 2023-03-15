/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

/** @param {import('../redux/configureStore').StoreState} state */
const baseSearchSelector = (state) => state.mediaSearch;

export const showSearchResultsSelector = createSelector(
  baseSearchSelector,
  (search) => !!search.showResults,
);
