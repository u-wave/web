import cx from 'classnames';
import * as React from 'react';

import VideoBackdrop from '../../components/Video/VideoBackdrop';
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

  let backdrop;
  if (active && mode !== 'large') {
    backdrop = <VideoBackdrop url={media.thumbnail} />;
  }
  // Wrapper span so the backdrop can be full-size…
  return (
    <span hidden={!active}>
      {backdrop}
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
