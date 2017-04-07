import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';
import muiThemeable from 'material-ui/styles/muiThemeable';

const VideoProgressBar = ({
  muiTheme,
  media,
  seek
}) => (
  <div className="Video-progress">
    <LinearProgress
      mode="determinate"
      color={muiTheme.palette.primary1Color}
      min={media.start}
      max={media.end}
      value={seek - media.start}
    />
  </div>
);

VideoProgressBar.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  media: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired
  }).isRequired,
  seek: PropTypes.number.isRequired
};

export default muiThemeable()(VideoProgressBar);
