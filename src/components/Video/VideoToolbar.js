import * as React from 'react';
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
  onFullscreenExit
}) => (
  <div className="Video-toolbar">
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
  t: React.PropTypes.func.isRequired,
  onFullscreenEnter: React.PropTypes.func.isRequired,
  onFullscreenExit: React.PropTypes.func.isRequired,
  isFullscreen: React.PropTypes.bool,
  /**
   * Optional further video tools.
   */
  children: React.PropTypes.node
};

export default translate()(VideoToolbar);
