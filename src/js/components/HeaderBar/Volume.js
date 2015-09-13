import cx from 'classnames';
import React from 'react';
import { setVolume } from '../../actions/PlaybackActionCreators';
import VolumeStore from '../../stores/VolumeStore';

export default class Volume extends React.Component {

  static propTypes = {
    className: React.PropTypes.string
  }

  state = { volume: VolumeStore.getVolume() }

  onChange() {
    const { value } = this.refs;
    const input = value.getDOMNode();
    const volume = parseInt(input.value, 10);
    setVolume(volume);
    this.setState({ volume });
  }

  render() {
    return (
      <div className={cx('VolumeSlider', this.props.className)}>
        <input
          ref="value"
          type="range"
          min="0"
          max="100"
          value={VolumeStore.getVolume()}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}
