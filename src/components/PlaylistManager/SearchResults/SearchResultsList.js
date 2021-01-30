import React from 'react';
import PropTypes from 'prop-types';
import MediaList from '../../MediaList';
import AddToPlaylistAction from '../../MediaList/Actions/AddToPlaylist';
import SearchResultRow from './ResultRow';

const {
  useCallback,
} = React;

function SearchResultsList({
  results,
  onOpenAddMediaMenu,
  onOpenPreviewMediaDialog,
}) {
  const makeActions = useCallback((media, selection) => (
    <AddToPlaylistAction
      onAdd={(position) => onOpenAddMediaMenu(position, media, selection)}
    />
  ), [onOpenAddMediaMenu]);

  return (
    <MediaList
      className="PlaylistPanel-media"
      media={results}
      onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
      makeActions={makeActions}
      rowComponent={SearchResultRow}
    />
  );
}

SearchResultsList.propTypes = {
  results: PropTypes.array.isRequired,
  onOpenAddMediaMenu: PropTypes.func.isRequired,
  onOpenPreviewMediaDialog: PropTypes.func.isRequired,
};

export default SearchResultsList;
