import { useTranslator } from '@u-wave/react-translate';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { mdiHistory, mdiMenu } from '@mdi/js';
import SvgIcon from '../../../components/SvgIcon';
import SongTitle from '../../../components/SongTitle';
import Video from '../../containers/Video';
import Chat from '../../containers/Chat';
import DrawerMenu from '../../containers/DrawerMenu';
import UsersDrawer from '../../containers/UsersDrawer';
import VideoDisabledMessage from './VideoDisabledMessage';
import type { Media } from '../../../reducers/booth';

const waitlistIconStyle: React.CSSProperties = {
  fontSize: '125%',
  textAlign: 'center',
};

function getWaitlistLabel(size: number, position: number) {
  if (size > 0) {
    const posText = position !== -1
      ? `${position + 1}/${size}`
      : size;

    return posText;
  }
  return '0';
}

type MainViewProps = {
  media: Media | null,
  videoEnabled: boolean,
  waitlistPosition: number,
  waitlistSize: number,
  onOpenRoomHistory: () => void,
  onOpenDrawer: () => void,
  onOpenWaitlist: () => void,
  onEnableVideo: () => void,
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
}: MainViewProps) {
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
            <SvgIcon path={mdiMenu} />
          </IconButton>
          <Typography variant="h6" className="MainView-title">
            {title}
          </Typography>
          <IconButton onClick={onOpenRoomHistory}>
            <SvgIcon path={mdiHistory} />
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

export default MainView;
