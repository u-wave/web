import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import BaseMediaList from '../../MediaList/BaseMediaList';
import PlaylistMeta from './Meta';
import PlaylistEmpty from './PlaylistEmpty';
import PlaylistFilterEmpty from './PlaylistFilterEmpty';
import PlaylistItemRow from './PlaylistItemRow';
import DroppablePlaylistItemRow from './DroppablePlaylistItemRow';

function PlaylistPanel(props) {
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
  } = props;

  const size = playlist.size;

  let list;
  if (loading) {
    list = (
      <div className="PlaylistPanel-loading">
        <CircularProgress size="100%" />
      </div>
    );
  } else if (isFiltered && media.length === 0) {
    list = <PlaylistFilterEmpty />;
  } else if (size === 0) {
    list = <PlaylistEmpty />;
  } else {
    list = (
      <BaseMediaList
        className="PlaylistPanel-media"
        size={size}
        media={media}
        listComponent="div"
        rowComponent={isFiltered ? PlaylistItemRow : DroppablePlaylistItemRow}
        contextProps={{ playlist, isFiltered, onMoveMedia }}
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
}

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
};

export default PlaylistPanel;
