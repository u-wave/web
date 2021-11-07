import React from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Typography from '@mui/material/Typography';
import EmptyIcon from '@mui/icons-material/Search';

function PlaylistFilterEmpty() {
  const { t } = useTranslator();

  return (
    <div className="PlaylistPanel-empty">
      <EmptyIcon className="PlaylistPanel-emptyIcon" />
      <Typography className="PlaylistPanel-emptyHeader">{t('playlists.playlist.filterEmpty')}</Typography>
      <Typography>{t('playlists.playlist.filterEmptySub')}</Typography>
    </div>
  );
}

export default PlaylistFilterEmpty;
