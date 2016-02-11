import cx from 'classnames';
import React from 'react';
import MediaList from '../../MediaList';
import Loader from '../../Loader';
import PlaylistMeta from './Meta';

import AddToPlaylistAction from '../../MediaList/Actions/AddToPlaylist';
import RemoveFromPlaylistAction from '../../MediaList/Actions/RemoveFromPlaylist';
import EditMediaAction from '../../MediaList/Actions/EditMedia';
import MoveToFirstAction from '../../MediaList/Actions/MoveToFirst';

const makeActions = ({ onOpenAddMediaMenu, onMoveToFirst, onEditMedia, onRemoveFromPlaylist }) => {
  return (media, selection, index) => [
    <AddToPlaylistAction
      key="add"
      onAdd={position => onOpenAddMediaMenu(position, media, selection)}
    />,
    index > 0 && (
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
};

const PlaylistPanel = ({
  className, playlist, media, loading,
  onActivatePlaylist, onRenamePlaylist, onDeletePlaylist, onLoadPlaylistPage,
  ...props
}) => {
  const list = loading
    ? <div className="PlaylistPanel-loading">
        <Loader size="large" />
      </div>
    : <MediaList
        className="PlaylistPanel-media"
        size={playlist.size}
        media={media}
        makeActions={makeActions(props)}
        onRequestPage={onLoadPlaylistPage}
      />;

  return (
    <div className={cx('PlaylistPanel', className)}>
      <PlaylistMeta
        className="PlaylistPanel-meta"
        id={playlist._id}
        name={playlist.name}
        active={playlist.active}
        onActivatePlaylist={onActivatePlaylist}
        onRenamePlaylist={onRenamePlaylist}
        onDeletePlaylist={onDeletePlaylist}
      />
      {list}
    </div>
  );
};

export default PlaylistPanel;
