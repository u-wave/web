import React from 'react';
import { useDispatch, useSelector } from '../hooks/useRedux';
import useClock from '../hooks/useClock';
import {
  enterFullscreen,
  exitFullscreen,
  mediaSelector,
  timeElapsedSelector,
} from '../reducers/booth';
import {
  isMutedSelector,
  playbackVolumeSelector,
  videoEnabledSelector,
  videoSizeSelector,
} from '../reducers/settings';
import Video from '../components/Video';

const {
  useCallback,
} = React;

function VideoContainer() {
  // Make it rerender every second.
  useClock();

  const videoEnabled = useSelector(videoEnabledSelector);
  const videoSize = useSelector(videoSizeSelector);
  const media = useSelector(mediaSelector);
  const seek = useSelector((s) => timeElapsedSelector(s));
  const isMuted = useSelector(isMutedSelector);
  const volume = useSelector(playbackVolumeSelector);
  const isFullscreen = useSelector((state) => state.booth.isFullscreen);
  const dispatch = useDispatch();

  const onFullscreenEnter = useCallback(() => dispatch(enterFullscreen()), [dispatch]);
  const onFullscreenExit = useCallback(() => dispatch(exitFullscreen()), [dispatch]);

  return (
    <Video
      enabled={videoEnabled}
      size={videoSize}
      media={media}
      seek={seek}
      isMuted={isMuted}
      volume={volume}
      isFullscreen={isFullscreen}
      onFullscreenEnter={onFullscreenEnter}
      onFullscreenExit={onFullscreenExit}
    />
  );
}

export default VideoContainer;
