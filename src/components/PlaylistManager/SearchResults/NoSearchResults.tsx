import { mdiMagnify } from '@mdi/js';
import Typography from '@mui/material/Typography';
import { useTranslator } from '@u-wave/react-translate';
import SvgIcon from '../../SvgIcon';

function NoResults() {
  const { t } = useTranslator();
  return (
    <div className="SearchResults-none">
      <SvgIcon path={mdiMagnify} className="SearchResults-noneIcon" style={{ width: '240px', height: '240px' }} />
      <Typography className="SearchResults-noneHeader">{t('playlists.search.noResults')}</Typography>
      <Typography>{t('playlists.search.noResultsSub')}</Typography>
    </div>
  );
}

export default NoResults;
