import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useClock from '../hooks/useClock';
import { enterFullscreen, exitFullscreen } from '../actions/PlaybackActionCreators';
import {
  historyIDSelector,
  mediaSelector,
  playbackVolumeSelector,
  timeElapsedSelector,
} from '../selectors/boothSelectors';
import Video from '../components/Video';

const {
  useCallback,
} = React;

function VideoContainer() {
  // Make it rerender every second.
  useClock();

  const historyID = useSelector(historyIDSelector);
  const media = useSelector(mediaSelector);
  const seek = useSelector(timeElapsedSelector);
  const volume = useSelector(playbackVolumeSelector);
  const isFullscreen = useSelector(state => state.booth.isFullscreen);
  const dispatch = useDispatch();

  const onFullscreenEnter = useCallback(() => dispatch(enterFullscreen()), [dispatch]);
  const onFullscreenExit = useCallback(() => dispatch(exitFullscreen()), [dispatch]);

  return (
    <Video
      historyID={historyID}
      media={media}
      seek={seek}
      volume={volume}
      isFullscreen={isFullscreen}
      onFullscreenEnter={onFullscreenEnter}
      onFullscreenExit={onFullscreenExit}
    />
  );
}

export default VideoContainer;
