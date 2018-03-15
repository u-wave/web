import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/Slider';
import VolumeDownIcon from 'material-ui/svg-icons/av/volume-down';
import VolumeMuteIcon from 'material-ui/svg-icons/av/volume-mute';
import VolumeOffIcon from 'material-ui/svg-icons/av/volume-off';
import VolumeUpIcon from 'material-ui/svg-icons/av/volume-up';

const sliderStyle = {
  // The material-ui Slider has a 24px margin on top that we can't override,
  // but we can compensate for it here.
  // TODO Do this properly when/if material-ui gets a better styling solution.
  marginTop: -21,
  marginBottom: 3,
};

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
        <VolumeIcon
          color="#fff"
          onClick={this.handleMuteClick}
        />
        <div className="VolumeSlider-slider">
          <Slider
            name="volume"
            min={0}
            max={100}
            value={this.props.volume}
            style={sliderStyle}
            onChange={this.handleVolumeChange}
          />
        </div>
      </div>
    );
  }
}
