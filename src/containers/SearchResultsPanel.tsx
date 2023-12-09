import { useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';
import * as loadingState from '../constants/LoadingStates';
import { useSelector } from '../hooks/useRedux';
import { useMediaSearchStore } from '../stores/MediaSearchStore';
import SearchResults from '../components/PlaylistManager/SearchResults';
import { type Playlist, playlistsByIDSelector } from '../reducers/playlists';
import type { Media } from '../reducers/booth';
import uwFetch, { type ListResponse } from '../utils/fetch';

interface ApiSearchResult extends Media {
  inPlaylists?: string[];
}
export interface SearchResult extends Media {
  inPlaylists?: Playlist[],
}

function SearchResultsContainer() {
  const {
    activeSource,
    query,
  } = useMediaSearchStore();

  // Technically this is not immutable but we want to avoid frequent
  // search queries that cost a lot of quota
  const {
    data: results, error, isValidating,
  } = useSWRImmutable<ListResponse<ApiSearchResult>>(() => {
    if (!query) {
      return null;
    }

    return [`/search/${encodeURIComponent(activeSource)}`, {
      qs: { query, include: 'playlists' },
    }];
  }, uwFetch);

  const playlistsByID = useSelector(playlistsByIDSelector);

  const resultsWithPlaylists: SearchResult[] = useMemo(() => {
    if (!results || !Array.isArray(results.data)) {
      return [];
    }
    return results.data.map(({ inPlaylists, ...result }) => {
      if (!inPlaylists) {
        return result;
      }

      const playlists: Playlist[] = [];
      inPlaylists.forEach((id) => {
        const playlist = playlistsByID[id];
        // If we don't know about a playlist for some reason, ignore it.
        // That would be a bug, but not showing it is better than crashing!
        if (playlist != null) {
          playlists.push(playlist);
        }
      });

      return { ...result, inPlaylists: playlists };
    });
  }, [results, playlistsByID]);

  let state: typeof loadingState[keyof typeof loadingState] = loadingState.IDLE;
  if (results || error) {
    state = loadingState.LOADED;
  } else if (isValidating) {
    state = loadingState.LOADING;
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
