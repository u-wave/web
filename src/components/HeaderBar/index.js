import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import Progress from './Progress';
import SongTitle from '../SongTitle';
import VolumeContainer from './VolumeContainer';

export default class HeaderBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    currentTime: PropTypes.number,

    dj: PropTypes.object,
    media: PropTypes.object,
    mediaDuration: PropTypes.number,
    mediaStartTime: PropTypes.number
  };

  render() {
    const {
      className, title, currentTime,
      dj, media, mediaDuration, mediaStartTime,
      ...props
    } = this.props;

    const nowPlaying = media
      ? <SongTitle
          artist={media.artist}
          title={media.title}
        />
      : 'Nobody is playing!';

    return (
      <div
        className={cx('HeaderBar', className)}
        {...props}
      >
        <h1 className="HeaderBar-title">{title}</h1>
        <div className="HeaderBar-now-playing">
          {nowPlaying}
        </div>
        {dj && (
          <div className="HeaderBar-dj">
            played by: {dj.username}
          </div>
        )}
        <Progress
          className="HeaderBar-progress"
          duration={mediaDuration}
          startTime={mediaStartTime}
          currentTime={currentTime}
        />
        <div className="HeaderBar-volume">
          <VolumeContainer />
        </div>
      </div>
    );
  }
}
