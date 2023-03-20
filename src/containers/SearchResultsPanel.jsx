import React from 'react';
import useSWRImmutable from 'swr/immutable';
import { useSelector } from '../hooks/useRedux';
import { useMediaSearchStore } from '../stores/MediaSearchStore';
import { playlistsByIDSelector } from '../selectors/playlistSelectors';
import SearchResults from '../components/PlaylistManager/SearchResults';

const { useMemo } = React;

function SearchResultsContainer() {
  const {
    activeSource,
    query,
  } = useMediaSearchStore();

  // Technically this is not immutable but we want to avoid frequent
  // search queries that cost a lot of quota
  const { data: results, error, isValidating } = useSWRImmutable(() => {
    if (!query) {
      return null;
    }

    const qs = new URLSearchParams({
      query,
      include: 'playlists',
    });
    return `/search/${encodeURIComponent(activeSource)}?${qs}`;
  }, async (url) => {
    const res = await fetch(`/api${url}`);
    const { data, errors } = await res.json();
    if (errors) {
      throw new Error(errors[0].title);
    }
    return data;
  });

  const playlistsByID = useSelector(playlistsByIDSelector);

  const resultsWithPlaylists = useMemo(() => {
    if (!Array.isArray(results)) {
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

  const state = !results && !error ? (
    isValidating ? 'loadingState/LOADING' : 'loadingState/IDLE'
  ) : 'loadingState/LOADED';

  return (
    <SearchResults
      query={query}
      results={resultsWithPlaylists}
      loadingState={state}
    />
  );
}

export default SearchResultsContainer;
