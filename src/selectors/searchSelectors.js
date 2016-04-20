import { createSelector, createStructuredSelector } from 'reselect';

const baseSearchSelector = state => state.mediaSearch;

const searchSourceTypeSelector = createSelector(
  baseSearchSelector,
  search => search.sourceType
);

const searchQuerySelector = createSelector(
  baseSearchSelector,
  search => search.query
);

const searchLoadingStateSelector = createSelector(
  baseSearchSelector,
  search => search.loadingState
);

const searchResultsCombinedSelector = createSelector(
  baseSearchSelector,
  search => search.results
);

const searchResultsSelector = createSelector(
  searchResultsCombinedSelector,
  searchSourceTypeSelector,
  (results, sourceType) => results[sourceType]
);

const searchResultsCountSelector = createSelector(
  searchResultsSelector,
  results => (results ? results.length : 0)
);

export const searchSelector = createStructuredSelector({
  searchSource: searchSourceTypeSelector,
  searchQuery: searchQuerySelector,
  searchResults: searchResultsSelector,
  searchResultsCount: searchResultsCountSelector,
  searchLoadingState: searchLoadingStateSelector
});
