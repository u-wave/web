import cx from 'classnames';
import React from 'react';
import Slider from 'material-ui/lib/slider';
import VolumeDownIcon from 'material-ui/lib/svg-icons/av/volume-down';
import VolumeMuteIcon from 'material-ui/lib/svg-icons/av/volume-mute';
import VolumeOffIcon from 'material-ui/lib/svg-icons/av/volume-off';
import VolumeUpIcon from 'material-ui/lib/svg-icons/av/volume-up';
import muiThemeable from 'material-ui/lib/muiThemeable';

@muiThemeable
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

  handleVolumeChange(e, volume) {
    this.props.onVolumeChange(volume);
  }

  handleMuteClick() {
    if (this.props.muted) {
      this.props.onUnmute();
    } else {
      this.props.onMute();
    }
  }

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
          color={this.props.muiTheme.rawTheme.palette.textColor}
          onClick={::this.handleMuteClick}
        />
        <div className="VolumeSlider-slider">
          <Slider
            name="volume"
            min={0}
            max={100}
            defaultValue={this.props.volume}
            style={{ marginTop: 3, marginBottom: 3 }}
            onChange={::this.handleVolumeChange}
          />
        </div>
      </div>
    );
  }
}
