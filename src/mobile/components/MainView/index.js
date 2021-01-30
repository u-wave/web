import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HistoryIcon from '@material-ui/icons/History';
import MenuIcon from '@material-ui/icons/Menu';
import SongTitle from '../../../components/SongTitle';
import Video from '../../containers/Video';
import Chat from '../../containers/Chat';
import DrawerMenu from '../../containers/DrawerMenu';
import UsersDrawer from '../../containers/UsersDrawer';
import VideoDisabledMessage from './VideoDisabledMessage';

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

function MainView({
  media,
  videoEnabled,
  waitlistPosition,
  waitlistSize,
  onOpenRoomHistory,
  onOpenDrawer,
  onOpenWaitlist,
  onEnableVideo,
}) {
  const { t } = useTranslator();

  let title = t('booth.empty');
  if (media) {
    title = <SongTitle artist={media.artist} title={media.title} />;
  }

  return (
    <div className="MainView">
      <AppBar position="static" className="MainView-appBar">
        <Toolbar>
          <IconButton aria-label="Menu" onClick={onOpenDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="MainView-title">
            {title}
          </Typography>
          <IconButton onClick={onOpenRoomHistory}>
            <HistoryIcon />
          </IconButton>
          <IconButton style={waitlistIconStyle} onClick={onOpenWaitlist}>
            {getWaitlistLabel(waitlistSize, waitlistPosition)}
          </IconButton>
        </Toolbar>
      </AppBar>

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
}

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

export default MainView;
