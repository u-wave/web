import assign from 'object-assign';
import cx from 'classnames';
import React from 'react';
import CurrentMediaStore from '../../stores/CurrentMediaStore';
import VolumeStore from '../../stores/VolumeStore';
import Progress from './Progress';
import NowPlaying from './NowPlaying';
import Volume from './Volume';

function getState() {
  const elapsed = CurrentMediaStore.getTimeElapsed();
  const media = CurrentMediaStore.getMedia();
  const volume = VolumeStore.getVolume();
  return {
    elapsed: elapsed,
    total: media ? media.end - media.start : 0,
    media: media,
    volume: volume
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
    CurrentMediaStore.off('change', this.onChange);
    VolumeStore.off('change', this.onChange);
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
        <NowPlaying
          className="HeaderBar-now-playing"
          artist={media.artist}
          title={media.title}
        />
        <Progress
          className="HeaderBar-progress"
          total={this.state.total}
          elapsed={this.state.elapsed}
        />
        <Volume
          className="HeaderBar-volume"
          volume={this.state.volume}
        />
      </div>
    );
  }
}
