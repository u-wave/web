import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import EnterFullscreenIcon from 'material-ui-icons/Fullscreen';
import ExitFullscreenIcon from 'material-ui-icons/FullscreenExit';

import VideoSizeButton from './VideoSizeButton';

const renderFullscreenIcon = isFullscreen => (
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
        : t('settings.enableFullscreen')
      }
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
