import cx from 'classnames';
import React from 'react';
import SoundCloudAudio from 'soundcloud-audio';
import VideoBackdrop from '../VideoBackdrop';

import SongInfo from './SongInfo';

const debug = require('debug')('uwave:component:video:soundcloud');

const CLIENT_ID = '9d883cdd4c3c54c6dddda2a5b3a11200';

let sc;

function getTrack(media, cb) {
  sc._jsonp(`${sc._baseUrl}/tracks/${media.sourceID}.json?client_id=${CLIENT_ID}`, data => {
    sc._track = data;
    cb(data);
  });
}

export default class SoundCloudPlayer extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    enabled: React.PropTypes.bool,
    media: React.PropTypes.object,
    seek: React.PropTypes.number,
    volume: React.PropTypes.number
  };

  state = { track: null };

  componentWillMount() {
    if (!sc && typeof document !== 'undefined') {
      sc = new SoundCloudAudio(CLIENT_ID);
      sc.audio.autoplay = true;
    }
  }

  componentDidMount() {
    this.play();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.volume !== this.props.volume) {
      sc.audio.volume = this.props.volume / 100;
    }
    if (prevProps.media.sourceID !== this.props.media.sourceID ||
        prevProps.enabled !== this.props.enabled) {
      if (this.props.enabled) {
        this.play();
      } else {
        this.stop();
      }
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  play() {
    this.setState({ track: null });
    if (this.props.enabled) {
      // In Firefox we have to wait for the "canplaythrough" event before
      // seeking.
      // http://stackoverflow.com/a/34970444
      const doSeek = () => {
        sc.audio.currentTime = this.props.seek + (this.props.media.start || 0);
        sc.audio.volume = this.props.volume / 100;
        sc.audio.removeEventListener('canplaythrough', doSeek, false);
      };

      getTrack(this.props.media, track => {
        this.setState({ track: track });
        debug('currentTime', this.props.seek);
        sc.play();
        sc.audio.addEventListener('canplaythrough', doSeek, false);
      });
    } else {
      this.stop();
    }
  }

  stop() {
    sc.stop();
  }

  render() {
    const { track } = this.state;
    if (!track) {
      return <div className={cx('SoundCloudPlayer', this.props.className)} />;
    }
    const user = track.user;
    return (
      <div className={cx('SoundCloudPlayer', this.props.className)}>
        <VideoBackdrop url={track.artwork_url} />
        <div className="SoundCloudPlayer-meta">
          <div className="SoundCloudPlayer-info">
            <img
              className="SoundCloudPlayer-art"
              src={track.artwork_url}
              alt=""
            />
            <SongInfo
              artist={user.username}
              title={track.title}
              artistUrl={user.permalink_url}
              trackUrl={track.permalink_url}
            />
            <div style={{ clear: 'both' }} />
          </div>
          <a
            href={track.permalink_url}
            target="_blank"
            className="SoundCloudPlayer-permalink"
          >
            View on <img src="assets/img/soundcloud-inline.png" />
          </a>
        </div>
      </div>
    );
  }
}
