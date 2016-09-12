import cx from 'classnames';
import * as React from 'react';
import MediaList from '../../MediaList';
import Loader from '../../Loader';

import PlaylistMeta from './Meta';
import PlainItemRow from '../../MediaList/Row';
import PlaylistItemRow from './PlaylistItemRow';

import AddToPlaylistAction from '../../MediaList/Actions/AddToPlaylist';
import RemoveFromPlaylistAction from '../../MediaList/Actions/RemoveFromPlaylist';
import EditMediaAction from '../../MediaList/Actions/EditMedia';
import MoveToFirstAction from '../../MediaList/Actions/MoveToFirst';

const makeActions = ({
  onOpenAddMediaMenu,
  onMoveToFirst,
  onEditMedia,
  onRemoveFromPlaylist,
  isFiltered
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
    <EditMediaAction
      key="edit"
      onEdit={() => onEditMedia(media)}
    />,
    <RemoveFromPlaylistAction
      key="remove"
      onRemove={() => onRemoveFromPlaylist(media, selection)}
    />
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
    onOpenPreviewMediaDialog
  } = props;

  let list;
  if (loading) {
    list = (
      <div className="PlaylistPanel-loading">
        <Loader size="large" />
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
  className: React.PropTypes.string,
  playlist: React.PropTypes.object.isRequired,
  media: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired,
  isFiltered: React.PropTypes.bool.isRequired,
  onShufflePlaylist: React.PropTypes.func.isRequired,
  onActivatePlaylist: React.PropTypes.func.isRequired,
  onRenamePlaylist: React.PropTypes.func.isRequired,
  onDeletePlaylist: React.PropTypes.func.isRequired,
  onLoadPlaylistPage: React.PropTypes.func.isRequired,
  onFilterPlaylistItems: React.PropTypes.func.isRequired,
  onNotDeletable: React.PropTypes.func.isRequired,
  onMoveMedia: React.PropTypes.func.isRequired,
  onOpenPreviewMediaDialog: React.PropTypes.func.isRequired
};

export default PlaylistPanel;
