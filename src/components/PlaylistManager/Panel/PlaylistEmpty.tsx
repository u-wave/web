import { useTranslator } from '@u-wave/react-translate';
import Typography from '@mui/material/Typography';
import { mdiPlaylistPlus } from '@mdi/js';
import SvgIcon from '../../SvgIcon';

function PlaylistEmpty() {
  const { t } = useTranslator();

  return (
    <div className="PlaylistPanel-empty">
      <SvgIcon path={mdiPlaylistPlus} className="PlaylistPanel-emptyIcon" style={{ width: 240, height: 240 }} />
      <Typography className="PlaylistPanel-emptyHeader">{t('playlists.playlist.empty')}</Typography>
      <Typography>{t('playlists.playlist.emptySub')}</Typography>
    </div>
  );
}

export default PlaylistEmpty;
