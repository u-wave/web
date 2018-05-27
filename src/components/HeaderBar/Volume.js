import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import Slider from '@material-ui/lab/Slider';

export default class Volume extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    volume: PropTypes.number,
    muted: PropTypes.bool,

    onVolumeChange: PropTypes.func,
    onMute: PropTypes.func,
    onUnmute: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.volume !== nextProps.volume ||
      this.props.muted !== nextProps.muted;
  }

  handleVolumeChange = (e, volume) => {
    this.props.onVolumeChange(volume);
  };

  handleMuteClick = () => {
    if (this.props.muted) {
      this.props.onUnmute();
    } else {
      this.props.onMute();
    }
  };

  render() {
    let VolumeIcon = VolumeUpIcon;
    if (this.props.muted) {
      VolumeIcon = VolumeOffIcon;
    } else if (this.props.volume === 0) {
      VolumeIcon = VolumeMuteIcon;
    } else if (this.props.volume < 50) {
      VolumeIcon = VolumeDownIcon;
    }
    return (
      <div className={cx('VolumeSlider', this.props.className)}>
        <IconButton onClick={this.handleMuteClick}>
          <VolumeIcon />
        </IconButton>
        <div className="VolumeSlider-slider">
          <Slider
            min={0}
            max={100}
            step={1}
            value={this.props.volume}
            onChange={this.handleVolumeChange}
          />
        </div>
      </div>
    );
  }
}
