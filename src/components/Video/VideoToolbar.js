import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EnterFullscreenIcon from '@mui/icons-material/Fullscreen';
import ExitFullscreenIcon from '@mui/icons-material/FullscreenExit';

import VideoSizeButton from './VideoSizeButton';

const renderFullscreenIcon = (isFullscreen) => (
  isFullscreen ? <ExitFullscreenIcon /> : <EnterFullscreenIcon />
);

const VideoToolbar = ({
  t,
  children,
  isFullscreen,
  onFullscreenEnter,
  onFullscreenExit,
}) => (
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

VideoToolbar.propTypes = {
  t: PropTypes.func.isRequired,
  onFullscreenEnter: PropTypes.func.isRequired,
  onFullscreenExit: PropTypes.func.isRequired,
  isFullscreen: PropTypes.bool,
  /**
   * Optional further video tools.
   */
  children: PropTypes.node,
};

export default translate()(VideoToolbar);
