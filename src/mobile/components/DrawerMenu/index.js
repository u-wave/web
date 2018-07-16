import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
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

const enhance = compose(
  translate(),
  withHandlers({
    // Prevent defaults for react-tap-event-plugin:
    // https://github.com/zilverline/react-tap-event-plugin/issues/77
    onShowAbout: props => (event) => {
      const { onShowAbout, onDrawerClose } = props;

      event.preventDefault();
      onShowAbout();
      onDrawerClose();
    },
    onShowServerList: props => (event) => {
      const { onShowServerList, onDrawerClose } = props;

      event.preventDefault();
      onShowServerList();
      onDrawerClose();
    },
    onShowSettings: props => (event) => {
      const { onShowSettings, onDrawerClose } = props;

      event.preventDefault();
      onShowSettings();
      onDrawerClose();
    },
  }),
);

const classes = {
  paper: 'DrawerMenu',
};

const DrawerMenu = ({
  t,
  user,
  playlists,
  open,
  hasAboutPage,
  onShowAbout,
  onShowServerList,
  onShowSettings,
  onShowPlaylist,
  onDrawerClose,
}) => (
  <Drawer open={open} onClose={onDrawerClose} classes={classes}>
    {user && <UserCard user={user} />}
    <MenuList>
      {hasAboutPage && <MenuItem onClick={onShowAbout}>{t('about.about')}</MenuItem>}
      <MenuItem onClick={onShowServerList}>{t('about.servers')}</MenuItem>
      <MenuItem onClick={onShowSettings}>{t('settings.title')}</MenuItem>
    </MenuList>
    <Divider />
    <MenuList
      subheader={<ListSubheader>{t('playlists.title')}</ListSubheader>}
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
          <ListItemText disableTypography>
            <Typography noWrap variant="subheading">{playlist.name}</Typography>
          </ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  </Drawer>
);

DrawerMenu.propTypes = {
  t: PropTypes.func.isRequired,
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

export default enhance(DrawerMenu);
