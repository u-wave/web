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
}) => {
  const modeClass = `src-youtube-Player--${mode}`;

  // Wrapper span so the backdrop can be full-size…
  return (
    <span hidden={!active}>
      <div className={cx('src-youtube-Player', modeClass, className)}>
        {enabled && (
          <YouTubePlayerEmbed
            media={media}
            active={active}
            seek={Math.round(seek)}
            volume={volume}
            controllable={mode === 'preview'}
          />
        )}
      </div>
    </span>
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
};

export default YouTubePlayer;
