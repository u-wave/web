import { useCallback, useState } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { mdiDelete } from '@mdi/js';
import SvgIcon from '../../SvgIcon';
import ConfirmDialog from '../../Dialogs/ConfirmDialog';
import FormGroup from '../../Form/Group';

type DeletePlaylistButtonProps = {
  onDelete: () => Promise<void>,
  onNotDeletable: () => void,
  active: boolean,
};
function DeletePlaylistButton({
  onDelete,
  onNotDeletable,
  active,
}: DeletePlaylistButtonProps) {
  const { t } = useTranslator();
  const [deleting, setDeleting] = useState(false);

  const handleOpen = useCallback(() => {
    if (active) {
      onNotDeletable();
    } else {
      setDeleting(true);
    }
  }, [active, onNotDeletable]);

  const handleClose = useCallback(() => {
    setDeleting(false);
  }, []);

  const handleConfirm = useCallback(() => (
    onDelete().then(() => {
      setDeleting(false);
    })
  ), [onDelete]);

  // FIXME should the confirmation dialog have a title?
  // title={t('dialogs.deletePlaylist.title')}
  return (
    <>
      <Tooltip title={active ? t('playlists.deleteActive') : t('playlists.delete')} placement="top">
        <span className="PlaylistMeta-possiblyDisabledButtonWrapper">
          <IconButton
            disabled={active}
            className="PlaylistMeta-iconButton"
            onClick={handleOpen}
          >
            <SvgIcon path={mdiDelete} />
          </IconButton>
        </span>
      </Tooltip>
      <ConfirmDialog
        open={deleting}
        confirmLabel={t('dialogs.deletePlaylist.action')}
        onConfirm={handleConfirm}
        onCancel={handleClose}
      >
        <FormGroup>{t('dialogs.deletePlaylist.confirm')}</FormGroup>
      </ConfirmDialog>
    </>
  );
}

export default DeletePlaylistButton;
