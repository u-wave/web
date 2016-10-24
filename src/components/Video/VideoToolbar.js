import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import FullscreenIcon from 'material-ui/svg-icons/navigation/fullscreen';

const VideoToolbar = ({
  onFullscreen
}) => (
  <div className="Video-toolbar">
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
  onFullscreen: React.PropTypes.func.isRequired
};

export default VideoToolbar;
