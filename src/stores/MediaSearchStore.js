import React from 'react';
import { useDispatch } from 'react-redux';
import { useAsyncAbortable } from 'react-async-hook';
import PropTypes from 'prop-types';
import { hideSearchResults, showSearchResults } from '../actions/SearchActionCreators';
import { get } from '../actions/RequestActionCreators';
import { IDLE, LOADING, LOADED } from '../constants/LoadingStates';

const {
  useCallback,
  useContext,
  useMemo,
  useState,
} = React;

const MediaSearchStoreContext = React.createContext(null);

function useStoreImplementation() {
  const [query, setQuery] = useState(null);
  const [activeSource, setActiveSource] = useState('youtube');
  const dispatch = useDispatch();

  const results = useAsyncAbortable(async (signal) => {
    if (query == null) {
      return null;
    }

    const request = get(`/search/${encodeURIComponent(activeSource)}`, {
      qs: { query, include: 'playlists' },
      signal,
    });

    const { data } = await dispatch(request);

    return data;
  }, [dispatch, query, activeSource]);

  const search = useCallback((newQuery) => {
    // For compatibility.
    // TODO do this elsewhere.
    if (newQuery != null) {
      dispatch(showSearchResults());
    } else {
      dispatch(hideSearchResults());
    }

    setQuery(newQuery);
  }, [dispatch]);

  let state = IDLE;
  if (results.loading) {
    state = LOADING;
  } else if (results.result) {
    state = LOADED;
  }

  const context = useMemo(() => ({
    activeSource,
    query,
    results: results.result,
    resultsCount: results.result ? results.result.length : 0,
    state,

    search,
    setSource: setActiveSource,
  }), [activeSource, query, results, state, search, setActiveSource]);

  return context;
}

export function MediaSearchStoreProvider({ children }) {
  const context = useStoreImplementation();

  return (
    <MediaSearchStoreContext.Provider value={context}>
      {children}
    </MediaSearchStoreContext.Provider>
  );
}

MediaSearchStoreProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export function useMediaSearchStore() {
  return useContext(MediaSearchStoreContext);
}
