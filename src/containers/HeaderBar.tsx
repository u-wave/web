import { useCallback } from 'react';
import { useDispatch, useSelector } from '../hooks/useRedux';
import { toggleOverlay } from '../reducers/activeOverlay';
import { djSelector, mediaSelector, startTimeSelector } from '../reducers/booth';
import {
  setVolume,
  mute,
  unmute,
  volumeSelector,
  isMutedSelector,
} from '../reducers/settings';
import HeaderBar from '../components/HeaderBar';

type HeaderBarContainerProps = {
  className?: string,
  title: string,
};
function HeaderBarContainer({ className, title }: HeaderBarContainerProps) {
  const mediaStartTime = useSelector(startTimeSelector);
  const media = useSelector(mediaSelector);
  const dj = useSelector(djSelector);
  const volume = useSelector(volumeSelector);
  const muted = useSelector(isMutedSelector);
  const dispatch = useDispatch();
  const onVolumeChange = useCallback((newVolume: number) => {
    dispatch(setVolume(newVolume));
  }, [dispatch]);
  const onVolumeMute = useCallback(() => dispatch(mute()), [dispatch]);
  const onVolumeUnmute = useCallback(() => dispatch(unmute()), [dispatch]);
  const onToggleRoomHistory = useCallback(() => dispatch(toggleOverlay('roomHistory')), [dispatch]);
  const onToggleAboutOverlay = useCallback(() => dispatch(toggleOverlay('about')), [dispatch]);

  return (
    <HeaderBar
      className={className}
      title={title}
      mediaStartTime={mediaStartTime}
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
