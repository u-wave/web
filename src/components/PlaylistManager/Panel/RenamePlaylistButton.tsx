import { useCallback, useState } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { mdiPencil } from '@mdi/js';
import SvgIcon from '../../SvgIcon';
import PromptDialog from '../../Dialogs/PromptDialog';

type RenamePlaylistButtonProps = {
  initialName: string,
  onRename: (newName: string) => Promise<void>,
};
function RenamePlaylistButton({ initialName, onRename }: RenamePlaylistButtonProps) {
  const { t } = useTranslator();
  const [renaming, setRenaming] = useState(false);

  const handleOpen = useCallback(() => {
    setRenaming(true);
  }, []);

  const handleClose = useCallback(() => {
    setRenaming(false);
  }, []);

  const handleSubmit = useCallback(async (name: string) => {
    await onRename(name);
    setRenaming(false);
  }, [onRename]);

  return (
    <>
      <Tooltip title={t('playlists.rename')} placement="top">
        <IconButton className="PlaylistMeta-iconButton" onClick={handleOpen}>
          <SvgIcon path={mdiPencil} />
        </IconButton>
      </Tooltip>
      <PromptDialog
        open={renaming}
        title={t('dialogs.renamePlaylist.nameInputTitle')}
        submitLabel={t('dialogs.renamePlaylist.action')}
        defaultValue={initialName}
        onSubmit={handleSubmit}
        onCancel={handleClose}
      />
    </>
  );
}

export default RenamePlaylistButton;
