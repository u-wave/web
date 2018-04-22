import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Typography from 'material-ui/Typography';
import NoResultsIcon from '@material-ui/icons/Search';

const enhance = translate();

const NoResults = ({ t }) => (
  <div className="SearchResults-none">
    <NoResultsIcon className="SearchResults-noneIcon" />
    <Typography className="SearchResults-noneHeader">{t('playlists.search.noResults')}</Typography>
    <Typography>{t('playlists.search.noResultsSub')}</Typography>
  </div>
);

NoResults.propTypes = {
  t: PropTypes.func.isRequired,
};

export default enhance(NoResults);
