import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { toggleOverlay } from '../reducers/activeOverlay';
import { djSelector, mediaSelector, startTimeSelector } from '../selectors/boothSelectors';
import {
  setVolume,
  mute,
  unmute,
  volumeSelector,
  isMutedSelector,
} from '../reducers/settings';
import HeaderBar from '../components/HeaderBar';

const mapStateToProps = createStructuredSelector({
  mediaStartTime: startTimeSelector,
  media: mediaSelector,
  dj: djSelector,
  volume: volumeSelector,
  muted: isMutedSelector,
});

const mapDispatchToProps = {
  onVolumeChange: setVolume,
  onVolumeMute: mute,
  onVolumeUnmute: unmute,
  onToggleRoomHistory: () => toggleOverlay('roomHistory'),
  onToggleAboutOverlay: () => toggleOverlay('about'),
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(HeaderBar);
