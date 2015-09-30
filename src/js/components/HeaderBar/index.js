import assign from 'object-assign';
import cx from 'classnames';
import React from 'react';
import CurrentMediaStore from '../../stores/CurrentMediaStore';
import VolumeStore from '../../stores/VolumeStore';
import Progress from './Progress';
import SongTitle from '../SongTitle';
import Volume from './Volume';

function getState() {
  const startTime = CurrentMediaStore.getStartTime();
  const media = CurrentMediaStore.getMedia();
  const volume = VolumeStore.getVolume();
  const muted = VolumeStore.isMuted();
  return {
    startTime: startTime,
    total: media ? media.end - media.start : 0,
    media: media,
    volume: volume,
    muted: muted
  };
}

export default class HeaderBar extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    title: React.PropTypes.string
  };

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  state = getState();

  componentDidMount() {
    CurrentMediaStore.on('change', this.onChange);
    VolumeStore.on('change', this.onChange);
  }

  componentWillUnmount() {
    CurrentMediaStore.removeListener('change', this.onChange);
    VolumeStore.removeListener('change', this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    const props = assign({}, this.props, {
      className: cx('HeaderBar', this.props.className)
    });
    const media = this.state.media;
    return (
      <div {...props}>
        <h1 className="HeaderBar-title">{props.title}</h1>
        <SongTitle
          className="HeaderBar-now-playing"
          artist={media.artist}
          title={media.title}
        />
        <Progress
          className="HeaderBar-progress"
          total={this.state.total}
          startTime={this.state.startTime}
        />
        <Volume
          className="HeaderBar-volume"
          volume={this.state.volume}
          muted={this.state.muted}
        />
      </div>
    );
  }
}
