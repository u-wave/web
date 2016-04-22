import * as React from 'react';
import YouTube from 'react-youtube';

const debug = require('debug')('uwave:component:video:youtube');

export default class YouTubePlayerEmbed extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    media: React.PropTypes.object,
    seek: React.PropTypes.number,
    volume: React.PropTypes.number
  };

  componentWillReceiveProps(nextProps) {
    const { player } = this.refs;
    if (player) {
      // only set volume after the YT API is fully initialised.
      // if it fails here because the API isn't ready, the the volume will still
      // be set in onYTReady().
      if (player._internalPlayer && this.props.volume !== nextProps.volume) {
        debug('YT: setting volume', nextProps.volume);
        player._internalPlayer.setVolume(nextProps.volume);
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    // Only rerender when the media changes. This avoids react-youtube resetting
    // the YouTube player when only the volume changes.
    return this.props.media !== nextProps.media ||
      this.props.media._id !== nextProps.media._id ||
      this.props.active !== nextProps.active;
  }

  handleYTReady = event => {
    event.target.setVolume(this.props.volume);
    event.target.setPlaybackRate(1);
  };

  render() {
    const { active, media, seek } = this.props;

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

    return (
      <YouTube
        ref="player"
        videoId={active ? media.sourceID : null}
        opts={opts}
        onReady={this.handleYTReady}
      />
    );
  }
}
