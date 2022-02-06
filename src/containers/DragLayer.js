import React from 'react';
import { DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { restrictToWindowEdges, snapCenterToCursor } from '@dnd-kit/modifiers';
import { MEDIA } from '../constants/DDItemTypes';
import MediaDragPreview from '../components/MediaList/MediaDragPreview';

const {
  useMemo,
  useState,
} = React;

function DragLayerContainer() {
  const [draggingMedia, setDraggingMedia] = useState(null);
  useDndMonitor({
    onDragStart({ active }) {
      if (active.data.current.type === MEDIA) {
        setDraggingMedia(active.data.current.media);
      }
    },
    onDragEnd() {
      setDraggingMedia(null);
    },
    onDragCancel() {
      setDraggingMedia(null);
    },
  });

  const dragPreview = useMemo(() => (
    draggingMedia ? <MediaDragPreview items={{ media: draggingMedia }} /> : null
  ), [draggingMedia]);

  return (
    <div className="DragLayerContainer">
      <DragOverlay modifiers={[restrictToWindowEdges, snapCenterToCursor]}>
        {dragPreview}
      </DragOverlay>
    </div>
  );
}

export default DragLayerContainer;
