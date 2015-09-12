import React from 'react';
import YouTube from 'react-youtube';
import CurrentMediaStore from '../../stores/CurrentMediaStore';
import VolumeStore from '../../stores/VolumeStore';
import styles from './style.css';

function getState() {
  return {
    volume: VolumeStore.getVolume(),
    media: CurrentMediaStore.getMedia()
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

  componentDidUpdate() {
    const { youtube } = this.refs;
    if (youtube) {
      // only set volume after the YT API is fully initialised.
      // if it fails here because the API isn't ready, the the volume will still
      // be set in onYTReady().
      if (youtube._internalPlayer) {
        youtube._internalPlayer.setVolume(this.state.volume);
      }
    }
  }

  componentWillUnmount() {
    CurrentMediaStore.off('change', this._onChange);
    VolumeStore.off('change', this._onChange);
  }

  onYTReady(event) {
    event.target.setVolume(this.state.volume);
  }

  _onChange() {
    this.setState(getState());
  }

  render() {
    const { media } = this.state;
    let video = '';

    switch (media.source) {
    case 'youtube':
      video = (
        <YouTube
          ref="youtube"
          url={'https://youtube.com/watch?v=' + media.id}
          opts={{
            playerVars: {
              autoplay: 1,
              controls: 0,
              rel: 0,
              showinfo: 0,
              start: 0
            }
          }}
          onReady={this.onYTReady.bind(this)}
        />
      );
      break;
    default:
      // empty
    }

    return (
      <div className={styles.video}>
        {video}
      </div>
    );
  }

}
