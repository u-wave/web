import React from 'react';
import PropTypes from 'prop-types';
import { useMediaSources } from '../../context/MediaSourceContext';

function MediaSourceIcon({ sourceType }) {
  const { getMediaSource } = useMediaSources();
  const { icon, name } = getMediaSource(sourceType);

  return (
    <img
      height="20dp"
      src={icon}
      alt={name}
    />
  );
}

MediaSourceIcon.propTypes = {
  sourceType: PropTypes.string.isRequired,
};

export default MediaSourceIcon;
