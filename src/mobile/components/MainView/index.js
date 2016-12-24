import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import SongTitle from '../../../components/SongTitle';
import Video from '../../../containers/Video';
import Chat from '../../containers/Chat';
import DrawerMenu from '../../containers/DrawerMenu';

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

const MainView = ({
  media,
  waitlistPosition,
  waitlistSize,
  onOpenRoomHistory,
  onOpenDrawer
}) => (
  <div className="MainView">
    <AppBar
      style={appBarStyle}
      titleStyle={appTitleStyle}
      iconStyleLeft={appBarIconStyle}
      title={media ? (
        <SongTitle artist={media.artist} title={media.title} />
      ) : 'Nobody is DJing!'}
      iconElementRight={
        <FlatButton
          style={appBarIconStyle}
          label={`${waitlistPosition}/${waitlistSize}`}
          onTouchTap={() => alert('Open waitlist')}
        />
      }

      onTitleTouchTap={onOpenRoomHistory}
      onLeftIconButtonTouchTap={onOpenDrawer}
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
  </div>
);

MainView.propTypes = {
  media: React.PropTypes.object,
  waitlistPosition: React.PropTypes.number.isRequired,
  waitlistSize: React.PropTypes.number.isRequired,
  onOpenRoomHistory: React.PropTypes.func.isRequired,
  onOpenDrawer: React.PropTypes.func.isRequired
};

export default MainView;
