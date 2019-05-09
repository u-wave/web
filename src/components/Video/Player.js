import React from 'react';
import PropTypes from 'prop-types';
import { useMediaSources } from '../../context/MediaSourceContext';

const PreviewPlayer = ({
  media,
  seek = 0,
  ...props
}) => {
  const { getMediaSource } = useMediaSources();

  const { Player } = getMediaSource(media.sourceType);
  return (
    <Player
      enabled
      active
      seek={seek}
      media={media}
      {...props}
    />
  );
};

PreviewPlayer.propTypes = {
  media: PropTypes.object.isRequired,
  seek: PropTypes.number,
};

export default PreviewPlayer;
