import React from 'react';
import PropTypes from 'prop-types';

function getComponentName(Component) {
  return Component.name || Component.displayName || 'Component';
}

export default function injectMediaSources() {
  return Component => class extends React.Component {
    static displayName = `InjectMediaSources(${getComponentName(Component)})`;

    static contextTypes = {
      mediaSources: PropTypes.object,
    };

    getMediaSource = name => this.context.mediaSources[name];
    getAllMediaSources = () => this.context.mediaSources;

    render() {
      return (
        <Component
          getMediaSource={this.getMediaSource}
          getAllMediaSources={this.getAllMediaSources}
          {...this.props}
        />
      );
    }
  };
}
