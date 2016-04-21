import cx from 'classnames';
import * as React from 'react';
import MediaList from '../../MediaList';
import Loader from '../../Loader';

import PlaylistMeta from './Meta';
import PlaylistItemRow from './PlaylistItemRow';

import AddToPlaylistAction from '../../MediaList/Actions/AddToPlaylist';
import RemoveFromPlaylistAction from '../../MediaList/Actions/RemoveFromPlaylist';
import EditMediaAction from '../../MediaList/Actions/EditMedia';
import MoveToFirstAction from '../../MediaList/Actions/MoveToFirst';

const makeActions = ({ onOpenAddMediaMenu, onMoveToFirst, onEditMedia, onRemoveFromPlaylist }) =>
  (media, selection, index) => [
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

const PlaylistPanel = ({
  className, playlist, media, loading,
  onActivatePlaylist, onRenamePlaylist, onDeletePlaylist, onLoadPlaylistPage,
  onMoveMedia,
  ...props
}) => {
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
        size={playlist.size}
        media={media}
        rowComponent={PlaylistItemRow}
        rowProps={{ onMoveMedia }}
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
        onActivatePlaylist={onActivatePlaylist}
        onRenamePlaylist={onRenamePlaylist}
        onDeletePlaylist={onDeletePlaylist}
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
  onActivatePlaylist: React.PropTypes.func.isRequired,
  onRenamePlaylist: React.PropTypes.func.isRequired,
  onDeletePlaylist: React.PropTypes.func.isRequired,
  onLoadPlaylistPage: React.PropTypes.func.isRequired,
  onMoveMedia: React.PropTypes.func.isRequired
};

export default PlaylistPanel;
