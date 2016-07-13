import cx from 'classnames';
import * as React from 'react';
import Slider from 'material-ui/Slider';
import VolumeDownIcon from 'material-ui/svg-icons/av/volume-down';
import VolumeMuteIcon from 'material-ui/svg-icons/av/volume-mute';
import VolumeOffIcon from 'material-ui/svg-icons/av/volume-off';
import VolumeUpIcon from 'material-ui/svg-icons/av/volume-up';
import muiThemeable from 'material-ui/styles/muiThemeable';

const sliderStyle = {
  // The material-ui Slider has a 24px margin on top that we can't override,
  // but we can compensate for it here.
  // TODO Do this properly when/if material-ui gets a better styling solution.
  marginTop: -21,
  marginBottom: 3
};

@muiThemeable()
export default class Volume extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    volume: React.PropTypes.number,
    muted: React.PropTypes.bool,

    onVolumeChange: React.PropTypes.func,
    onMute: React.PropTypes.func,
    onUnmute: React.PropTypes.func,
    muiTheme: React.PropTypes.object.isRequired
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
    const {
      muiTheme,
      className,
      muted,
      volume
    } = this.props;

    let VolumeIcon = VolumeUpIcon;
    if (muted) {
      VolumeIcon = VolumeOffIcon;
    } else if (volume === 0) {
      VolumeIcon = VolumeMuteIcon;
    } else if (volume < 50) {
      VolumeIcon = VolumeDownIcon;
    }

    return (
      <div className={cx('VolumeSlider', className)}>
        <VolumeIcon
          color={muiTheme.palette.textColor}
          onClick={this.handleMuteClick}
        />
        <div className="VolumeSlider-slider">
          <Slider
            name="volume"
            min={0}
            max={100}
            defaultValue={volume}
            style={sliderStyle}
            onChange={this.handleVolumeChange}
          />
        </div>
      </div>
    );
  }
}
