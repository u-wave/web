import { createSelector } from 'reselect';

const baseSearchSelector = state => state.mediaSearch;

export const searchSourceTypeSelector = createSelector(
  baseSearchSelector,
  search => search.sourceType,
);

export const searchQuerySelector = createSelector(
  baseSearchSelector,
  search => search.query,
);

export const searchLoadingStateSelector = createSelector(
  baseSearchSelector,
  search => search.loadingState,
);

const searchResultsCombinedSelector = createSelector(
  baseSearchSelector,
  search => search.results,
);

export const searchResultsSelector = createSelector(
  searchResultsCombinedSelector,
  searchSourceTypeSelector,
  (results, sourceType) => results[sourceType],
);

export const searchResultsCountSelector = createSelector(
  searchResultsSelector,
  results => (results ? results.length : 0),
);

export const showSearchResultsSelector = createSelector(
  baseSearchSelector,
  search => !!search.showResults,
);
