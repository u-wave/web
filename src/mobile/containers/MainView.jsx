import React from 'react';
import { useSelector, useDispatch } from '../../hooks/useRedux';
import { toggleOverlay } from '../../reducers/activeOverlay';
import { setVideoEnabled, videoEnabledSelector } from '../../reducers/settings';
import { mediaSelector, startTimeSelector } from '../../selectors/boothSelectors';
import {
  sizeSelector as waitlistSizeSelector,
  positionSelector as waitlistPositionSelector,
} from '../../selectors/waitlistSelectors';
import { playlistsSelector } from '../../selectors/playlistSelectors';
import { openDrawer, openUsersDrawer } from '../actions/DrawerActionCreators';
import MainView from '../components/MainView';

const {
  useCallback,
} = React;

function MainViewContainer() {
  const videoEnabled = useSelector(videoEnabledSelector);
  const media = useSelector(mediaSelector);
  const startTime = useSelector(startTimeSelector);
  const waitlistPosition = useSelector(waitlistPositionSelector);
  const waitlistSize = useSelector(waitlistSizeSelector);
  const playlists = useSelector(playlistsSelector);
  const dispatch = useDispatch();
  const onOpenRoomHistory = useCallback(() => dispatch(toggleOverlay('roomHistory')), [dispatch]);
  const onOpenDrawer = useCallback(() => dispatch(openDrawer()), [dispatch]);
  const onOpenWaitlist = useCallback(() => dispatch(openUsersDrawer()), [dispatch]);
  const onEnableVideo = useCallback(() => dispatch(setVideoEnabled(true)), [dispatch]);

  return (
    <MainView
      videoEnabled={videoEnabled}
      media={media}
      startTime={startTime}
      waitlistPosition={waitlistPosition}
      waitlistSize={waitlistSize}
      playlists={playlists}
      onOpenRoomHistory={onOpenRoomHistory}
      onOpenDrawer={onOpenDrawer}
      onOpenWaitlist={onOpenWaitlist}
      onEnableVideo={onEnableVideo}
    />
  );
}

export default MainViewContainer;
