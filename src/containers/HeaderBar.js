import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import mapProps from 'recompose/mapProps';
import except from 'except';
import { createStructuredSelector } from 'reselect';
import { setVolume, mute, unmute } from '../actions/PlaybackActionCreators';
import { toggleRoomHistory, toggleAbout } from '../actions/OverlayActionCreators';

import {
  djSelector,
  mediaSelector,
  mediaProgressSelector,
  timeRemainingSelector,
} from '../selectors/boothSelectors';
import { volumeSelector, isMutedSelector } from '../selectors/settingSelectors';
import HeaderBar from '../components/HeaderBar';

const mapStateToProps = createStructuredSelector({
  mediaProgress: mediaProgressSelector,
  mediaTimeRemaining: timeRemainingSelector,
  media: mediaSelector,
  dj: djSelector,
  volume: volumeSelector,
  muted: isMutedSelector,
  hasAboutPage: (state, props) => (
    props.uwave.getAboutPageComponent() !== null
  ),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onVolumeChange: setVolume,
  onVolumeMute: mute,
  onVolumeUnmute: unmute,
  onToggleRoomHistory: toggleRoomHistory,
  onToggleAboutOverlay: toggleAbout,
}, dispatch);

export default compose(
  getContext({ uwave: PropTypes.object }),
  connect(mapStateToProps, mapDispatchToProps),
  // Remove the "uwave" prop—it was only necessary for the selector.
  mapProps(props => except(props, 'uwave')),
)(HeaderBar);
