import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
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
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  query: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  loadingState: PropTypes.oneOf([ IDLE, LOADING, LOADED ]).isRequired,
  onOpenAddMediaMenu: PropTypes.func.isRequired,
  onOpenPreviewMediaDialog: PropTypes.func.isRequired
};

export default translate()(SearchResults);
