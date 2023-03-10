import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import MenuItem from '@mui/material/MenuItem';
import { mdiPlus } from '@mdi/js';
import PromptDialog from '../../Dialogs/PromptDialog';
import SvgIcon from '../../SvgIcon';

const {
  useCallback,
  useState,
} = React;

function NewPlaylist({ className, onCreatePlaylist }) {
  const { t } = useTranslator();
  const [creating, setCreating] = useState(false);

  const handleOpen = useCallback(() => {
    setCreating(true);
  }, []);

  const handleClose = useCallback(() => {
    setCreating(false);
  }, []);

  const handleSubmit = useCallback(async (playlistName) => {
    try {
      await onCreatePlaylist(playlistName);
    } finally {
      setCreating(false);
    }
  }, [onCreatePlaylist]);

  return (
    <>
      <MenuItem
        className={cx('PlaylistMenuRow', 'PlaylistMenuRow--create', className)}
        onClick={handleOpen}
      >
        <div className="PlaylistMenuRow-title">
          <div className="PlaylistMenuRow-active-icon">
            <SvgIcon path={mdiPlus} />
          </div>
          {t('playlists.new')}
        </div>
      </MenuItem>
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

NewPlaylist.propTypes = {
  className: PropTypes.string,
  onCreatePlaylist: PropTypes.func.isRequired,
};

export default NewPlaylist;
