import React from 'react';
import PropTypes from 'prop-types';
import { useYouTube } from '@u-wave/react-youtube';

const { useRef } = React;

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

  const container = useRef(null);
  useYouTube(container, {
    video: active ? media.sourceID : null,
    width: '100%',
    height: '100%',
    autoplay: true,
    modestBranding: true,
    disableKeyboard: true,
    volume: volume / 100,
    playbackRate: 1,
    controls: controllable,
    showRelatedVideos: false,
    annotations: false,
    startSeconds: (seek ?? 0) + (media.start ?? 0),
    endSeconds: media.end ?? media.duration,
    onPause: handlePause,
    onPlaying: onPlay,
  });

  return <div ref={container} />;
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
