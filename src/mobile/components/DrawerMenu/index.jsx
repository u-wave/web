import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Drawer from '@mui/material/Drawer';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import { mdiCheck } from '@mdi/js';
import UserCard from '../../../components/UserCard/UserCard';
import SvgIcon from '../../../components/SvgIcon';

const {
  useCallback,
} = React;

const classes = {
  paper: 'DrawerMenu',
};

function Playlists({
  title,
  playlists,
  onShowPlaylist,
}) {
  const header = (
    <ListSubheader>
      {title}
    </ListSubheader>
  );

  return (
    <MenuList subheader={header}>
      {playlists.map((playlist) => (
        <MenuItem
          key={playlist._id}
          onClick={(event) => {
            event.preventDefault();
            onShowPlaylist(playlist._id);
          }}
        >
          {playlist.active && (
            <ListItemIcon>
              <SvgIcon path={mdiCheck} />
            </ListItemIcon>
          )}
          <ListItemText primaryTypographyProps={{ noWrap: true }}>
            {playlist.name}
          </ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );
}

Playlists.propTypes = {
  title: PropTypes.string.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired })).isRequired,
  onShowPlaylist: PropTypes.func.isRequired,
};

function DrawerMenu({
  user,
  playlists,
  open,
  hasAboutPage,
  onShowAbout,
  onShowServerList,
  onShowSettings,
  onShowPlaylist,
  onDrawerClose,
}) {
  const { t } = useTranslator();

  const handleShowAbout = useCallback(() => {
    onShowAbout();
    onDrawerClose();
  }, [onShowAbout, onDrawerClose]);
  const handleShowServerList = useCallback(() => {
    onShowServerList();
    onDrawerClose();
  }, [onShowServerList, onDrawerClose]);
  const handleShowSettings = useCallback(() => {
    onShowSettings();
    onDrawerClose();
  }, [onShowSettings, onDrawerClose]);
  const handleShowPlaylist = useCallback((id) => {
    onShowPlaylist(id);
    onDrawerClose();
  }, [onShowPlaylist, onDrawerClose]);

  return (
    <Drawer open={open} onClose={onDrawerClose} classes={classes}>
      {user && <UserCard className="DrawerMenu-user" user={user} />}
      <MenuList>
        {hasAboutPage && (
          <MenuItem onClick={handleShowAbout}>
            {t('about.about')}
          </MenuItem>
        )}
        <MenuItem onClick={handleShowServerList}>
          {t('about.servers')}
        </MenuItem>
        <MenuItem onClick={handleShowSettings}>
          {t('settings.title')}
        </MenuItem>
      </MenuList>
      {user && (
        <>
          <Divider />
          <Playlists
            title={t('playlists.title')}
            playlists={playlists}
            onShowPlaylist={handleShowPlaylist}
          />
        </>
      )}
    </Drawer>
  );
}

DrawerMenu.propTypes = {
  user: PropTypes.object,
  playlists: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired })),
  open: PropTypes.bool.isRequired,
  hasAboutPage: PropTypes.bool.isRequired,
  onShowAbout: PropTypes.func.isRequired,
  onShowServerList: PropTypes.func.isRequired,
  onShowSettings: PropTypes.func.isRequired,
  onShowPlaylist: PropTypes.func.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
};

export default DrawerMenu;
