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
  const [combinedResults, setCombinedResults] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (query == null) {
      setCombinedResults({});
      return () => {};
    }

    setState(LOADING);
    // This has a race condition :)
    (async () => {
      try {
        const request = get('/search', {
          qs: { query },
        });
        const results = await dispatch(request);

        setCombinedResults(results);
        setState(LOADED);
      } catch {
        setState(IDLE);
      }
    })();
    return () => {
      setState(IDLE);
    };
  }, [query, activeSource]);

  const search = useCallback((newQuery) => {
    // For compatibility.
    // TODO do this elsewhere.
    dispatch(showSearchResults());

    setQuery(newQuery);
  }, []);

  const results = useMemo(
    () => combinedResults[activeSource],
    [activeSource, combinedResults],
  );

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
