import React from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Typography from '@material-ui/core/Typography';
import EmptyIcon from '@material-ui/icons/Search';

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
