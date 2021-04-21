import React from 'react';
import PropTypes from 'prop-types';
import MediaList from '../../MediaList';
import AddToPlaylistAction from '../../MediaList/Actions/AddToPlaylist';
import PreviewAction from '../../MediaList/Actions/Preview';
import SearchResultRow from './ResultRow';

function SearchResultsList({
  results,
  onOpenAddMediaMenu,
  onOpenPreviewMediaDialog,
}) {
  const makeActions = (media, selection) => (
    <>
      <PreviewAction onPreview={() => onOpenPreviewMediaDialog(media)} />
      <AddToPlaylistAction
        onAdd={(position) => onOpenAddMediaMenu(position, media, selection)}
      />
    </>
  );

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
