import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import YouTube from '@u-wave/react-youtube';

const { useCallback } = React;

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
  const controllable = mode === 'preview';

  const handlePause = useCallback((event) => {
    if (active && !controllable) {
      event.target.playVideo();
    }
  }, [active, controllable]);

  return (
    <div className={cx('src-youtube-Player', modeClass, className)} hidden={!active}>
      {enabled && (
        <YouTube
          video={active ? media.sourceID : null}
          width="100%"
          height="100%"
          autoplay
          modestBranding
          disableKeyboard
          volume={volume / 100}
          playbackRate={1}
          controls={controllable}
          showRelatedVideos={false}
          annotations={false}
          startSeconds={Math.round(seek + (media.start ?? 0))}
          endSeconds={media.end ?? media.duration}
          onPause={handlePause}
          onPlaying={onPlay}
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
