import React from 'react';
import PropTypes from 'prop-types';
import withHandlers from 'recompose/withHandlers';
import Drawer from 'material-ui/Drawer';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import UserCard from '../../../components/UserCard/UserCard';

const enhance = withHandlers({
  // Prevent defaults for react-tap-event-plugin:
  // https://github.com/zilverline/react-tap-event-plugin/issues/77
  onShowAbout: props => (event) => {
    event.preventDefault();
    props.onShowAbout();
    props.onChangeDrawerOpen(false);
  },
  onShowSettings: props => (event) => {
    event.preventDefault();
    props.onShowSettings();
    props.onChangeDrawerOpen(false);
  },
});

const DrawerMenu = ({
  user,
  playlists,
  open,
  onShowAbout,
  onShowSettings,
  onShowPlaylist,
  onChangeDrawerOpen,
}) => (
  <Drawer
    docked={false}
    width={320}
    open={open}
    onRequestChange={onChangeDrawerOpen}
  >
    {user && <UserCard user={user} />}
    <List>
      <MenuItem onClick={onShowAbout}>About</MenuItem>
      <MenuItem onClick={onShowSettings}>Settings</MenuItem>
    </List>
    <Divider />
    <List>
      <Subheader>Playlists</Subheader>
      {playlists.map(playlist => (
        <MenuItem
          key={playlist._id}
          checked={playlist.active}
          onClick={(event) => {
            event.preventDefault();
            onShowPlaylist(playlist._id);
            onChangeDrawerOpen(false);
          }}
        >
          {playlist.name}
        </MenuItem>
      ))}
    </List>
  </Drawer>
);

DrawerMenu.propTypes = {
  user: PropTypes.object,
  playlists: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired })),
  open: PropTypes.bool.isRequired,
  onShowAbout: PropTypes.func.isRequired,
  onShowSettings: PropTypes.func.isRequired,
  onShowPlaylist: PropTypes.func.isRequired,
  onChangeDrawerOpen: PropTypes.func.isRequired,
};

export default enhance(DrawerMenu);
