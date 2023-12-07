import React from 'react';
import useSWRImmutable from 'swr/immutable';
import { useSelector } from '../hooks/useRedux';
import { useMediaSearchStore } from '../stores/MediaSearchStore';
import SearchResults from '../components/PlaylistManager/SearchResults';
import { playlistsByIDSelector } from '../reducers/playlists';
import { Media } from '../reducers/booth';
import uwFetch, { ListResponse } from '../utils/fetch';

const { useMemo } = React;

interface SearchResult extends Media {
  inPlaylists?: string[];
}

function SearchResultsContainer() {
  const {
    activeSource,
    query,
  } = useMediaSearchStore();

  // Technically this is not immutable but we want to avoid frequent
  // search queries that cost a lot of quota
  const { data: results, error, isValidating } = useSWRImmutable<ListResponse<SearchResult>>(() => {
    if (!query) {
      return null;
    }

    return [`/search/${encodeURIComponent(activeSource)}`, {
      qs: { query, include: 'playlists' },
    }];
  }, uwFetch);

  const playlistsByID = useSelector(playlistsByIDSelector);

  const resultsWithPlaylists = useMemo(() => {
    if (!results || !Array.isArray(results.data)) {
      return [];
    }
    return results.data.map((result) => {
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

  let state = 'loadingState/IDLE';
  if (results || error) {
    state = 'loadingState/LOADED';
  } else if (isValidating) {
    state = 'loadingState/LOADING';
  }

  return (
    <SearchResults
      query={query ?? ''}
      results={resultsWithPlaylists}
      loadingState={state}
    />
  );
}

export default SearchResultsContainer;
