import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import { IDLE, LOADING, LOADED } from '../../../constants/LoadingStates';
import NoSearchResults from './NoSearchResults';
import LoadingSearchResults from './LoadingSearchResults';
import SearchResultsList from './SearchResultsList';

function SearchResultsPanel({
  className,
  query,
  loadingState,
  results,
}) {
  const { t } = useTranslator();

  let list;
  if (loadingState === LOADED) {
    list = results.length > 0 ? (
      <SearchResultsList results={results} />
    ) : (
      <NoSearchResults />
    );
  } else {
    list = (
      <LoadingSearchResults />
    );
  }

  return (
    <div className={cx('PlaylistPanel', 'SearchResults', className)}>
      <div className="SearchResults-query">
        {t('playlists.search.results', { query })}
      </div>
      {list}
    </div>
  );
}

SearchResultsPanel.propTypes = {
  className: PropTypes.string,
  query: PropTypes.string.isRequired,
  loadingState: PropTypes.oneOf([IDLE, LOADING, LOADED]).isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
};

export default SearchResultsPanel;
