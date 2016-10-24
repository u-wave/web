import cx from 'classnames';
import isEqual from 'is-equal-shallow';
import * as React from 'react';

import injectMediaSources from '../../utils/injectMediaSources';

import VideoProgressBar from './VideoProgressBar';
import VideoToolbar from './VideoToolbar';

@injectMediaSources()
export default class Video extends React.Component {
  static propTypes = {
    getAllMediaSources: React.PropTypes.func.isRequired,
    isFullscreen: React.PropTypes.bool,
    enabled: React.PropTypes.bool,
    size: React.PropTypes.string,
    volume: React.PropTypes.number,
    isMuted: React.PropTypes.bool,
    media: React.PropTypes.object,
    seek: React.PropTypes.number,
    onFullscreen: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props);
  }

  render() {
    const {
      getAllMediaSources,
      isFullscreen,
      enabled,
      size,
      volume,
      isMuted,
      media,
      seek,
      onFullscreen
    } = this.props;

    if (!media) {
      return <div className="Video" />;
    }

    const props = {
      enabled,
      media,
      seek,
      mode: size,
      volume: isMuted ? 0 : volume
    };

    const sources = getAllMediaSources();
    const players = Object.keys(sources).map((sourceType) => {
      if (sources[sourceType].Player) {
        const { Player } = sources[sourceType];
        return (
          <Player
            key={sourceType}
            {...props}
            active={media.sourceType === sourceType}
          />
        );
      }
      return null;
    }).filter(Boolean);

    return (
      <div className={cx('Video', `Video--${media.sourceType}`, `Video--${size}`)}>
        {isFullscreen && (
          <VideoProgressBar
            media={media}
            seek={seek}
          />
        )}
        {!isFullscreen && (
          <VideoToolbar
            onFullscreen={onFullscreen}
          />
        )}
        {players}
      </div>
    );
  }
}
