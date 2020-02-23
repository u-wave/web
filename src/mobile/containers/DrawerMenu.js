import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { currentUserSelector } from '../../selectors/userSelectors';
import { playlistsSelector } from '../../selectors/playlistSelectors';
import { toggleSettings, toggleAbout } from '../../actions/OverlayActionCreators';
import { drawerIsOpenSelector } from '../selectors/drawerSelectors';
import { setDrawer } from '../actions/DrawerActionCreators';
import { toggleServerList, openPlaylist } from '../actions/OverlayActionCreators';
import DrawerMenu from '../components/DrawerMenu';
import UwaveContext from '../../context/UwaveContext';

const mapStateToProps = createStructuredSelector({
  user: currentUserSelector,
  playlists: playlistsSelector,
  open: drawerIsOpenSelector,
});

const mapDispatchToProps = {
  onShowAbout: toggleAbout,
  onShowServerList: toggleServerList,
  onShowSettings: toggleSettings,
  onShowPlaylist: openPlaylist,
  onDrawerClose: () => setDrawer(false),
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

const ConnectedDrawerMenu = enhance(DrawerMenu);

const DrawerMenuWrapper = () => (
  <UwaveContext.Consumer>
    {(uwave) => (
      <ConnectedDrawerMenu
        hasAboutPage={uwave && uwave.getAboutPageComponent()}
      />
    )}
  </UwaveContext.Consumer>
);

export default DrawerMenuWrapper;
