import cx from 'classnames';
import React from 'react';
import { setVolume } from '../../actions/PlaybackActionCreators';

export default class Volume extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    volume: React.PropTypes.number
  }

  onChange(e) {
    const volume = parseInt(e.target.value, 10);
    setVolume(volume);
  }

  render() {
    return (
      <div className={cx('VolumeSlider', this.props.className)}>
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
