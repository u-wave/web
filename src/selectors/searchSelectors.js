import { createSelector, createStructuredSelector } from 'reselect';

const baseSearchSelector = state => state.mediaSearch;

const searchSourceTypeSelector = createSelector(
  baseSearchSelector,
  search => search.sourceType
);

export const searchQuerySelector = createSelector(
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

export const searchResultsSelector = createSelector(
  searchResultsCombinedSelector,
  searchSourceTypeSelector,
  (results, sourceType) => results[sourceType]
);

export const searchResultsCountSelector = createSelector(
  searchResultsSelector,
  results => (results ? results.length : 0)
);

export const showSearchResultsSelector = createSelector(
  baseSearchSelector,
  search => !!search.showResults
);

// eslint-disable-next-line import/prefer-default-export
export const searchSelector = createStructuredSelector({
  showSearchResults: showSearchResultsSelector,
  searchSource: searchSourceTypeSelector,
  searchQuery: searchQuerySelector,
  searchResults: searchResultsSelector,
  searchResultsCount: searchResultsCountSelector,
  searchLoadingState: searchLoadingStateSelector
});
