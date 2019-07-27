import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { toggleRoomHistory } from '../../actions/OverlayActionCreators';
import { set } from '../../actions/SettingsActionCreators';
import {
  mediaSelector,
  startTimeSelector,
} from '../../selectors/boothSelectors';
import {
  sizeSelector as waitlistSizeSelector,
  positionSelector as waitlistPositionSelector,
} from '../../selectors/waitlistSelectors';
import { playlistsSelector } from '../../selectors/playlistSelectors';
import { videoEnabledSelector } from '../../selectors/settingSelectors';

import { openDrawer, openUsersDrawer } from '../actions/DrawerActionCreators';
import MainView from '../components/MainView';

const mapStateToProps = createStructuredSelector({
  videoEnabled: videoEnabledSelector,
  media: mediaSelector,
  startTime: startTimeSelector,
  waitlistPosition: waitlistPositionSelector,
  waitlistSize: waitlistSizeSelector,
  playlists: playlistsSelector,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onOpenRoomHistory: toggleRoomHistory,
  onOpenDrawer: openDrawer,
  onOpenWaitlist: openUsersDrawer,
  onEnableVideo: () => set('videoEnabled', true),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
