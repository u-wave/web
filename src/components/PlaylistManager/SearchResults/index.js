import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import usePrevious from 'use-previous';
import { useTranslator } from '@u-wave/react-translate';
import { IDLE, LOADING, LOADED } from '../../../constants/LoadingStates';
import NoSearchResults from './NoSearchResults';
import LoadingSearchResults from './LoadingSearchResults';
import SearchResultsList from './SearchResultsList';

const {
  useEffect,
  useState,
} = React;

function SearchResultsPanel({
  className,
  query,
  loadingState,
  results,
}) {
  const { t } = useTranslator();
  const previousQuery = usePrevious(query);
  const previousResults = usePrevious(results);
  const [delayedLoading, setDelayedLoading] = useState(false);

  useEffect(() => {
    // If we are not in a loading state, or had no previous results, the delayed-loading state makes
    // no sense.
    if (loadingState !== LOADING || previousResults === undefined) {
      setDelayedLoading(false);
      return () => {};
    }

    setDelayedLoading(true);
    const timer = setTimeout(() => {
      setDelayedLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [loadingState]);

  let list;
  if (loadingState === LOADED && results.length > 0) {
    list = <SearchResultsList results={results} />;
  } else if (loadingState === LOADING) {
    list = delayedLoading ? (
      <SearchResultsList
        results={previousResults}
        onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
        onOpenAddMediaMenu={onOpenAddMediaMenu}
      />
    ) : (
      <LoadingSearchResults />
    );
  } else {
    list = <NoSearchResults />;
  }

  return (
    <div className={cx('PlaylistPanel', 'SearchResults', className)}>
      <div className="SearchResults-query">
        {t('playlists.search.results', {
          query: delayedLoading ? previousQuery : query,
        })}
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
