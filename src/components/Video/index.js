import cx from 'classnames';
import isEqual from 'is-equal-shallow';
import React, { Component, PropTypes } from 'react';
import SoundCloudPlayer from './SoundCloudPlayer';
import YouTubePlayer from './YouTubePlayer';

const sources = [
  [ 'youtube', YouTubePlayer ],
  [ 'soundcloud', SoundCloudPlayer ]
];

export default class Video extends Component {
  static propTypes = {
    enabled: PropTypes.bool,
    size: PropTypes.string,
    volume: PropTypes.number,
    isMuted: PropTypes.bool,
    historyID: PropTypes.string,
    media: PropTypes.object,
    startTime: PropTypes.number
  };

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props);
  }

  render() {
    const {
      enabled, size,
      volume, isMuted,
      media, startTime
    } = this.props;

    if (!media) {
      return <div className="Video" />;
    }

    const seek = Math.round((Date.now() - startTime) / 1000);
    const props = {
      enabled,
      media, seek, size,
      volume: isMuted ? 0 : volume
    };

    return (
      <div className={cx('Video', `Video--${media.sourceType}`, `Video--${size}`)}>
        {sources.map(([ type, Player ]) => (
          <Player
            key={type}
            {...props}
            active={media.sourceType === type}
          />
        ))}
      </div>
    );
  }
}
