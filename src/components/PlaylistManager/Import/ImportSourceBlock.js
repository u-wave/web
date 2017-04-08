import React from 'react';
import PropTypes from 'prop-types';
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
  getMediaSource: PropTypes.func.isRequired,
  sourceType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default injectMediaSources()(ImportSourceBlock);
