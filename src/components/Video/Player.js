import * as React from 'react';

import * as sources from '../../sources';

const PreviewPlayer = ({
  media,
  seek = 0,
  ...props
}) => {
  const { sourceType } = media;

  const { Player } = sources[sourceType];
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
  seek: React.PropTypes.number
};

export default PreviewPlayer;
