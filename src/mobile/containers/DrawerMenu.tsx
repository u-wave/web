import { useCallback } from 'react';
import { useSelector, useDispatch } from '../../hooks/useRedux';
import { toggleOverlay } from '../../reducers/activeOverlay';
import { drawerIsOpenSelector } from '../selectors/drawerSelectors';
import { setDrawer } from '../actions/DrawerActionCreators';
import { toggleServerList, openPlaylist } from '../actions/OverlayActionCreators';
import DrawerMenu from '../components/DrawerMenu';
import { useUwave } from '../../context/UwaveContext';

function DrawerMenuContainer() {
  const uwave = useUwave();
  const hasAboutPage = !!(uwave && uwave.getAboutPageComponent());
  const open = useSelector(drawerIsOpenSelector);
  const dispatch = useDispatch();
  const onShowAbout = useCallback(() => dispatch(toggleOverlay('about')), [dispatch]);
  const onShowServerList = useCallback(() => dispatch(toggleServerList()), [dispatch]);
  const onShowSettings = useCallback(() => dispatch(toggleOverlay('settings')), [dispatch]);
  const onShowPlaylist = useCallback(
    (playlistID: string) => dispatch(openPlaylist(playlistID)),
    [dispatch],
  );
  const onDrawerClose = useCallback(() => dispatch(setDrawer(false)), [dispatch]);

  return (
    <DrawerMenu
      hasAboutPage={hasAboutPage}
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
