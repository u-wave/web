import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVolume, mute, unmute } from '../actions/PlaybackActionCreators';
import { toggleRoomHistory, toggleAbout } from '../actions/OverlayActionCreators';
import {
  djSelector,
  mediaSelector,
  mediaProgressSelector,
  timeRemainingSelector,
} from '../selectors/boothSelectors';
import { volumeSelector, isMutedSelector } from '../selectors/settingSelectors';
import HeaderBar from '../components/HeaderBar';

function HeaderBarContainer(props) {
  const mediaProgress = useSelector(mediaProgressSelector);
  const mediaTimeRemaining = useSelector(timeRemainingSelector);
  const media = useSelector(mediaSelector);
  const dj = useSelector(djSelector);
  const volume = useSelector(volumeSelector);
  const muted = useSelector(isMutedSelector);
  const dispatch = useDispatch();

  const onVolumeChange = (newVolume) => dispatch(setVolume(newVolume));
  const onVolumeMute = () => dispatch(mute());
  const onVolumeUnmute = () => dispatch(unmute());
  const onToggleRoomHistory = () => dispatch(toggleRoomHistory());
  const onToggleAboutOverlay = () => dispatch(toggleAbout());

  return (
    <HeaderBar
      {...props}
      mediaProgress={mediaProgress}
      mediaTimeRemaining={mediaTimeRemaining}
      media={media}
      dj={dj}
      volume={volume}
      muted={muted}
      onVolumeChange={onVolumeChange}
      onVolumeMute={onVolumeMute}
      onVolumeUnmute={onVolumeUnmute}
      onToggleRoomHistory={onToggleRoomHistory}
      onToggleAboutOverlay={onToggleAboutOverlay}
    />
  );
}

export default HeaderBarContainer;
