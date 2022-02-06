import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useDndMonitor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import CircularProgress from '@mui/material/CircularProgress';
import BaseMediaList from '../../MediaList/BaseMediaList';
import PlaylistMeta from './Meta';
import PlaylistEmpty from './PlaylistEmpty';
import PlaylistFilterEmpty from './PlaylistFilterEmpty';
import PlaylistItemRow from './PlaylistItemRow';
import DroppablePlaylistItemRow from './DroppablePlaylistItemRow';
import { MEDIA, PLAYLIST } from '../../../constants/DDItemTypes';

const {
  useMemo,
  useState,
} = React;

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
    onAddToPlaylist,
    onMoveMedia,
  } = props;

  const [isDragging, setIsDragging] = useState(false);
  const [optimisticDragResult, setOptimisticDragResult] = useState(null);
  useDndMonitor({
    onDragStart() {
      setIsDragging(true);
    },
    onDragEnd({ active, over }) {
      setIsDragging(false);
      if (!over || over.id === active.id) {
        return;
      }

      const item = active.data.current;
      const target = over.data.current;

      if (target.type === PLAYLIST) {
        onAddToPlaylist(target.playlist, item.media);
      } else if (target.type === MEDIA) {
        const activeIndex = media.findIndex((m) => m._id === active.id);
        const overIndex = media.findIndex((m) => m._id === over.id);

        // The `overIndex` is the index where the item WILL end up. To move the item there,
        // it needs to either come move before or after the `over` item, knowing that the indices
        // will all change by 1 after the item is moved. When moving an item up in the playlist,
        // it needs to be placed before the item it is dropped on, and the other way around when
        // moving it down.
        const moveOpts = activeIndex > overIndex
          ? { before: over.id }
          : { after: over.id };
        setOptimisticDragResult([activeIndex, overIndex]);

        onMoveMedia(item.media, moveOpts).finally(() => {
          setOptimisticDragResult(null);
        });
      }
    },
    onDragCancel() {
      setIsDragging(false);
    },
  });

  const mediaIDs = useMemo(() => media.map((item, index) => (item ? item._id : `pseudo${index}`)), [media]);
  const contextProps = useMemo(() => ({ playlist, isFiltered }), [playlist, isFiltered]);
  const rowProps = useMemo(() => ({ isDragging }), [isDragging]);

  const optimisticMediaIDs = useMemo(() => (
    optimisticDragResult ? arrayMove(mediaIDs, ...optimisticDragResult) : mediaIDs
  ), [mediaIDs, optimisticDragResult]);
  const optimisticItems = useMemo(() => (
    optimisticDragResult ? arrayMove(media, ...optimisticDragResult) : media
  ), [media, optimisticDragResult]);

  let list;
  if (loading) {
    list = (
      <div className="PlaylistPanel-loading">
        <CircularProgress size="100%" />
      </div>
    );
  } else if (media.length === 0) {
    list = isFiltered
      ? <PlaylistFilterEmpty />
      : <PlaylistEmpty />;
  } else {
    list = (
      <BaseMediaList
        className="PlaylistPanel-media"
        size={optimisticItems.length}
        media={optimisticItems}
        listComponent="div"
        rowComponent={isFiltered ? PlaylistItemRow : DroppablePlaylistItemRow}
        rowProps={rowProps}
        contextProps={contextProps}
        onRequestPage={onLoadPlaylistPage}
      />
    );
  }

  if (!isFiltered) {
    list = (
      <SortableContext
        items={optimisticMediaIDs}
        strategy={verticalListSortingStrategy}
      >
        {list}
      </SortableContext>
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
  onAddToPlaylist: PropTypes.func.isRequired,
  onMoveMedia: PropTypes.func.isRequired,
};

export default PlaylistPanel;
