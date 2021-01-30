import React from 'react';
import PropTypes from 'prop-types';
import BaseRow from '../../MediaList/Row';

function SearchResultRow({
  className,
  media,
  style,
  selected = false,
  selection,
  onClick,
  onOpenPreviewMediaDialog,
  makeActions,
}) {
  let note = null;
  if (media.inPlaylists) {
    note = (
      <>
        In playlists:{' '}
        {media.inPlaylists.map((playlist) => playlist.name).join(', ')}
      </>
    );
  }

  return (
    <BaseRow
      className={className}
      media={media}
      note={note}
      style={style}
      selected={selected}
      selection={selection}
      onClick={onClick}
      onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
      makeActions={makeActions}
    />
  );
}

SearchResultRow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // from react-window
  media: PropTypes.object,
  inPlaylists: PropTypes.arrayOf(PropTypes.object),
  selected: PropTypes.bool,
  selection: PropTypes.array,
  onOpenPreviewMediaDialog: PropTypes.func,
  onClick: PropTypes.func,
  makeActions: PropTypes.func,
};

export default SearchResultRow;
