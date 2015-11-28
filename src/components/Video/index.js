import cx from 'classnames';
import isEqual from 'is-equal-shallow';
import React from 'react';
import CurrentMediaStore from '../../stores/CurrentMediaStore';
import listen from '../../utils/listen';
import SoundCloudPlayer from './SoundCloudPlayer';
import YouTubePlayer from './YouTubePlayer';

function getState() {
  return {
    historyID: CurrentMediaStore.getHistoryID(),
    media: CurrentMediaStore.getMedia(),
    startTime: CurrentMediaStore.getStartTime()
  };
}

@listen(CurrentMediaStore)
export default class Video extends React.Component {
  static propTypes = {
    size: React.PropTypes.string,
    volume: React.PropTypes.number,
    isMuted: React.PropTypes.bool
  };

  state = getState();

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props) ||
      nextState.historyID !== this.state.historyID;
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    const { size, volume, isMuted } = this.props;
    const { media, startTime } = this.state;

    if (!media) {
      return <div className="Video" />;
    }

    let video = '';
    const seek = Math.round((Date.now() - startTime) / 1000);
    const props = {
      media, seek, size,
      volume: isMuted ? 0 : volume
    };
    switch (media.sourceType) {
    case 'soundcloud':
      video = <SoundCloudPlayer {...props} />;
      break;
    case 'youtube':
      video = <YouTubePlayer {...props} />;
      break;
    default:
      // empty
    }

    return (
      <div className={cx('Video', `Video--${media.sourceType}`, `Video--${size}`)}>
        {video}
      </div>
    );
  }

}
