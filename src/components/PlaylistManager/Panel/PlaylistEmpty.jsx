import React from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Typography from '@mui/material/Typography';
import EmptyIcon from '@mui/icons-material/PlaylistAdd';

function PlaylistEmpty() {
  const { t } = useTranslator();

  return (
    <div className="PlaylistPanel-empty">
      <EmptyIcon className="PlaylistPanel-emptyIcon" />
      <Typography className="PlaylistPanel-emptyHeader">{t('playlists.playlist.empty')}</Typography>
      <Typography>{t('playlists.playlist.emptySub')}</Typography>
    </div>
  );
}

export default PlaylistEmpty;
