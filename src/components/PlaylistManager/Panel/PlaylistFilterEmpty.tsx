import { useTranslator } from '@u-wave/react-translate';
import Typography from '@mui/material/Typography';
import { mdiMagnify } from '@mdi/js';
import SvgIcon from '../../SvgIcon';

function PlaylistFilterEmpty() {
  const { t } = useTranslator();

  return (
    <div className="PlaylistPanel-empty">
      <SvgIcon path={mdiMagnify} className="PlaylistPanel-emptyIcon" style={{ width: '240px', height: '240px' }} />
      <Typography className="PlaylistPanel-emptyHeader">{t('playlists.playlist.filterEmpty')}</Typography>
      <Typography>{t('playlists.playlist.filterEmptySub')}</Typography>
    </div>
  );
}

export default PlaylistFilterEmpty;
