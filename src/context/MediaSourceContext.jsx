import React from 'react';
import PropTypes from 'prop-types';

const {
  createContext,
  useContext,
  useMemo,
} = React;

const InternalContext = createContext(null);
const { Consumer } = InternalContext;

function useMediaSources() {
  return useContext(InternalContext);
}

function sourcesApi(sources) {
  function getMediaSource(name) {
    return sources[name];
  }

  function getAllMediaSources() {
    return sources;
  }

  return { getMediaSource, getAllMediaSources };
}

function Provider({ mediaSources, children }) {
  const value = useMemo(() => sourcesApi(mediaSources), [mediaSources]);
  return (
    <InternalContext.Provider value={value}>
      {children}
    </InternalContext.Provider>
  );
}

Provider.propTypes = {
  mediaSources: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default { Provider, Consumer };
export { useMediaSources };
