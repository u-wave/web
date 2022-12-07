import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaSearchStore } from '../stores/MediaSearchStore';
import { playlistsByIDSelector } from '../selectors/playlistSelectors';
import SearchResults from '../components/PlaylistManager/SearchResults';

const { useMemo } = React;

function SearchResultsContainer() {
  const {
    query,
    results,
    state,
  } = useMediaSearchStore();

  const playlistsByID = useSelector(playlistsByIDSelector);

  const resultsWithPlaylists = useMemo(() => {
    if (!results) {
      return [];
    }
    return results.map((result) => {
      if (!Array.isArray(result.inPlaylists)) {
        return result;
      }
      return {
        ...result,
        inPlaylists: result.inPlaylists
          .map((id) => playlistsByID[id])
          // If we don't know about a playlist for some reason, ignore it.
          // That would be a bug, but not showing it is better than crashing!
          .filter(Boolean),
      };
    });
  }, [results, playlistsByID]);

  return (
    <SearchResults
      query={query}
      results={resultsWithPlaylists}
      loadingState={state}
    />
  );
}

export default SearchResultsContainer;
