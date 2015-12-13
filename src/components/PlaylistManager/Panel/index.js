import cx from 'classnames';
import React from 'react';
import MediaList from '../../MediaList';
import Loader from '../../Loader';
import PlaylistMeta from './Meta';

import AddToPlaylistAction from '../../MediaList/Actions/AddToPlaylist';
import RemoveFromPlaylistAction from '../../MediaList/Actions/RemoveFromPlaylist';
import EditMediaAction from '../../MediaList/Actions/EditMedia';
import MoveToFirstAction from '../../MediaList/Actions/MoveToFirst';

const makeActions = ({ onAddToPlaylist, onMoveToFirst, onEditMedia, onRemoveFromPlaylist }) => {
  return (media, selection, index) => [
    <AddToPlaylistAction
      key="add"
      onAdd={() => onAddToPlaylist(media, selection)}
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

const PlaylistPanel = ({ className, playlist, media, loading, ...props }) => {
  const list = loading
    ? <div className="PlaylistPanel-loading">
        <Loader size="large" />
      </div>
    : <MediaList
        className="PlaylistPanel-media"
        media={media}
        makeActions={makeActions(props)}
      />;

  return (
    <div className={cx('PlaylistPanel', className)}>
      <PlaylistMeta
        className="PlaylistPanel-meta"
        id={playlist._id}
        name={playlist.name}
        active={playlist.active}
      />
      {list}
    </div>
  );
};

export default PlaylistPanel;
