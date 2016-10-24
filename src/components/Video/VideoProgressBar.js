import * as React from 'react';
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
  muiTheme: React.PropTypes.object.isRequired,
  media: React.PropTypes.shape({
    start: React.PropTypes.number.isRequired,
    end: React.PropTypes.number.isRequired
  }).isRequired,
  seek: React.PropTypes.number.isRequired
};

export default muiThemeable()(VideoProgressBar);
