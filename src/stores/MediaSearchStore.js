import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { showSearchResults } from '../actions/SearchActionCreators';
import { get } from '../actions/RequestActionCreators';
import { IDLE, LOADING, LOADED } from '../constants/LoadingStates';

const {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} = React;

const MediaSearchStoreContext = React.createContext(null);

function useStoreImplementation() {
  const [query, setQuery] = useState(null);
  const [state, setState] = useState(IDLE);
  const [activeSource, setActiveSource] = useState('youtube');
  const [results, setResults] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (query == null) {
      setResults(null);
      return () => {};
    }

    setState(LOADING);

    // Maybe this can be pulled into a useFetch hook of some kind?
    const controller = new AbortController();
    const request = get(`/search/${encodeURIComponent(activeSource)}`, {
      qs: { query },
      signal: controller.signal,
    });

    dispatch(request).then(({ data }) => {
      setResults(data);
      setState(LOADED);
    }, () => {
      setState(IDLE);
    });

    return () => {
      controller.abort();
      setState(IDLE);
    };
  }, [dispatch, query, activeSource]);

  const search = useCallback((newQuery) => {
    // For compatibility.
    // TODO do this elsewhere.
    dispatch(showSearchResults());

    setQuery(newQuery);
  }, [dispatch]);

  const context = useMemo(() => ({
    activeSource,
    query,
    results,
    resultsCount: results ? results.length : 0,
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
