import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setVolume, mute, unmute } from '../../actions/PlaybackActionCreators';

import HeaderBar from './';

const mapStateToProps = state => ({
  mediaStartTime: state.booth.startTime,
  mediaDuration: state.booth.media
    ? state.booth.media.end - state.booth.media.start
    : 0,
  media: state.booth.media,
  dj: state.users[state.booth.djID],
  currentTime: state.time,
  volume: state.settings.volume,
  muted: state.settings.muted
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onVolumeChange: setVolume,
  onVolumeMute: mute,
  onVolumeUnmute: unmute
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class HeaderBarContainer extends Component {
  render() {
    return <HeaderBar {...this.props} />;
  }
}
