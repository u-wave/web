import React from 'react';
import PropTypes from 'prop-types';
import withHandlers from 'recompose/withHandlers';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SongTitle from '../../../components/SongTitle';
import Video from '../../../containers/Video';
import Chat from '../../containers/Chat';
import DrawerMenu from '../../containers/DrawerMenu';
import UsersDrawer from '../../containers/UsersDrawer';
import VideoDisabledMessage from './VideoDisabledMessage';

const appBarStyle = {
  zIndex: 5, // Below overlays.
};
const appTitleStyle = {
  height: 56,
  lineHeight: '56px',
};
const appBarIconStyle = {
  marginTop: 4,
};

const waitlistIconStyle = {
  fontSize: '125%',
  textAlign: 'center',
};

const getWaitlistLabel = (size, position) => {
  if (size > 0) {
    const posText = position !== -1
      ? `${position + 1}/${size}`
      : size;

    return posText;
  }
  return '0';
};

const enhance = withHandlers({
  // Prevent defaults for react-tap-event-plugin:
  // https://github.com/zilverline/react-tap-event-plugin/issues/77
  onOpenRoomHistory: props => (event) => {
    event.preventDefault();
    props.onOpenRoomHistory();
  },
  onOpenDrawer: props => (event) => {
    event.preventDefault();
    props.onOpenDrawer();
  },
  onOpenWaitlist: props => (event) => {
    event.preventDefault();
    props.onOpenWaitlist();
  },
});

const MainView = ({
  media,
  videoEnabled,
  waitlistPosition,
  waitlistSize,
  onOpenRoomHistory,
  onOpenDrawer,
  onOpenWaitlist,
  onEnableVideo,
}) => (
  <div className="MainView">
    <AppBar
      style={appBarStyle}
      titleStyle={appTitleStyle}
      iconStyleLeft={appBarIconStyle}
      title={media ? (
        <SongTitle artist={media.artist} title={media.title} />
      ) : (
        'Nobody is DJing!'
      )}
      iconStyleRight={appBarIconStyle}
      iconElementRight={
        <IconButton style={waitlistIconStyle}>
          {getWaitlistLabel(waitlistSize, waitlistPosition)}
        </IconButton>
      }

      onTitleClick={onOpenRoomHistory}
      onLeftIconButtonClick={onOpenDrawer}
      onRightIconButtonClick={onOpenWaitlist}
    />

    <div className="MainView-content">
      <div className="MobileApp-video">
        <Video
          enabled={videoEnabled}
          size="large"
        />
        {!videoEnabled && (
          <VideoDisabledMessage onEnableVideo={onEnableVideo} />
        )}
      </div>
      <div className="MobileApp-chat">
        <Chat />
      </div>
    </div>

    <DrawerMenu />
    <UsersDrawer />
  </div>
);

MainView.propTypes = {
  media: PropTypes.object,
  videoEnabled: PropTypes.bool.isRequired,
  waitlistPosition: PropTypes.number.isRequired,
  waitlistSize: PropTypes.number.isRequired,
  onOpenRoomHistory: PropTypes.func.isRequired,
  onOpenWaitlist: PropTypes.func.isRequired,
  onOpenDrawer: PropTypes.func.isRequired,
  onEnableVideo: PropTypes.func.isRequired,
};

export default enhance(MainView);
