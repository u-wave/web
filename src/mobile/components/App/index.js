import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import toClass from 'recompose/toClass';
import withState from 'recompose/withState';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Snackbar from 'material-ui/Snackbar';
import ErrorArea from '../../../containers/ErrorArea';
import PlaylistManager from '../../containers/PlaylistManager';
import RoomHistory from '../../containers/RoomHistory';
import SettingsManager from '../../../containers/SettingsManager';
import Dialogs from '../../../components/Dialogs';
import AddToPlaylistMenu from '../../../containers/AddToPlaylistMenu';
import DragLayer from '../../../containers/DragLayer';
import MainView from '../../containers/MainView';

import Overlays from './Overlays';

const enhance = compose(
  DragDropContext(HTML5Backend),
  toClass,
  withState('dismissedWarning', 'onDismiss', false),
);

const MobileApp = ({
  settings,
  activeOverlay,
  onCloseOverlay,
  dismissedWarning,
  onDismiss,
}) => (
  <div className={cx('App', 'MobileApp', 'is-mobile', settings.videoEnabled && 'MobileApp--videoEnabled')}>
    <MainView />

    <Snackbar
      bodyStyle={{ background: '#151515', height: 64, lineHeight: '24px' }}
      message="Note: The mobile version is in beta and may crash regularly."
      open={!dismissedWarning}
      onRequestClose={() => onDismiss(true)}
    />

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
  settings: PropTypes.shape({
    videoEnabled: PropTypes.bool.isRequired,
  }).isRequired,
  activeOverlay: PropTypes.string,
  onCloseOverlay: PropTypes.func.isRequired,
  // Mobile Beta warning
  dismissedWarning: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default enhance(MobileApp);
