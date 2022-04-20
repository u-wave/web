import React from 'react';
import PropTypes from 'prop-types';
import YouTube from '@u-wave/react-youtube';

function YouTubePlayerEmbed({
  active,
  media,
  seek,
  volume,
  controllable = false,
  onPlay,
}) {
  const handlePause = (event) => {
    if (active && !controllable) {
      event.target.playVideo();
    }
  };

  return (
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
      showInfo={false}
      annotations={false}
      startSeconds={(seek ?? 0) + (media.start ?? 0)}
      endSeconds={media.end ?? media.duration}
      onPause={handlePause}
      onPlaying={onPlay}
    />
  );
}

YouTubePlayerEmbed.propTypes = {
  active: PropTypes.bool.isRequired,
  media: PropTypes.object,
  seek: PropTypes.number,
  volume: PropTypes.number,
  controllable: PropTypes.bool,
  onPlay: PropTypes.func,
};

export default YouTubePlayerEmbed;
