import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PromptDialog from '../../Dialogs/PromptDialog';

const {
  useCallback,
  useState,
} = React;

function RenamePlaylistButton({ initialName, onRename }) {
  const { t } = useTranslator();
  const [renaming, setRenaming] = useState(false);

  const handleOpen = useCallback(() => {
    setRenaming(true);
  }, []);

  const handleClose = useCallback(() => {
    setRenaming(false);
  }, []);

  const handleSubmit = useCallback((name) => {
    return onRename(name).then(() => {
      setRenaming(false);
    });
  }, [onRename]);

  return (
    <React.Fragment>
      <Tooltip title={t('playlists.rename')} placement="top">
        <IconButton className="PlaylistMeta-iconButton" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      {renaming && (
        <PromptDialog
          title={t('dialogs.renamePlaylist.nameInputTitle')}
          submitLabel={t('dialogs.renamePlaylist.action')}
          icon={<EditIcon htmlColor="#777" />}
          value={initialName}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      )}
    </React.Fragment>
  );
}

RenamePlaylistButton.propTypes = {
  onRename: PropTypes.func.isRequired,
  initialName: PropTypes.string,
};

export default RenamePlaylistButton;
