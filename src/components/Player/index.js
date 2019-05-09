import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { useMediaSources } from '../../context/MediaSourceContext';

function Player({
  enabled,
  size,
  volume,
  isMuted,
  media,
  seek,
  onPlay,
}) {
  const { getAllMediaSources } = useMediaSources();

  if (!media) {
    return <div className="Player" />;
  }

  const props = {
    enabled,
    media,
    seek,
    mode: size,
    volume: isMuted ? 0 : volume,
    onPlay,
  };

  const sources = getAllMediaSources();
  const players = Object.keys(sources).map((sourceType) => {
    const SourcePlayer = sources[sourceType].Player;
    if (!SourcePlayer) {
      return null;
    }
    return (
      <SourcePlayer
        key={sourceType}
        {...props}
        active={media.sourceType === sourceType}
      />
    );
  }).filter(player => player !== null);

  return (
    <div className={cx('Player', `Player--${media.sourceType}`, `Player--${size}`)}>
      {players}
    </div>
  );
}

Player.propTypes = {
  enabled: PropTypes.bool,
  size: PropTypes.string,
  volume: PropTypes.number,
  isMuted: PropTypes.bool,
  media: PropTypes.object,
  seek: PropTypes.number,
  onPlay: PropTypes.func,
};

export default Player;
