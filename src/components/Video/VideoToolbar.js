import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import IconButton from 'material-ui/IconButton';
import EnterFullscreenIcon from 'material-ui/svg-icons/navigation/fullscreen';
import ExitFullscreenIcon from 'material-ui/svg-icons/navigation/fullscreen-exit';

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
    <IconButton
      onClick={isFullscreen ? onFullscreenExit : onFullscreenEnter}
      tooltip={isFullscreen
        ? t('settings.disableFullscreen')
        : t('settings.enableFullscreen')
      }
      tooltipPosition="bottom-left"
    >
      {renderFullscreenIcon(isFullscreen)}
    </IconButton>
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
