import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { currentUserSelector } from '../../selectors/userSelectors';
import { playlistsSelector } from '../../selectors/playlistSelectors';
import { toggleSettings, toggleAbout } from '../../actions/OverlayActionCreators';

import { drawerIsOpenSelector } from '../selectors/drawerSelectors';
import { setDrawer, closeDrawer } from '../actions/DrawerActionCreators';
import DrawerMenu from '../components/DrawerMenu';

const mapStateToProps = createStructuredSelector({
  user: currentUserSelector,
  playlists: playlistsSelector,
  open: drawerIsOpenSelector
});

// Create an action creator that will close the drawer, and then dispatch
// the given action.
const andClose = createAction => (...args) => (dispatch) => {
  dispatch(closeDrawer());
  return dispatch(createAction(...args));
};

const mapDispatchToProps = dispatch => bindActionCreators({
  onShowAbout: andClose(toggleAbout),
  onShowSettings: andClose(toggleSettings),
  onShowPlaylist: closeDrawer, // Don't do anything for now
  onChangeDrawerOpen: setDrawer
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
