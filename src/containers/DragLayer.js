import React from 'react';
import { useDragLayer } from 'react-dnd';
import { MEDIA } from '../constants/DDItemTypes';
import MediaDragPreview from '../components/MediaList/MediaDragPreview';

function DragLayerContainer() {
  const {
    type, items, currentOffset, isDragging,
  } = useDragLayer((monitor) => ({
    items: monitor.getItem(),
    type: monitor.getItemType(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !items) {
    return null;
  }

  function renderPreview() {
    switch (type) {
      case MEDIA:
        return <MediaDragPreview items={items} currentOffset={currentOffset} />;
      default:
        return null;
    }
  }

  return (
    <div className="DragLayerContainer">
      {renderPreview()}
    </div>
  );
}

export default DragLayerContainer;
