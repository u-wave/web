import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setVolume, mute, unmute } from '../actions/PlaybackActionCreators';

import { djSelector, startTimeSelector, mediaSelector, mediaDurationSelector } from '../selectors/boothSelectors';
import { currentTimeSelector } from '../selectors/timeSelectors';
import { volumeSelector, isMutedSelector } from '../selectors/settingSelectors';
import HeaderBar from '../components/HeaderBar';

const mapStateToProps = createStructuredSelector({
  mediaStartTime: startTimeSelector,
  mediaDuration: mediaDurationSelector,
  media: mediaSelector,
  dj: djSelector,
  currentTime: currentTimeSelector,
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
