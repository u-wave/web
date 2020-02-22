import React from 'react';
import PropTypes from 'prop-types';

const { createContext, useContext } = React;

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

const Provider = ({ mediaSources, children }) => (
  <InternalContext.Provider value={sourcesApi(mediaSources)}>
    {children}
  </InternalContext.Provider>
);

Provider.propTypes = {
  mediaSources: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default { Provider, Consumer };
export { useMediaSources };
