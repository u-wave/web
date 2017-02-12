import cx from 'classnames';
import * as React from 'react';

import YouTubePlayerEmbed from './PlayerEmbed';

const YouTubePlayer = ({
  active,
  className,
  enabled,
  mode,
  media,
  seek,
  volume
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
            showControls={mode === 'preview'}
          />
        )}
      </div>
    </span>
  );
};

YouTubePlayer.propTypes = {
  className: React.PropTypes.string,
  mode: React.PropTypes.oneOf([ 'small', 'large', 'preview' ]),
  active: React.PropTypes.bool.isRequired,
  enabled: React.PropTypes.bool,
  media: React.PropTypes.object,
  seek: React.PropTypes.number,
  volume: React.PropTypes.number
};

export default YouTubePlayer;
