import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
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

  const handleConfirm = useCallback(name => (
    onDelete(name).then(() => {
      setDeleting(false);
    })
  ), [onDelete]);

  return (
    <React.Fragment>
      <Tooltip title={active ? t('playlists.deleteActive') : t('playlists.delete')} placement="top">
        <IconButton
          disabled={active}
          className="PlaylistMeta-iconButton"
          onClick={handleOpen}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {deleting && (
        <ConfirmDialog
          title={t('dialogs.deletePlaylist.title')}
          confirmLabel={t('dialogs.deletePlaylist.action')}
          onConfirm={handleConfirm}
          onCancel={handleClose}
        >
          <FormGroup>{t('dialogs.deletePlaylist.confirm')}</FormGroup>
        </ConfirmDialog>
      )}
    </React.Fragment>
  );
}

DeletePlaylistButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onNotDeletable: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default DeletePlaylistButton;
