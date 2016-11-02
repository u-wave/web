import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import FullscreenIcon from 'material-ui/svg-icons/navigation/fullscreen';

import VideoSizeButton from './VideoSizeButton';

const VideoToolbar = ({
  children,
  onFullscreen
}) => (
  <div className="Video-toolbar">
    {children}
    <VideoSizeButton />
    <IconButton
      onClick={onFullscreen}
      tooltip="Fullscreen"
      tooltipPosition="bottom-left"
    >
      <FullscreenIcon />
    </IconButton>
  </div>
);

VideoToolbar.propTypes = {
  onFullscreen: React.PropTypes.func.isRequired,
  /**
   * Optional further video tools.
   */
  children: React.PropTypes.node
};

export default VideoToolbar;
