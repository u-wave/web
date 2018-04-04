import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { currentUserSelector } from '../../selectors/userSelectors';
import { playlistsSelector } from '../../selectors/playlistSelectors';
import { toggleSettings, toggleAbout } from '../../actions/OverlayActionCreators';

import { drawerIsOpenSelector } from '../selectors/drawerSelectors';
import { setDrawer } from '../actions/DrawerActionCreators';
import { openPlaylist } from '../actions/OverlayActionCreators';
import DrawerMenu from '../components/DrawerMenu';

const mapStateToProps = createStructuredSelector({
  user: currentUserSelector,
  playlists: playlistsSelector,
  open: drawerIsOpenSelector,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onShowAbout: toggleAbout,
  onShowSettings: toggleSettings,
  onShowPlaylist: openPlaylist,
  onDrawerClose: () => setDrawer(false),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
