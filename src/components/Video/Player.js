import React from 'react';
import PropTypes from 'prop-types';
import injectMediaSources from '../../utils/injectMediaSources';

const PreviewPlayer = ({
  media,
  seek = 0,
  getMediaSource,
  ...props
}) => {
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
  getMediaSource: PropTypes.func.isRequired
};

export default injectMediaSources()(PreviewPlayer);
