import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
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
import Overlays from './Overlays';

const { useState } = React;

function MobileApp({
  settings,
  activeOverlay,
  onCloseOverlay,
}) {
  const [dismissedWarning, dismissWarning] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 16,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 16,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <DndContext sensors={sensors}>
      <div className={cx('App', 'MobileApp', 'is-mobile', settings.videoEnabled && 'MobileApp--videoEnabled')}>
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
    </DndContext>
  );
}

MobileApp.propTypes = {
  settings: PropTypes.shape({
    videoEnabled: PropTypes.bool.isRequired,
  }).isRequired,
  activeOverlay: PropTypes.string,
  onCloseOverlay: PropTypes.func.isRequired,
};

export default MobileApp;
