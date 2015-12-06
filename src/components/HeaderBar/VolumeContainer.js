import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setVolume, mute, unmute } from '../../actions/PlaybackActionCreators';

import Volume from './Volume';

const mapStateToProps = state => ({
  volume: state.settings.volume,
  muted: state.settings.muted
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onVolumeChange: setVolume,
  onMute: mute,
  onUnmute: unmute
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class VolumeContainer extends Component {
  render() {
    return <Volume {...this.props} />;
  }
}
