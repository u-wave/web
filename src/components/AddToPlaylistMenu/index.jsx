import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import { mdiPlus } from '@mdi/js';
import PromptDialog from '../Dialogs/PromptDialog';
import SvgIcon from '../SvgIcon';
import PlaylistsMenu from './PlaylistsMenu';

const {
  useCallback,
  useState,
} = React;

function AddToPlaylistMenu({
  onClose,
  onSelect,
  onCreatePlaylist,
  position,
}) {
  const { t } = useTranslator();
  const [creating, setCreating] = useState(false);
  const handleOpen = useCallback(() => setCreating(true), []);
  const handleClose = useCallback(() => setCreating(false), []);
  const handleSubmit = useCallback(async (playlistName) => {
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

AddToPlaylistMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onCreatePlaylist: PropTypes.func.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

export default AddToPlaylistMenu;
