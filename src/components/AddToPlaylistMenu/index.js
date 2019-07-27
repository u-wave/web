import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import CreatePlaylistIcon from '@material-ui/icons/Add';
import PromptDialog from '../Dialogs/PromptDialog';
import PlaylistsMenu from './PlaylistsMenu';

const {
  useCallback,
  useState,
} = React;

function AddToPlaylistMenu(props) {
  const {
    onClose,
    onSelect,
    onCreatePlaylist,
  } = props;

  const { t } = useTranslator();
  const [creating, setCreating] = useState(false);
  const handleOpen = useCallback(() => setCreating(true), []);
  const handleClose = useCallback(() => setCreating(false), []);
  const handleSubmit = useCallback(playlistName => (
    Promise.resolve(onCreatePlaylist(playlistName))
      .then(playlist => onSelect(playlist))
      .then(() => onClose())
  ), [onCreatePlaylist, onSelect, onClose]);

  return (
    <React.Fragment>
      {!creating && (
        <PlaylistsMenu
          {...props}
          onCreatePlaylist={handleOpen}
        />
      )}
      {creating && (
        <PromptDialog
          title={t('dialogs.createPlaylist.nameInputTitle')}
          icon={<CreatePlaylistIcon htmlColor="#777" />}
          submitLabel={t('dialogs.createPlaylist.action')}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      )}
    </React.Fragment>
  );
}

AddToPlaylistMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onCreatePlaylist: PropTypes.func.isRequired,
};

export default AddToPlaylistMenu;
