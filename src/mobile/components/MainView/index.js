import * as React from 'react';
import withHandlers from 'recompose/withHandlers';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SongTitle from '../../../components/SongTitle';
import Video from '../../../containers/Video';
import Chat from '../../containers/Chat';
import DrawerMenu from '../../containers/DrawerMenu';
import UsersDrawer from '../../containers/UsersDrawer';

const appBarStyle = {
  zIndex: 5 // Below overlays.
};
const appTitleStyle = {
  height: 56,
  lineHeight: '56px'
};
const appBarIconStyle = {
  marginTop: 4
};

const waitlistIconStyle = {
  fontSize: '125%',
  textAlign: 'center'
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
  }
});

const MainView = ({
  media,
  waitlistPosition,
  waitlistSize,
  onOpenRoomHistory,
  onOpenDrawer,
  onOpenWaitlist
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

      onTitleTouchTap={onOpenRoomHistory}
      onLeftIconButtonTouchTap={onOpenDrawer}
      onRightIconButtonTouchTap={onOpenWaitlist}
    />

    <div className="MainView-content">
      <div className="MobileApp-video">
        <Video
          enabled
          size="large"
        />
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
  media: React.PropTypes.object,
  waitlistPosition: React.PropTypes.number.isRequired,
  waitlistSize: React.PropTypes.number.isRequired,
  onOpenRoomHistory: React.PropTypes.func.isRequired,
  onOpenWaitlist: React.PropTypes.func.isRequired,
  onOpenDrawer: React.PropTypes.func.isRequired
};

export default enhance(MainView);
