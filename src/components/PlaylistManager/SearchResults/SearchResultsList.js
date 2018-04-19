import React from 'react';
import PropTypes from 'prop-types';
import MediaList from '../../MediaList';
import AddToPlaylistAction from '../../MediaList/Actions/AddToPlaylist';

const makeActions = onOpenAddMediaMenu => (media, selection) => (
  <React.Fragment>
    <AddToPlaylistAction
      onAdd={position => onOpenAddMediaMenu(position, media, selection)}
    />
  </React.Fragment>
);

const SearchResultsList = ({
  results,
  onOpenAddMediaMenu,
  onOpenPreviewMediaDialog,
}) => (
  <MediaList
    className="PlaylistPanel-media"
    media={results}
    onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
    makeActions={makeActions(onOpenAddMediaMenu)}
  />
);

SearchResultsList.propTypes = {
  results: PropTypes.array.isRequired,
  onOpenAddMediaMenu: PropTypes.func.isRequired,
  onOpenPreviewMediaDialog: PropTypes.func.isRequired,
};

export default SearchResultsList;
