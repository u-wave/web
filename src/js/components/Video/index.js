import cx from 'classnames';
import isEqual from 'is-equal-shallow';
import React from 'react';
import YouTube from 'react-youtube';
import CurrentMediaStore from '../../stores/CurrentMediaStore';
import VolumeStore from '../../stores/VolumeStore';

const debug = require('debug')('uwave:component:video');

function getState() {
  return {
    volume: VolumeStore.isMuted() ? 0 : VolumeStore.getVolume(),
    media: CurrentMediaStore.getMedia(),
    startTime: CurrentMediaStore.getStartTime()
  };
}

export default class Video extends React.Component {

  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }

  state = getState();

  componentDidMount() {
    CurrentMediaStore.on('change', this._onChange);
    VolumeStore.on('change', this._onChange);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.volume !== this.state.volume ||
      !isEqual(nextState.media, this.state.media);
  }

  componentDidUpdate(prevProps, prevState) {
    const { youtube } = this.refs;
    if (youtube) {
      // only set volume after the YT API is fully initialised.
      // if it fails here because the API isn't ready, the the volume will still
      // be set in onYTReady().
      if (youtube._internalPlayer && prevState.volume !== this.state.volume) {
        debug('YT: setting volume', this.state);
        youtube._internalPlayer.setVolume(this.state.volume);
      }
    }
  }

  componentWillUnmount() {
    CurrentMediaStore.removeListener('change', this._onChange);
    VolumeStore.removeListener('change', this._onChange);
  }

  onYTReady(event) {
    event.target.setVolume(this.state.volume);
  }

  _onChange() {
    this.setState(getState());
  }

  render() {
    const { media, startTime } = this.state;
    let video = '';

    const seek = Math.round((Date.now() - startTime) / 1000);

    switch (media.sourceType) {
    case 'youtube':
      const ytOpts = {
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          showinfo: 0,
          start: (seek || 0) + (media.start || 0)
        }
      };
      const ytUrl = `https://youtube.com/watch?v=${media.sourceID}`;
      video = (
        <YouTube
          ref="youtube"
          url={ytUrl}
          opts={ytOpts}
          onReady={this.onYTReady.bind(this)}
        />
      );
      break;
    default:
      // empty
    }

    return (
      <div className={cx('Video', `Video--${media.sourceType}`)}>
        {video}
      </div>
    );
  }

}
