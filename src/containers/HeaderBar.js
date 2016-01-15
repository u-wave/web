import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setVolume, mute, unmute } from '../actions/PlaybackActionCreators';

import { djSelector, mediaSelector, mediaProgressSelector } from '../selectors/boothSelectors';
import { volumeSelector, isMutedSelector } from '../selectors/settingSelectors';
import HeaderBar from '../components/HeaderBar';

const mapStateToProps = createStructuredSelector({
  mediaProgress: mediaProgressSelector,
  media: mediaSelector,
  dj: djSelector,
  volume: volumeSelector,
  muted: isMutedSelector
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
