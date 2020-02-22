import React from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Typography from '@material-ui/core/Typography';
import NoResultsIcon from '@material-ui/icons/Search';

function NoResults() {
  const { t } = useTranslator();
  return (
    <div className="SearchResults-none">
      <NoResultsIcon className="SearchResults-noneIcon" />
      <Typography className="SearchResults-noneHeader">{t('playlists.search.noResults')}</Typography>
      <Typography>{t('playlists.search.noResultsSub')}</Typography>
    </div>
  );
}

export default NoResults;
