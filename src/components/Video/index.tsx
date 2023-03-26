import cx from 'clsx';
import React from 'react';
import screenfull from 'screenfull';
import { useSelector } from '../../hooks/useRedux';
import VideoBackdrop from './VideoBackdrop';
import VideoProgressBar from './VideoProgressBar';
import VideoToolbar from './VideoToolbar';
import MouseMoveCapture from './VideoMouseMoveCapture';
import Player from '../Player';
import { selectOverlay } from '../../reducers/activeOverlay';
import { Media } from '../../reducers/booth';

// Overlays over the video (even tiny in the corner like ours) violate TOS,
// so we can not show them. Toggling it off with a conditional for now until
// we find a good place for the fullscreen control (if we do).
const OVERLAY_ALLOWED = false;

const {
  useCallback,
  useEffect,
  useRef,
  useState,
} = React;

type VideoProps = {
  isFullscreen: boolean,
  enabled: boolean,
  size: string,
  volume: number,
  isMuted: boolean,
  media: Media,
  seek: number,
  onFullscreenEnter: () => void,
  onFullscreenExit: () => void,
}
// TODO the split between this and Player is a bit weird
// could use a rethink (and a rename)
function Video(props: VideoProps) {
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

  const [shouldShowToolbar, setShowToolbar] = useState(false);
  const activeOverlay = useSelector(selectOverlay);
  const container = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleRequestFullscreenEnter = useCallback(() => {
    if (screenfull.isEnabled && container.current) {
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
    if (timer.current) {
      clearTimeout(timer.current);
    }
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
  }, [handleMouseMoveEnd]);

  // Attach fullscreen exit event listener.
  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', handleFullscreenChange);
      return () => screenfull.off('change', handleFullscreenChange);
    }
    return () => null;
  }, [handleFullscreenChange]);

  // Exit fullscreen mode if the `isFullscreen` prop changed.
  useEffect(() => {
    if (!isFullscreen && screenfull.isEnabled) {
      // Checking for `isFullscreen` here, because our props have probably changed
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

  return (
    <div
      ref={container}
      className={cx('Video', `Video--${media.sourceType}`, `Video--${size}`, { 'Video--nonInteractive': activeOverlay })}
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

      {OVERLAY_ALLOWED && (
        <>
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
            />
          )}
        </>
      )}
    </div>
  );
}

export default Video;
