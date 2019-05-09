import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import screenfull from 'screenfull';
import { useMediaSources } from '../../context/MediaSourceContext';
import VideoBackdrop from './VideoBackdrop';
import VideoProgressBar from './VideoProgressBar';
import VideoToolbar from './VideoToolbar';
import MouseMoveCapture from './VideoMouseMoveCapture';
import Player from '../Player';

const {
  useCallback,
  useEffect,
  useRef,
  useState,
} = React;

const defaultSourceTools = () => null;

function Video(props) {
  const {
    isFullscreen,
    enabled,
    size,
    volume,
    isMuted,
    media,
    seek,
    onFullscreenEnter,
    onFullscreenExit,
  } = props;

  const { getMediaSource } = useMediaSources();
  const [shouldShowToolbar, setShowToolbar] = useState(false);
  const container = useRef(null);
  const timer = useRef(null);

  const handleRequestFullscreenEnter = useCallback(() => {
    if (screenfull.enabled) {
      screenfull.request(container.current);
    }
    onFullscreenEnter();
  }, [onFullscreenEnter]);

  const handleFullscreenChange = useCallback(() => {
    if (!screenfull.isFullscreen) {
      onFullscreenExit();
    }
  }, [onFullscreenExit]);

  const handleMouseMoveEnd = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = null;
    setShowToolbar(false);
  }, []);

  // Show toolbar if the user mouses over the video.
  const handleMouseMove = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    } else {
      setShowToolbar(true);
    }
    timer.current = setTimeout(handleMouseMoveEnd, 5000);
  }, []);

  // Attach fullscreen exit event listener.
  useEffect(() => {
    if (screenfull.enabled) {
      screenfull.on('change', handleFullscreenChange);
      return () => screenfull.off('change', handleFullscreenChange);
    }
    return () => null;
  }, [handleFullscreenChange]);

  // Exit fullscreen mode if the `isFullscreen` prop changed.
  useEffect(() => {
    if (!isFullscreen && screenfull.enabled) {
      // Checking for `enabled` here, because our props have probably changed
      // _after_ exiting fullscreen mode (see `handleFullscreenChange`).
      // This way we don't double-exit.
      if (screenfull.isFullscreen) {
        screenfull.exit();
      }
    }
  }, [isFullscreen]);

  if (!media) {
    return <div className="Video" />;
  }

  const currentSource = getMediaSource(media.sourceType);
  const MediaSourceTools = (currentSource && currentSource.VideoTools)
    ? currentSource.VideoTools
    : defaultSourceTools;

  return (
    <div
      ref={container}
      className={cx('Video', `Video--${media.sourceType}`, `Video--${size}`)}
    >
      <VideoBackdrop url={media.thumbnail} />
      <Player
        enabled={enabled}
        size={size}
        volume={volume}
        isMuted={isMuted}
        media={media}
        seek={seek}
      />

      {isFullscreen && (
        <MouseMoveCapture
          active={shouldShowToolbar}
          onMouseMove={handleMouseMove}
        />
      )}
      {isFullscreen && (
        <VideoProgressBar
          media={media}
          seek={seek}
        />
      )}
      {(!isFullscreen || shouldShowToolbar) && (
        <VideoToolbar
          isFullscreen={isFullscreen}
          onFullscreenEnter={handleRequestFullscreenEnter}
          onFullscreenExit={onFullscreenExit}
        >
          <MediaSourceTools media={media} />
        </VideoToolbar>
      )}
    </div>
  );
}

Video.propTypes = {
  isFullscreen: PropTypes.bool,
  enabled: PropTypes.bool,
  size: PropTypes.string,
  volume: PropTypes.number,
  isMuted: PropTypes.bool,
  media: PropTypes.object,
  seek: PropTypes.number,
  onFullscreenEnter: PropTypes.func.isRequired,
  onFullscreenExit: PropTypes.func.isRequired,
};

export default Video;
