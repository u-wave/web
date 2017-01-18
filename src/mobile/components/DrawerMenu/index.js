import * as React from 'react';
import Drawer from 'material-ui/Drawer';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import UserCard from '../../../components/UserCard/UserCard';

const DrawerMenu = ({
  user,
  playlists,
  open,
  onShowAbout,
  onShowSettings,
  onShowPlaylist,
  onChangeDrawerOpen
}) => (
  <Drawer
    docked={false}
    width={320}
    open={open}
    onRequestChange={onChangeDrawerOpen}
  >
    {user && <UserCard user={user} />}
    <List>
      <MenuItem onTouchTap={onShowAbout}>About</MenuItem>
      <MenuItem onTouchTap={onShowSettings}>Settings</MenuItem>
    </List>
    <Divider />
    <List>
      <Subheader>Playlists</Subheader>
      {playlists.map(playlist => (
        <MenuItem
          key={playlist._id}
          onTouchTap={() => onShowPlaylist(playlist._id)}
        >
          {playlist.name}
        </MenuItem>
      ))}
    </List>
  </Drawer>
);

DrawerMenu.propTypes = {
  user: React.PropTypes.object,
  playlists: React.PropTypes.arrayOf(
    React.PropTypes.shape({ name: React.PropTypes.string.isRequired })
  ),
  open: React.PropTypes.bool.isRequired,
  onShowAbout: React.PropTypes.func.isRequired,
  onShowSettings: React.PropTypes.func.isRequired,
  onShowPlaylist: React.PropTypes.func.isRequired,
  onChangeDrawerOpen: React.PropTypes.func.isRequired
};

export default DrawerMenu;
