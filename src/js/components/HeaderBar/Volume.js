import cx from 'classnames';
import React from 'react';
import { setVolume, mute, unmute } from '../../actions/PlaybackActionCreators';
import Icon from '../Icon';

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
    let icon = 'volume_up';
    if (this.props.muted) {
      icon = 'volume_off';
    } else if (this.props.volume === 0) {
      icon = 'volume_mute';
    } else if (this.props.volume < 50) {
      icon = 'volume_down';
    }
    return (
      <div className={cx('VolumeSlider', this.props.className)}>
        <Icon
          name={icon}
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
