import React from 'react';
import MediaSourceContext from '../context/MediaSourceContext';

function getComponentName(Component) {
  return Component.name || Component.displayName || 'Component';
}

export default function injectMediaSources() {
  return (Component) => {
    const InjectMediaSourcesWrapper = (props) => (
      <MediaSourceContext.Consumer>
        {(sources) => (
          <Component {...sources} {...props} />
        )}
      </MediaSourceContext.Consumer>
    );

    InjectMediaSourcesWrapper.displayName = `InjectMediaSources(${getComponentName(Component)})`;

    return InjectMediaSourcesWrapper;
  };
}
