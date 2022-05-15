import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EnterFullscreenIcon from '@mui/icons-material/Fullscreen';
import ExitFullscreenIcon from '@mui/icons-material/FullscreenExit';

import VideoSizeButton from './VideoSizeButton';

const renderFullscreenIcon = (isFullscreen) => (
  isFullscreen ? <ExitFullscreenIcon /> : <EnterFullscreenIcon />
);

function VideoToolbar({
  children,
  isFullscreen,
  onFullscreenEnter,
  onFullscreenExit,
}) {
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
          {renderFullscreenIcon(isFullscreen)}
        </IconButton>
      </Tooltip>
    </div>
  );
}

VideoToolbar.propTypes = {
  onFullscreenEnter: PropTypes.func.isRequired,
  onFullscreenExit: PropTypes.func.isRequired,
  isFullscreen: PropTypes.bool,
  /**
   * Optional further video tools.
   */
  children: PropTypes.node,
};

export default VideoToolbar;
