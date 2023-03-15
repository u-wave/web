import React from 'react';
import { useDispatch, useSelector } from '../hooks/useRedux';
import useClock from '../hooks/useClock';
import { enterFullscreen, exitFullscreen } from '../actions/PlaybackActionCreators';
import {
  historyIDSelector,
  mediaSelector,
  playbackVolumeSelector,
  timeElapsedSelector,
} from '../selectors/boothSelectors';
import {
  isMutedSelector,
  videoSizeSelector,
  videoEnabledSelector,
} from '../selectors/settingSelectors';
import Video from '../components/Video';

const {
  useCallback,
} = React;

function VideoContainer() {
  // Make it rerender every second.
  useClock();

  const videoEnabled = useSelector(videoEnabledSelector);
  const videoSize = useSelector(videoSizeSelector);
  const historyID = useSelector(historyIDSelector);
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
      historyID={historyID}
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
