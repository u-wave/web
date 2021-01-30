/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const baseSearchSelector = (state) => state.mediaSearch;

export const showSearchResultsSelector = createSelector(
  baseSearchSelector,
  (search) => !!search.showResults,
);
