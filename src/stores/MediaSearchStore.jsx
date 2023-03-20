import React from 'react';
import PropTypes from 'prop-types';

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

  const reset = useCallback(() => {
    setQuery(null);
  }, []);

  const context = useMemo(() => ({
    activeSource,
    query,

    search: setQuery,
    reset,
    setSource: setActiveSource,
  }), [activeSource, query, setQuery, reset, setActiveSource]);

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
