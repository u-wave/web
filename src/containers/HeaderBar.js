import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setVolume, mute, unmute } from '../actions/PlaybackActionCreators';
import { toggleRoomHistory } from '../actions/OverlayActionCreators';

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
  onVolumeUnmute: unmute,
  onToggleRoomHistory: toggleRoomHistory
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);
