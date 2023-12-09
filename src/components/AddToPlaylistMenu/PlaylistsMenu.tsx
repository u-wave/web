import React from 'react';
import { useTranslator } from '@u-wave/react-translate';
import { mdiPlus, mdiCheck } from '@mdi/js';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '../SvgIcon';
import { useSelector } from '../../hooks/useRedux';
import { type Playlist, playlistsSelector } from '../../reducers/playlists';

const { useCallback } = React;

type PlaylistsMenuProps = {
  position: { x: number, y: number },
  onClose: () => void,
  onCreatePlaylist: () => void,
  onSelect: (playlist: Playlist) => void,
};
function PlaylistsMenu({
  position,
  onClose,
  onCreatePlaylist,
  onSelect,
}: PlaylistsMenuProps) {
  const { t } = useTranslator();
  const playlists = useSelector(playlistsSelector);
  const handleSelect = useCallback((playlistID: string) => {
    const playlist = playlists.find((pl) => pl._id === playlistID);
    if (playlist) {
      onClose();
      onSelect(playlist);
    }
  }, [onClose, onSelect, playlists]);

  return (
    <Popover
      open
      anchorPosition={{ left: position.x, top: position.y }}
      anchorReference="anchorPosition"
      onClose={onClose}
    >
      <MenuList>
        <MenuItem onClick={onCreatePlaylist}>
          <ListItemText primary={t('playlists.new')} />
          <ListItemIcon>
            <SvgIcon path={mdiPlus} />
          </ListItemIcon>
        </MenuItem>
        {playlists.map((playlist) => (
          <MenuItem
            className="AddToPlaylistMenu-playlist"
            key={playlist._id}
            onClick={() => handleSelect(playlist._id)}
          >
            {!!playlist.active && (
              <ListItemIcon>
                <SvgIcon path={mdiCheck} />
              </ListItemIcon>
            )}
            <ListItemText disableTypography className="AddToPlaylistMenu-playlistName">
              <Typography noWrap variant="subtitle1">{playlist.name}</Typography>
            </ListItemText>
            <ListItemText className="AddToPlaylistMenu-smallIcon" primary={String(playlist.size ?? 0)} />
          </MenuItem>
        ))}
      </MenuList>
    </Popover>
  );
}

export default PlaylistsMenu;
