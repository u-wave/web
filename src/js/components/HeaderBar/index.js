import cx from 'classnames';
import React from 'react';
import CurrentMediaStore from '../../stores/CurrentMediaStore';
import VolumeStore from '../../stores/VolumeStore';
import listen from '../../utils/listen';
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

@listen(CurrentMediaStore, VolumeStore)
export default class HeaderBar extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    title: React.PropTypes.string
  };

  state = getState();

  onChange() {
    this.setState(getState());
  }

  render() {
    const { title, ...props } = this.props;
    const media = this.state.media;

    const nowPlaying = media
      ? <SongTitle
          className="HeaderBar-now-playing"
          artist={media.artist}
          title={media.title}
        />
      : <div className="HeaderBar-now-playing">Nobody is playing!</div>;

    return (
      <div
        className={cx('HeaderBar', this.props.className)}
        {...props}
      >
        <h1 className="HeaderBar-title">{title}</h1>
        {nowPlaying}
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
