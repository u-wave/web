import { useCallback, useMemo } from 'react';
import useSWR from 'swr';
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
import { useSelector } from '../../../hooks/useRedux';
import { activePlaylistIDSelector } from '../../../selectors/playlistSelectors';
import useCurrentUser from '../../../hooks/useCurrentUser';
import uwFetch, { ListResponse } from '../../../utils/fetch';

const classes = {
  paper: 'DrawerMenu',
};

interface PlaylistMeta {
  _id: string;
  name: string;
  size: number;
}

type PlaylistsProps = {
  title: React.ReactNode,
  onShowPlaylist: (id: string) => void,
};
function Playlists({
  title,
  onShowPlaylist,
}: PlaylistsProps) {
  const { data: playlistsFromApi } = useSWR<ListResponse<PlaylistMeta>>('/playlists', uwFetch);
  const activePlaylistID = useSelector(activePlaylistIDSelector);
  const playlists = useMemo(() => {
    return playlistsFromApi?.data.map((playlist) => {
      if (playlist._id === activePlaylistID) {
        return {
          ...playlist,
          active: true,
        };
      }
      return playlist as (typeof playlist & { active?: boolean });
    });
  }, [playlistsFromApi, activePlaylistID]);

  const header = (
    <ListSubheader>
      {title}
    </ListSubheader>
  );

  return (
    <MenuList subheader={header}>
      {playlists?.map((playlist) => (
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

type DrawerMenuProps = {
  open: boolean,
  hasAboutPage: boolean,
  onShowAbout: () => void,
  onShowServerList: () => void,
  onShowSettings: () => void,
  onShowPlaylist: (id: string) => void,
  onDrawerClose: () => void,
};
function DrawerMenu({
  open,
  hasAboutPage,
  onShowAbout,
  onShowServerList,
  onShowSettings,
  onShowPlaylist,
  onDrawerClose,
}: DrawerMenuProps) {
  const user = useCurrentUser();
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
  const handleShowPlaylist = useCallback((id: string) => {
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
            onShowPlaylist={handleShowPlaylist}
          />
        </>
      )}
    </Drawer>
  );
}

export default DrawerMenu;
