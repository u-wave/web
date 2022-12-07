import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Snackbar from '@mui/material/Snackbar';
import ErrorArea from '../../../containers/ErrorArea';
import PlaylistManager from '../../containers/PlaylistManager';
import RoomHistory from '../../containers/RoomHistory';
import SettingsManager from '../../../containers/SettingsManager';
import Dialogs from '../../../components/Dialogs';
import AddToPlaylistMenu from '../../../containers/AddToPlaylistMenu';
import DragLayer from '../../../containers/DragLayer';
import MainView from '../../containers/MainView';
import About from '../../containers/About';
import ServerList from '../../containers/ServerList';
import { videoEnabledSelector } from '../../../selectors/settingSelectors';
import Overlays from './Overlays';

const { useState } = React;

function MobileApp({
  activeOverlay,
  onCloseOverlay,
}) {
  const [dismissedWarning, dismissWarning] = useState(false);
  const videoEnabled = useSelector(videoEnabledSelector);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cx('App', 'MobileApp', 'is-mobile', videoEnabled && 'MobileApp--videoEnabled')}>
        <MainView />

        <Snackbar
          open={!dismissedWarning}
          onClose={() => dismissWarning(true)}
          message="Note: The mobile version is in beta and may crash regularly."
        />

        <ErrorArea />

        <Overlays transitionName="Overlay" active={activeOverlay}>
          <About key="about" onCloseOverlay={onCloseOverlay} />
          <ServerList key="serverList" onCloseOverlay={onCloseOverlay} />
          <PlaylistManager key="playlistManager" onCloseOverlay={onCloseOverlay} />
          <RoomHistory key="roomHistory" onCloseOverlay={onCloseOverlay} />
          <SettingsManager key="settings" onCloseOverlay={onCloseOverlay} />
        </Overlays>

        <Dialogs />

        <AddToPlaylistMenu />
        <DragLayer />
      </div>
    </DndProvider>
  );
}

MobileApp.propTypes = {
  activeOverlay: PropTypes.string,
  onCloseOverlay: PropTypes.func.isRequired,
};

export default MobileApp;
