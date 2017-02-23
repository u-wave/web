import * as React from 'react';
import injectMediaSources from '../../../utils/injectMediaSources';

const ImportSourceBlock = ({
  getMediaSource,
  sourceType,
  title,
  children
}) => (
  <div className="ImportSourceBlock PlaylistImport-source">
    <img
      className="ImportSourceBlock-image"
      alt={title}
      title={title}
      src={getMediaSource(sourceType).logo}
    />
    {children}
  </div>
);

ImportSourceBlock.propTypes = {
  getMediaSource: React.PropTypes.func.isRequired,
  sourceType: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired
};

export default injectMediaSources()(ImportSourceBlock);
