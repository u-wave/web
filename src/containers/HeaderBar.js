import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setVolume, mute, unmute } from '../actions/PlaybackActionCreators';
import { toggleRoomHistory, toggleAbout } from '../actions/OverlayActionCreators';
import {
  djSelector,
  mediaSelector,
  startTimeSelector,
  mediaDurationSelector,
} from '../selectors/boothSelectors';
import { volumeSelector, isMutedSelector } from '../selectors/settingSelectors';
import HeaderBar from '../components/HeaderBar';

const mapStateToProps = createStructuredSelector({
  mediaStartTime: startTimeSelector,
  media: mediaSelector,
  dj: djSelector,
  volume: volumeSelector,
  muted: isMutedSelector,
  startTime: startTimeSelector,
  mediaDuration: mediaDurationSelector,
});

const mapDispatchToProps = {
  onVolumeChange: setVolume,
  onVolumeMute: mute,
  onVolumeUnmute: unmute,
  onToggleRoomHistory: toggleRoomHistory,
  onToggleAboutOverlay: toggleAbout,
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(HeaderBar);
