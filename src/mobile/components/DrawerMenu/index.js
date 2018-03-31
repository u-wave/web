import React from 'react';
import PropTypes from 'prop-types';
import withHandlers from 'recompose/withHandlers';
import Drawer from 'material-ui-next/Drawer'; // eslint-disable-line
import { MenuList, MenuItem } from 'material-ui-next/Menu'; // eslint-disable-line
import { ListItemIcon, ListSubheader, ListItemText } from 'material-ui-next/List'; // eslint-disable-line
import Divider from 'material-ui-next/Divider'; // eslint-disable-line
import ActiveIcon from 'material-ui-icons/Check';
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
  <Drawer open={open} onClose={onChangeDrawerOpen}>
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
            onChangeDrawerOpen(false);
          }}
        >
          {playlist.active && (
            <ListItemIcon>
              <ActiveIcon />
            </ListItemIcon>
          )}
          <ListItemText>{playlist.name}</ListItemText>
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
  onChangeDrawerOpen: PropTypes.func.isRequired,
};

export default enhance(DrawerMenu);
