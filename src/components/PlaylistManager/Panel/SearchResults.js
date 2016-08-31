import cx from 'classnames';
import * as React from 'react';
import { translate } from 'react-i18next';
import { IDLE, LOADING, LOADED } from '../../../constants/LoadingStates';
import Loader from '../../Loader';
import MediaList from '../../MediaList';

import AddToPlaylistAction from '../../MediaList/Actions/AddToPlaylist';

const SearchResults = ({
  t,
  className,
  query,
  results,
  loadingState,
  onOpenAddMediaMenu,
  onOpenPreviewMediaDialog
}) => {
  let list;
  if (loadingState === LOADED) {
    list = (
      <MediaList
        className="PlaylistPanel-media"
        media={results}
        onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
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
        {t('playlists.search.results', { query })}
      </div>
      {list}
    </div>
  );
};

SearchResults.propTypes = {
  t: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  query: React.PropTypes.string.isRequired,
  results: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  loadingState: React.PropTypes.oneOf([ IDLE, LOADING, LOADED ]).isRequired,
  onOpenAddMediaMenu: React.PropTypes.func.isRequired,
  onOpenPreviewMediaDialog: React.PropTypes.func.isRequired
};

export default translate()(SearchResults);
