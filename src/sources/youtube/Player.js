import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import YouTubePlayerEmbed from './PlayerEmbed';

const YouTubePlayer = ({
  active,
  className,
  enabled,
  mode,
  media,
  seek,
  volume,
  onPlay,
}) => {
  const modeClass = `src-youtube-Player--${mode}`;

  return (
    <div className={cx('src-youtube-Player', modeClass, className)} hidden={!active}>
      {enabled && (
        <YouTubePlayerEmbed
          media={media}
          active={active}
          seek={Math.round(seek)}
          volume={volume}
          controllable={mode === 'preview'}
          onPlay={onPlay}
        />
      )}
    </div>
  );
};

YouTubePlayer.propTypes = {
  className: PropTypes.string,
  mode: PropTypes.oneOf(['small', 'large', 'preview']),
  active: PropTypes.bool.isRequired,
  enabled: PropTypes.bool,
  media: PropTypes.object,
  seek: PropTypes.number,
  volume: PropTypes.number,
  onPlay: PropTypes.func,
};

export default YouTubePlayer;
