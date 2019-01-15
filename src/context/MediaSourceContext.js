import React from 'react';
import PropTypes from 'prop-types';

const InternalContext = React.createContext(null);
const { Consumer } = InternalContext;

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

export default {
  Provider,
  Consumer,
};
