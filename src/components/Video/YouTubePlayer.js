import cx from 'classnames';
import React from 'react';
import YouTube from 'react-youtube';
import VideoBackdrop from './VideoBackdrop';

const debug = require('debug')('uwave:component:video:youtube');

export default class YouTubePlayer extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    size: React.PropTypes.string,
    media: React.PropTypes.object,
    seek: React.PropTypes.number,
    volume: React.PropTypes.number
  };

  componentDidUpdate(prevProps) {
    const { player } = this.refs;
    if (player) {
      // only set volume after the YT API is fully initialised.
      // if it fails here because the API isn't ready, the the volume will still
      // be set in onYTReady().
      if (player._internalPlayer && prevProps.volume !== this.props.volume) {
        debug('YT: setting volume', this.props.volume);
        player._internalPlayer.setVolume(this.props.volume);
      }
    }
  }

  onYTReady(event) {
    event.target.setVolume(this.props.volume);
  }

  render() {
    const { className, size, media, seek } = this.props;
    const sizeClass = `YouTubePlayer--${size}`;

    const opts = {
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 1,
        controls: 0,        // do not show player controls in the bottom
        rel: 0,             // do not show related videos after the video finishes
        showinfo: 0,        // do not show video title etc in the frame
        iv_load_policy: 3,  // disable annotations
        modestbranding: 1,  // hide youtube logo
        start: (seek || 0) + (media.start || 0)
      }
    };

    let backdrop;
    if (size === 'small') {
      backdrop = <VideoBackdrop url={media.thumbnail} />;
    }
    // Wrapper span so the backdrop can be full-size…
    return (
      <span>
        {backdrop}
        <div className={cx('YouTubePlayer', sizeClass, className)}>
          <YouTube
            ref="player"
            videoId={media.sourceID}
            opts={opts}
            onReady={::this.onYTReady}
          />
        </div>
      </span>
    );
  }
}
