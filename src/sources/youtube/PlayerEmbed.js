import React from 'react';
import PropTypes from 'prop-types';
import YouTube from '@u-wave/react-youtube';

const debug = require('debug')('uwave:component:video:youtube');

class YouTubePlayerEmbed extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    media: PropTypes.object,
    seek: PropTypes.number,
    volume: PropTypes.number,
    controllable: PropTypes.bool,
    preferredQuality: PropTypes.string,
    onQualityLevels: PropTypes.func.isRequired,
    onQualityChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    controllable: false,
    preferredQuality: 'default'
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
      if (player.internalPlayer && this.props.preferredQuality !== nextProps.preferredQuality) {
        debug('YT: setting quality', nextProps.preferredQuality);
        player.internalPlayer.setPlaybackQuality(nextProps.preferredQuality);
      }
    }
  }

  handleYTReady = (event) => {
    event.target.setVolume(this.props.volume);
    event.target.setPlaybackRate(1);
    event.target.setPlaybackQuality(this.props.preferredQuality);
  };

  handleYTPause = (event) => {
    if (!this.props.controllable) {
      event.target.playVideo();
    }
  };

  handleYTStateChange = (event) => {
    const levels = event.target.getAvailableQualityLevels();
    this.props.onQualityLevels(levels);
  };

  handleYTQualityChange = (event) => {
    this.props.onQualityChange(event.data);
  };

  refPlayer = (player) => {
    this.player = player;
  };

  render() {
    const {
      active,
      media,
      seek,
      volume,
      controllable,
      preferredQuality
    } = this.props;

    return (
      <YouTube
        ref={this.refPlayer}
        video={active ? media.sourceID : null}
        width="100%"
        height="100%"
        autoplay
        modestBranding
        volume={volume / 100}
        playbackRate={1}
        suggestedQuality={preferredQuality}
        controls={controllable}
        showRelatedVideos={false}
        showInfo={false}
        annotations={false}
        startSeconds={(seek || 0) + (media.start || 0)}
        endSeconds={media.end || media.duration}
        onPause={this.handleYTPause}
        onStateChange={this.handleYTStateChange}
        onPlaybackQualityChange={this.handleYTQualityChange}
      />
    );
  }
}

export default YouTubePlayerEmbed;
