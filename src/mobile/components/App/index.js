import cx from 'classnames';
import React from 'react';
import compose from 'recompose/compose';
import toClass from 'recompose/toClass';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ErrorArea from '../../../containers/ErrorArea';
import PlaylistManager from '../../../containers/PlaylistManager';
import RoomHistory from '../../../containers/RoomHistory';
import SettingsManager from '../../../containers/SettingsManager';
import Dialogs from '../../../components/Dialogs';
import AddToPlaylistMenu from '../../../containers/AddToPlaylistMenu';
import DragLayer from '../../../containers/DragLayer';
import MainView from '../../containers/MainView';

import Overlays from './Overlays';

const MobileApp = ({
  settings,
  activeOverlay,
  onCloseOverlay
}) => (
  <div className={cx('App', 'MobileApp', 'is-mobile', settings.videoEnabled && 'MobileApp--videoEnabled')}>
    <MainView />

    <ErrorArea />

    <Overlays transitionName="Overlay" active={activeOverlay}>
      <PlaylistManager
        key="playlistManager"
        onCloseOverlay={onCloseOverlay}
      />
      <RoomHistory
        key="roomHistory"
        onCloseOverlay={onCloseOverlay}
      />
      <SettingsManager
        key="settings"
        onCloseOverlay={onCloseOverlay}
      />
    </Overlays>

    <Dialogs />

    <AddToPlaylistMenu />
    <DragLayer />
  </div>
);

MobileApp.propTypes = {
  settings: React.PropTypes.shape({
    videoEnabled: React.PropTypes.bool.isRequired
  }).isRequired,
  activeOverlay: React.PropTypes.string,
  onCloseOverlay: React.PropTypes.func.isRequired
};

export default compose(
  DragDropContext(HTML5Backend),
  toClass
)(MobileApp);
