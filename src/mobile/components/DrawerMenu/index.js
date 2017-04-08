import * as React from 'react';
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
  }
});

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
          checked={playlist.active}
          onTouchTap={(event) => {
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

export default enhance(DrawerMenu);
