import { useCallback } from 'react';
import { useDispatch } from '../../hooks/useRedux';
import { toggleOverlay } from '../../reducers/activeOverlay';
import { toggleServerList, openPlaylist } from '../actions/OverlayActionCreators';
import DrawerMenu from '../components/DrawerMenu';
import { useUwave } from '../../context/UwaveContext';

type DrawerMenuContainerProps = {
  open: boolean,
  onClose: () => void,
};
function DrawerMenuContainer({ open, onClose }: DrawerMenuContainerProps) {
  const uwave = useUwave();
  const hasAboutPage = !!(uwave && uwave.getAboutPageComponent());
  const dispatch = useDispatch();
  const onShowAbout = useCallback(() => dispatch(toggleOverlay('about')), [dispatch]);
  const onShowServerList = useCallback(() => dispatch(toggleServerList()), [dispatch]);
  const onShowSettings = useCallback(() => dispatch(toggleOverlay('settings')), [dispatch]);
  const onShowPlaylist = useCallback(
    (playlistID: string) => dispatch(openPlaylist(playlistID)),
    [dispatch],
  );

  return (
    <DrawerMenu
      hasAboutPage={hasAboutPage}
      open={open}
      onShowAbout={onShowAbout}
      onShowServerList={onShowServerList}
      onShowSettings={onShowSettings}
      onShowPlaylist={onShowPlaylist}
      onDrawerClose={onClose}
    />
  );
}

export default DrawerMenuContainer;
