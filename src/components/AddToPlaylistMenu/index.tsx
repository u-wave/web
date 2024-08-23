import { useCallback, useState } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import { mdiPlus } from '@mdi/js';
import PromptDialog from '../Dialogs/PromptDialog';
import SvgIcon from '../SvgIcon';
import PlaylistsMenu from './PlaylistsMenu';
import type { Playlist } from '../../reducers/playlists';

type AddToPlaylistMenuProps = {
  onClose: () => void,
  onSelect: (playlist: Playlist) => void,
  onCreatePlaylist: (name: string) => Promise<Playlist>,
  position: { x: number, y: number },
};
function AddToPlaylistMenu({
  onClose,
  onSelect,
  onCreatePlaylist,
  position,
}: AddToPlaylistMenuProps) {
  const { t } = useTranslator();
  const [creating, setCreating] = useState(false);
  const handleOpen = useCallback(() => setCreating(true), []);
  const handleClose = useCallback(() => setCreating(false), []);
  const handleSubmit = useCallback(async (playlistName: string) => {
    const playlist = await onCreatePlaylist(playlistName);
    onSelect(playlist);
    onClose();
  }, [onCreatePlaylist, onSelect, onClose]);

  return (
    <>
      {!creating && (
        <PlaylistsMenu
          position={position}
          onClose={onClose}
          onCreatePlaylist={handleOpen}
          onSelect={onSelect}
        />
      )}
      <PromptDialog
        open={creating}
        title={t('dialogs.createPlaylist.nameInputTitle')}
        icon={<SvgIcon path={mdiPlus} />}
        submitLabel={t('dialogs.createPlaylist.action')}
        onSubmit={handleSubmit}
        onCancel={handleClose}
      />
    </>
  );
}

export default AddToPlaylistMenu;
