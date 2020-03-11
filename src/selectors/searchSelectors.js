import { createSelector } from 'reselect';
import { playlistsByIDSelector } from './playlistSelectors';

const baseSearchSelector = (state) => state.mediaSearch;

export const searchSourceTypeSelector = createSelector(
  baseSearchSelector,
  (search) => search.sourceType,
);

export const searchQuerySelector = createSelector(
  baseSearchSelector,
  (search) => search.query,
);

export const searchLoadingStateSelector = createSelector(
  baseSearchSelector,
  (search) => search.loadingState,
);

const searchResultsCombinedSelector = createSelector(
  baseSearchSelector,
  (search) => search.results,
);

export const searchResultsSelector = createSelector(
  searchResultsCombinedSelector,
  searchSourceTypeSelector,
  playlistsByIDSelector,
  (results, sourceType, playlists) => {
    if (!results[sourceType]) {
      return results[sourceType];
    }
    return results[sourceType].map((result) => {
      if (!Array.isArray(result.inPlaylists)) {
        return result;
      }
      return {
        ...result,
        inPlaylists: result.inPlaylists
          .map((id) => playlists[id])
          // If we don't know about a playlist for some reason, ignore it.
          // That would be a bug, but not showing it is better than crashing!
          .filter(Boolean),
      };
    });
  },
);

export const searchResultsCountSelector = createSelector(
  searchResultsSelector,
  (results) => (results ? results.length : 0),
);

export const showSearchResultsSelector = createSelector(
  baseSearchSelector,
  (search) => !!search.showResults,
);
