import React from 'react';
import PropTypes from 'prop-types';
import withHandlers from 'recompose/withHandlers';
import Drawer from 'material-ui/Drawer';
import { MenuList, MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListSubheader, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActiveIcon from 'material-ui-icons/Check';
import UserCard from '../../../components/UserCard/UserCard';

const enhance = withHandlers({
  // Prevent defaults for react-tap-event-plugin:
  // https://github.com/zilverline/react-tap-event-plugin/issues/77
  onShowAbout: props => (event) => {
    event.preventDefault();
    props.onShowAbout();
    props.onDrawerClose();
  },
  onShowSettings: props => (event) => {
    event.preventDefault();
    props.onShowSettings();
    props.onDrawerClose();
  },
});

const DrawerMenu = ({
  user,
  playlists,
  open,
  onShowAbout,
  onShowSettings,
  onShowPlaylist,
  onDrawerClose,
}) => (
  <Drawer open={open} onClose={onDrawerClose}>
    {user && <UserCard user={user} />}
    <MenuList>
      <MenuItem onClick={onShowAbout}>About</MenuItem>
      <MenuItem onClick={onShowSettings}>Settings</MenuItem>
    </MenuList>
    <Divider />
    <MenuList
      subheader={<ListSubheader>Playlists</ListSubheader>}
    >
      {playlists.map(playlist => (
        <MenuItem
          key={playlist._id}
          onClick={(event) => {
            event.preventDefault();
            onShowPlaylist(playlist._id);
            onDrawerClose();
          }}
        >
          {playlist.active && (
            <ListItemIcon>
              <ActiveIcon />
            </ListItemIcon>
          )}
          <ListItemText primary={playlist.name} />
        </MenuItem>
      ))}
    </MenuList>
  </Drawer>
);

DrawerMenu.propTypes = {
  user: PropTypes.object,
  playlists: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired })),
  open: PropTypes.bool.isRequired,
  onShowAbout: PropTypes.func.isRequired,
  onShowSettings: PropTypes.func.isRequired,
  onShowPlaylist: PropTypes.func.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
};

export default enhance(DrawerMenu);
