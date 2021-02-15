import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleRoomHistory } from '../../actions/OverlayActionCreators';
import { set } from '../../actions/SettingsActionCreators';
import {
  mediaSelector,
  startTimeSelector,
} from '../../selectors/boothSelectors';
import {
  sizeSelector as waitlistSizeSelector,
  positionSelector as waitlistPositionSelector,
} from '../../selectors/waitlistSelectors';
import { playlistsSelector } from '../../selectors/playlistSelectors';
import { videoEnabledSelector } from '../../selectors/settingSelectors';
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
  const onOpenRoomHistory = useCallback(() => dispatch(toggleRoomHistory()), [dispatch]);
  const onOpenDrawer = useCallback(() => dispatch(openDrawer()), [dispatch]);
  const onOpenWaitlist = useCallback(() => dispatch(openUsersDrawer()), [dispatch]);
  const onEnableVideo = useCallback(() => dispatch(set('videoEnabled', true)), [dispatch]);

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
