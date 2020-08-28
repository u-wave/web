import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Drawer from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ActiveIcon from '@material-ui/icons/Check';
import UserCard from '../../../components/UserCard/UserCard';

const {
  useCallback,
} = React;

const classes = {
  paper: 'DrawerMenu',
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

  return (
    <Drawer open={open} onClose={onDrawerClose} classes={classes}>
      {user && <UserCard className="DrawerMenu-user" user={user} />}
      <MenuList>
        {hasAboutPage && <MenuItem onClick={handleShowAbout}>{t('about.about')}</MenuItem>}
        <MenuItem onClick={handleShowServerList}>{t('about.servers')}</MenuItem>
        <MenuItem onClick={handleShowSettings}>{t('settings.title')}</MenuItem>
      </MenuList>
      <Divider />
      <MenuList
        subheader={<ListSubheader>{t('playlists.title')}</ListSubheader>}
      >
        {playlists.map((playlist) => (
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
            <ListItemText disableTypography>
              <Typography noWrap variant="body1">{playlist.name}</Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </MenuList>
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
