import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

const VideoProgressBar = ({
  media,
  seek,
}) => (
  <div className="Video-overlay Video-progress">
    <LinearProgress
      variant="determinate"
      color="primary"
      value={((seek - media.start) / (media.end - media.start)) * 100}
    />
  </div>
);

VideoProgressBar.propTypes = {
  media: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  seek: PropTypes.number.isRequired,
};

export default VideoProgressBar;
