import React from 'react';
import { DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { restrictToWindowEdges, snapCenterToCursor } from '@dnd-kit/modifiers';
import { MEDIA, SEARCH_RESULT } from '../constants/DDItemTypes';
import MediaDragPreview from '../components/MediaList/MediaDragPreview';

const { useState } = React;

function DragLayerContainer() {
  const [dragPreview, setDragPreview] = useState(null);
  useDndMonitor({
    onDragStart({ active }) {
      const { type } = active.data.current;
      if (type === MEDIA || type === SEARCH_RESULT) {
        setDragPreview(<MediaDragPreview items={{ media: active.data.current.media }} />)
      }
    },
    onDragEnd() {
      setDragPreview(null);
    },
    onDragCancel() {
      setDragPreview(null);
    },
  });

  return (
    <div className="DragLayerContainer">
      <DragOverlay modifiers={[restrictToWindowEdges, snapCenterToCursor]}>
        {dragPreview}
      </DragOverlay>
    </div>
  );
}

export default DragLayerContainer;
