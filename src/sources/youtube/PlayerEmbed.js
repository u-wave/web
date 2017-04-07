import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import createDebug from 'debug';

const debug = createDebug('uwave:component:video:youtube');

export default class YouTubePlayerEmbed extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    media: PropTypes.object,
    seek: PropTypes.number,
    volume: PropTypes.number,
    showControls: PropTypes.bool
  };

  static defaultProps = {
    showControls: false
  };

  componentWillReceiveProps(nextProps) {
    const player = this.player;
    if (player) {
      // only set volume after the YT API is fully initialised.
      // if it fails here because the API isn't ready, the the volume will still
      // be set in onYTReady().
      if (player.internalPlayer && this.props.volume !== nextProps.volume) {
        debug('YT: setting volume', nextProps.volume);
        player.internalPlayer.setVolume(nextProps.volume);
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

  handleYTReady = (event) => {
    event.target.setVolume(this.props.volume);
    event.target.setPlaybackRate(1);
  };

  handleYTPause = (event) => {
    event.target.playVideo();
  };

  refPlayer = (player) => {
    this.player = player;
  };

  render() {
    const { active, media, seek, showControls } = this.props;

    const opts = {
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 1,
        controls: showControls ? 1 : 0,
        rel: 0,             // do not show related videos after the video finishes
        showinfo: 0,        // do not show video title etc in the frame
        iv_load_policy: 3,  // disable annotations
        modestbranding: 1,  // hide youtube logo
        start: (seek || 0) + (media.start || 0),
        end: media.end || media.duration
      }
    };

    return (
      <YouTube
        ref={this.refPlayer}
        videoId={active ? media.sourceID : null}
        opts={opts}
        onReady={this.handleYTReady}
        onPause={this.handleYTPause}
      />
    );
  }
}
