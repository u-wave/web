import cx from 'classnames';
import React from 'react';
import SoundCloudAudio from 'soundcloud-audio';
import VideoBackdrop from './VideoBackdrop';

const debug = require('debug')('uwave:component:video:soundcloud');

const CLIENT_ID = '9d883cdd4c3c54c6dddda2a5b3a11200';

const sc = new SoundCloudAudio(CLIENT_ID);
sc.audio.autoplay = true;

function getTrack(media, cb) {
  sc._jsonp(`${sc._baseUrl}/tracks/${media.sourceID}.json?client_id=${CLIENT_ID}`, data => {
    sc._track = data;
    cb(data);
  });
}

export default class SoundCloudPlayer extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    media: React.PropTypes.object,
    seek: React.PropTypes.number,
    volume: React.PropTypes.number
  };

  state = { track: null };

  componentDidMount() {
    this.play();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.media.sourceID !== this.props.media.sourceID) {
      this.play();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.volume !== this.props.volume) {
      sc.audio.volume = this.props.volume / 100;
    }
  }

  play() {
    this.setState({ track: null });
    getTrack(this.props.media, track => {
      this.setState({ track: track });
      sc.play();
      debug('currentTime', this.props.seek);
      sc.audio.currentTime = this.props.seek;
      sc.audio.volume = this.props.volume / 100;
    });
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
        <img
          className="SoundCloudPlayer-art"
          src={track.artwork_url}
          alt=""
        />
        <a
          href={user.permalink_url}
          target="_blank"
          className="SoundCloudPlayer-uploader"
        >
          Uploaded by {user.username}
        </a>
        <a
          href={track.permalink_url}
          target="_blank"
          className="SoundCloudPlayer-permalink"
        >
          View on SoundCloud
        </a>
      </div>
    );
  }
}
