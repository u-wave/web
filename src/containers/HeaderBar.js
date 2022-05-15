import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  setVolume,
  mute,
  unmute,
  muteThis,
  unmuteThis,
} from '../actions/PlaybackActionCreators';
import { toggleRoomHistory, toggleAbout } from '../actions/OverlayActionCreators';
import { djSelector, mediaSelector, startTimeSelector } from '../selectors/boothSelectors';
import { volumeSelector, isMutedSelector, isMutedThisSelector } from '../selectors/settingSelectors';
import HeaderBar from '../components/HeaderBar';

const mapStateToProps = createStructuredSelector({
  mediaStartTime: startTimeSelector,
  media: mediaSelector,
  dj: djSelector,
  volume: volumeSelector,
  muted: isMutedSelector,
  mutedThis: isMutedThisSelector,
});

const mapDispatchToProps = {
  onVolumeChange: setVolume,
  onVolumeMute: mute,
  onVolumeUnmute: unmute,
  onVolumeMuteThis: muteThis,
  onVolumeUnmuteThis: unmuteThis,
  onToggleRoomHistory: toggleRoomHistory,
  onToggleAboutOverlay: toggleAbout,
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(HeaderBar);
