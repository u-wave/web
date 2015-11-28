import cx from 'classnames';
import React from 'react';
import { LOADED } from '../../../constants/LoadingStates';
import Loader from '../../Loader';
import MediaList from '../../MediaList';

const SearchResults = ({ className, query, results, loadingState }) => {
  const list = loadingState === LOADED
    ? <MediaList
        className="PlaylistPanel-media"
        media={results}
      />
    : <div className="PlaylistPanel-loading"> <Loader size="large" /> </div>;

  return (
    <div className={cx('PlaylistPanel', 'SearchResults', className)}>
      <div className="SearchResults-query">
        Search: {query}
      </div>
      {list}
    </div>
  );
};

export default SearchResults;
