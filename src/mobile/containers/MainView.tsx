import { useCallback } from 'react';
import { useSelector, useDispatch } from '../../hooks/useRedux';
import { toggleOverlay } from '../../reducers/activeOverlay';
import { setVideoEnabled, videoEnabledSelector } from '../../reducers/settings';
import { mediaSelector } from '../../reducers/booth';
import {
  sizeSelector as waitlistSizeSelector,
  positionSelector as waitlistPositionSelector,
} from '../../reducers/waitlist';
import MainView from '../components/MainView';

function MainViewContainer() {
  const videoEnabled = useSelector(videoEnabledSelector);
  const media = useSelector(mediaSelector);
  const waitlistPosition = useSelector(waitlistPositionSelector);
  const waitlistSize = useSelector(waitlistSizeSelector);
  const dispatch = useDispatch();
  const onOpenRoomHistory = useCallback(() => dispatch(toggleOverlay('roomHistory')), [dispatch]);
  const onEnableVideo = useCallback(() => dispatch(setVideoEnabled(true)), [dispatch]);

  return (
    <MainView
      videoEnabled={videoEnabled}
      media={media}
      waitlistPosition={waitlistPosition}
      waitlistSize={waitlistSize}
      onOpenRoomHistory={onOpenRoomHistory}
      onEnableVideo={onEnableVideo}
    />
  );
}

export default MainViewContainer;
