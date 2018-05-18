import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import MediaList from '../../MediaList';
import PlaylistMeta from './Meta';
import PlainItemRow from '../../MediaList/Row';
import PlaylistItemRow from './PlaylistItemRow';
import AddToPlaylistAction from '../../MediaList/Actions/AddToPlaylist';
import RemoveFromPlaylistAction from '../../MediaList/Actions/RemoveFromPlaylist';
import EditMediaAction from '../../MediaList/Actions/EditMedia';
import MoveToFirstAction from '../../MediaList/Actions/MoveToFirst';
import MoveToLastAction from '../../MediaList/Actions/MoveToLast';

const makeActions = ({
  onOpenAddMediaMenu,
  onMoveToFirst,
  onMoveToLast,
  onEditMedia,
  onRemoveFromPlaylist,
  isFiltered,
}) =>
  (media, selection, index) => [
    <AddToPlaylistAction
      key="add"
      onAdd={position => onOpenAddMediaMenu(position, media, selection)}
    />,
    // Don't show the "move to first" action on the first item in the playlist.
    // If the playlist is filtered we don't know if the first item to show is
    // also the first in the playlist, so just show it always in that case.
    (index > 0 || isFiltered) && (
      <MoveToFirstAction
        key="first"
        onFirst={() => onMoveToFirst(media, selection)}
      />
    ),
    (index === 0 && !isFiltered) && (
      <MoveToLastAction
        key="last"
        onLast={() => onMoveToLast(media, selection)}
      />
    ),
    <EditMediaAction
      key="edit"
      onEdit={() => onEditMedia(media)}
    />,
    <RemoveFromPlaylistAction
      key="remove"
      onRemove={() => onRemoveFromPlaylist(media, selection)}
    />,
  ];

const PlaylistPanel = (props) => {
  const {
    className,
    playlist,
    media,
    loading,
    isFiltered,
    onShufflePlaylist,
    onActivatePlaylist,
    onRenamePlaylist,
    onDeletePlaylist,
    onNotDeletable,
    onLoadPlaylistPage,
    onFilterPlaylistItems,
    onMoveMedia,
    onOpenPreviewMediaDialog,
  } = props;

  let list;
  if (loading) {
    list = (
      <div className="PlaylistPanel-loading">
        <CircularProgress size="100%" />
      </div>
    );
  } else {
    list = (
      <MediaList
        className="PlaylistPanel-media"
        size={media.length}
        media={media}
        rowComponent={isFiltered ? PlainItemRow : PlaylistItemRow}
        rowProps={{ onMoveMedia }}
        onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
        makeActions={makeActions(props)}
        onRequestPage={onLoadPlaylistPage}
      />
    );
  }

  return (
    <div className={cx('PlaylistPanel', className)}>
      <PlaylistMeta
        className="PlaylistPanel-meta"
        id={playlist._id}
        name={playlist.name}
        active={playlist.active}
        onShufflePlaylist={onShufflePlaylist}
        onActivatePlaylist={onActivatePlaylist}
        onRenamePlaylist={onRenamePlaylist}
        onDeletePlaylist={onDeletePlaylist}
        onNotDeletable={onNotDeletable}
        onFilter={onFilterPlaylistItems}
      />
      {list}
    </div>
  );
};

PlaylistPanel.propTypes = {
  className: PropTypes.string,
  playlist: PropTypes.object.isRequired,
  media: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  onShufflePlaylist: PropTypes.func.isRequired,
  onActivatePlaylist: PropTypes.func.isRequired,
  onRenamePlaylist: PropTypes.func.isRequired,
  onDeletePlaylist: PropTypes.func.isRequired,
  onLoadPlaylistPage: PropTypes.func.isRequired,
  onFilterPlaylistItems: PropTypes.func.isRequired,
  onNotDeletable: PropTypes.func.isRequired,
  onMoveMedia: PropTypes.func.isRequired,
  onOpenPreviewMediaDialog: PropTypes.func.isRequired,
};

export default PlaylistPanel;
