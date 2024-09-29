import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { mdiFullscreen, mdiFullscreenExit } from '@mdi/js';
import SvgIcon from '../SvgIcon';
import VideoSizeButton from './VideoSizeButton';

type VideoToolbarProps = {
  isFullscreen: boolean,
  /** Optional further video tools. */
  children?: React.ReactNode,
  onFullscreenEnter: () => void,
  onFullscreenExit: () => void,
};
function VideoToolbar({
  children,
  isFullscreen,
  onFullscreenEnter,
  onFullscreenExit,
}: VideoToolbarProps) {
  const { t } = useTranslator();

  return (
    <div className="Video-overlay Video-toolbar">
      {children}
      <VideoSizeButton />
      <Tooltip
        title={isFullscreen
          ? t('settings.disableFullscreen')
          : t('settings.enableFullscreen')}
        placement="bottom-end"
      >
        <IconButton onClick={isFullscreen ? onFullscreenExit : onFullscreenEnter}>
          <SvgIcon path={isFullscreen ? mdiFullscreenExit : mdiFullscreen} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default VideoToolbar;
