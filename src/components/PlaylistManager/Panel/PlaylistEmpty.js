import React from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Typography from '@material-ui/core/Typography';
import EmptyIcon from '@material-ui/icons/PlaylistAdd';

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
