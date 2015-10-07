import cx from 'classnames';
import isEqual from 'is-equal-shallow';
import React from 'react';
import CurrentMediaStore from '../../stores/CurrentMediaStore';
import VolumeStore from '../../stores/VolumeStore';
import listen from '../../utils/listen';
import YouTubePlayer from './YouTubePlayer';

function getState() {
  return {
    volume: VolumeStore.isMuted() ? 0 : VolumeStore.getVolume(),
    media: CurrentMediaStore.getMedia(),
    startTime: CurrentMediaStore.getStartTime()
  };
}

@listen(CurrentMediaStore, VolumeStore)
export default class Video extends React.Component {
  static propTypes = {
    size: React.PropTypes.string
  };

  state = getState();

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.volume !== this.state.volume ||
      nextProps.size !== this.props.size ||
      !isEqual(nextState.media, this.state.media);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    const { size } = this.props;
    const { media, startTime, volume } = this.state;
    let video = '';

    const seek = Math.round((Date.now() - startTime) / 1000);

    const props = { media, seek, size, volume };

    switch (media.sourceType) {
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
