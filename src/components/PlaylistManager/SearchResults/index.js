import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { IDLE, LOADING, LOADED } from '../../../constants/LoadingStates';
import NoSearchResults from './NoSearchResults';
import LoadingSearchResults from './LoadingSearchResults';
import SearchResultsList from './SearchResultsList';

const enhance = translate();

const SearchResultsPanel = ({
  t,
  className,
  query,
  loadingState,
  results,
  onOpenAddMediaMenu,
  onOpenPreviewMediaDialog,
}) => {
  let list;
  if (loadingState === LOADED) {
    list = results.length > 0 ? (
      <SearchResultsList
        results={results}
        onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
        onOpenAddMediaMenu={onOpenAddMediaMenu}
      />
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
};

SearchResultsPanel.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  query: PropTypes.string.isRequired,
  loadingState: PropTypes.oneOf([IDLE, LOADING, LOADED]).isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  onOpenAddMediaMenu: PropTypes.func.isRequired,
  onOpenPreviewMediaDialog: PropTypes.func.isRequired,
};

export default enhance(SearchResultsPanel);
