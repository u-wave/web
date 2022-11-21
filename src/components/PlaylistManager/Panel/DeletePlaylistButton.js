import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../../Dialogs/ConfirmDialog';
import FormGroup from '../../Form/Group';

const {
  useCallback,
  useState,
} = React;

function DeletePlaylistButton({
  onDelete,
  onNotDeletable,
  active,
}) {
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

  const handleConfirm = useCallback((name) => (
    onDelete(name).then(() => {
      setDeleting(false);
    })
  ), [onDelete]);

  return (
    <>
      <Tooltip title={active ? t('playlists.deleteActive') : t('playlists.delete')} placement="top">
        <span className="PlaylistMeta-possiblyDisabledButtonWrapper">
          <IconButton
            disabled={active}
            className="PlaylistMeta-iconButton"
            onClick={handleOpen}
          >
            <DeleteIcon />
          </IconButton>
        </span>
      </Tooltip>
      <ConfirmDialog
        open={deleting}
        title={t('dialogs.deletePlaylist.title')}
        confirmLabel={t('dialogs.deletePlaylist.action')}
        onConfirm={handleConfirm}
        onCancel={handleClose}
      >
        <FormGroup>{t('dialogs.deletePlaylist.confirm')}</FormGroup>
      </ConfirmDialog>
    </>
  );
}

DeletePlaylistButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onNotDeletable: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default DeletePlaylistButton;
