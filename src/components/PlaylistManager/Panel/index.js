import cx from 'clsx';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { restrictToWindowEdges, snapCenterToCursor } from '@dnd-kit/modifiers';
import CircularProgress from '@mui/material/CircularProgress';
import BaseMediaList from '../../MediaList/BaseMediaList';
import MediaDragPreview from '../../MediaList/MediaDragPreview';
import PlaylistMeta from './Meta';
import PlaylistEmpty from './PlaylistEmpty';
import PlaylistFilterEmpty from './PlaylistFilterEmpty';
import PlaylistItemRow from './PlaylistItemRow';
import DroppablePlaylistItemRow from './DroppablePlaylistItemRow';

const {
  useMemo,
  useState,
} = React;
const { createPortal } = ReactDOM;

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

  const [dragging, setDragging] = useState(null);
  const [optimisticDragResult, setOptimisticDragResult] = useState(null);
  useDndMonitor({
    onDragStart({ active }) {
      setDragging(active.data.current.media);
    },
    onDragEnd({ active, over }) {
      setDragging(null);
      if (!over || over.id === active.id) {
        return;
      }

      const activeIndex = media.findIndex((item) => item._id === active.id);
      const overIndex = media.findIndex((item) => item._id === over.id);

      // The `overIndex` is the index where the item WILL end up. To move the item there,
      // it needs to either come move before or after the `over` item, knowing that the indices
      // will all change by 1 after the item is moved. When moving an item up in the playlist,
      // it needs to be placed before the item it is dropped on, and the other way around when
      // moving it down.
      const moveOpts = activeIndex > overIndex
        ? { before: over.id }
        : { after: over.id };
      setOptimisticDragResult([activeIndex, overIndex]);
      onMoveMedia([active.data.current.media], moveOpts).finally(() => {
        setOptimisticDragResult(null);
      });
    },
    onDragCancel() {
      setDragging(null);
    },
  });

  const mediaIDs = useMemo(() => media.map((item, index) => (item ? item._id : `pseudo${index}`)), [media]);
  const optimisticItems = useMemo(() => (
    optimisticDragResult ? arrayMove(media, ...optimisticDragResult) : media
  ), [media, optimisticDragResult]);
  const contextProps = useMemo(() => ({ playlist, isFiltered }), [playlist, isFiltered]);
  const rowProps = useMemo(() => ({ isDragging: dragging !== null }), [dragging]);

  const dragPreview = useMemo(() => (
    dragging ? <MediaDragPreview items={{ media: [dragging] }} /> : null
  ), [dragging]);

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
        items={mediaIDs}
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
      {createPortal(
        <div className="DragLayerContainer">
          <DragOverlay modifiers={[restrictToWindowEdges, snapCenterToCursor]}>
            {dragPreview}
          </DragOverlay>
        </div>,
        document.body,
      )}
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
