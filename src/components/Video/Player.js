import * as React from 'react';

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
  media: React.PropTypes.object.isRequired,
  seek: React.PropTypes.number,
  getMediaSource: React.PropTypes.func.isRequired
};

export default injectMediaSources()(PreviewPlayer);
