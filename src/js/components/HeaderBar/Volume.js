import cx from 'classnames';
import React from 'react';
import VolumeDownIcon from 'material-ui/lib/svg-icons/av/volume-down';
import VolumeMuteIcon from 'material-ui/lib/svg-icons/av/volume-mute';
import VolumeOffIcon from 'material-ui/lib/svg-icons/av/volume-off';
import VolumeUpIcon from 'material-ui/lib/svg-icons/av/volume-up';
import { setVolume, mute, unmute } from '../../actions/PlaybackActionCreators';

export default class Volume extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    volume: React.PropTypes.number,
    muted: React.PropTypes.bool
  }

  onChange(e) {
    const volume = parseInt(e.target.value, 10);
    setVolume(volume);
  }

  toggleMute() {
    if (this.props.muted) {
      unmute();
    } else {
      mute();
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
          color="#fff"
          onClick={::this.toggleMute}
        />
        <input
          ref="value"
          type="range"
          min="0"
          max="100"
          value={this.props.volume}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}
