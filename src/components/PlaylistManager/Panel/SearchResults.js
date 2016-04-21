import cx from 'classnames';
import * as React from 'react';
import { IDLE, LOADING, LOADED } from '../../../constants/LoadingStates';
import Loader from '../../Loader';
import MediaList from '../../MediaList';

import AddToPlaylistAction from '../../MediaList/Actions/AddToPlaylist';

const SearchResults = ({ className, query, results, loadingState, onOpenAddMediaMenu }) => {
  let list;
  if (loadingState === LOADED) {
    list = (
      <MediaList
        className="PlaylistPanel-media"
        media={results}
        makeActions={(media, selection) => [
          <AddToPlaylistAction
            key="add"
            onAdd={position => onOpenAddMediaMenu(position, media, selection)}
          />
        ]}
      />
    );
  } else {
    list = (
      <div className="PlaylistPanel-loading">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className={cx('PlaylistPanel', 'SearchResults', className)}>
      <div className="SearchResults-query">
        Search: {query}
      </div>
      {list}
    </div>
  );
};

SearchResults.propTypes = {
  className: React.PropTypes.string,
  query: React.PropTypes.string.isRequired,
  results: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  loadingState: React.PropTypes.oneOf([ IDLE, LOADING, LOADED ]).isRequired,
  onOpenAddMediaMenu: React.PropTypes.func.isRequired
};

export default SearchResults;
