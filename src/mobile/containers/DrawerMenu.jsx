import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentUserSelector } from '../../selectors/userSelectors';
import { playlistsSelector } from '../../selectors/playlistSelectors';
import { toggleSettings, toggleAbout } from '../../actions/OverlayActionCreators';
import { drawerIsOpenSelector } from '../selectors/drawerSelectors';
import { setDrawer } from '../actions/DrawerActionCreators';
import { toggleServerList, openPlaylist } from '../actions/OverlayActionCreators';
import DrawerMenu from '../components/DrawerMenu';
import UwaveContext from '../../context/UwaveContext';

const {
  useCallback,
  useContext,
} = React;

function DrawerMenuContainer() {
  const uwave = useContext(UwaveContext);
  const hasAboutPage = !!(uwave && uwave.getAboutPageComponent());
  const user = useSelector(currentUserSelector);
  const playlists = useSelector(playlistsSelector);
  const open = useSelector(drawerIsOpenSelector);
  const dispatch = useDispatch();
  const onShowAbout = useCallback(() => dispatch(toggleAbout()), [dispatch]);
  const onShowServerList = useCallback(() => dispatch(toggleServerList()), [dispatch]);
  const onShowSettings = useCallback(() => dispatch(toggleSettings()), [dispatch]);
  const onShowPlaylist = useCallback(
    (playlistID) => dispatch(openPlaylist(playlistID)),
    [dispatch],
  );
  const onDrawerClose = useCallback(() => dispatch(setDrawer(false)), [dispatch]);

  return (
    <DrawerMenu
      hasAboutPage={hasAboutPage}
      user={user}
      playlists={playlists}
      open={open}
      onShowAbout={onShowAbout}
      onShowServerList={onShowServerList}
      onShowSettings={onShowSettings}
      onShowPlaylist={onShowPlaylist}
      onDrawerClose={onDrawerClose}
    />
  );
}

export default DrawerMenuContainer;
