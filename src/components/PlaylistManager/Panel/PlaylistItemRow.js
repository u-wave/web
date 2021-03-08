import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { MEDIA } from '../../../constants/DDItemTypes';
import isDraggingNearTopOfRow from '../../../utils/isDraggingNearTopOfRow';
import MediaRow from '../../MediaList/Row';

const {
  useEffect,
  useRef,
  useState,
} = React;

function PlaylistItemRow({
  onMoveMedia, style, media, ...props
}) {
  const [insertingAbove, setInsertAbove] = useState(false);
  const refWrapper = useRef(null);
  const [{ isOver }, connectDropTarget] = useDrop(() => ({
    accept: MEDIA,
    drop(item, monitor) {
      const { media: droppedItems } = monitor.getItem();
      if (droppedItems) {
        // Do not attempt to move when the selection is dropped on top of an item
        // that is in the selection.
        if (droppedItems.some((playlistItem) => playlistItem._id === media._id)) {
          return;
        }
        const insertBefore = isDraggingNearTopOfRow(monitor, refWrapper.current);
        onMoveMedia(
          droppedItems,
          insertBefore ? { before: media._id } : { after: media._id },
        );
      }
    },
    hover(item, monitor) {
      setInsertAbove(isDraggingNearTopOfRow(monitor, refWrapper.current));
    },
    collect(monitor) {
      return { isOver: monitor.isOver() };
    },
  }), [media]);

  useEffect(() => {
    connectDropTarget(refWrapper.current);
  });

  const dropIndicator = <div className="PlaylistItemRow-drop-indicator" />;

  // Wrapper div to make sure that hovering the drop indicator
  // does not change the hover state to a different element, which
  // would cause thrashing.
  return (
    <div className="PlaylistItemRow" style={style} ref={refWrapper}>
      {isOver && insertingAbove && dropIndicator}
      <MediaRow {...props} media={media} />
      {isOver && !insertingAbove && dropIndicator}
    </div>
  );
}

PlaylistItemRow.propTypes = {
  style: PropTypes.object, // from react-window
  media: PropTypes.object,
  onMoveMedia: PropTypes.func.isRequired,
};

export default PlaylistItemRow;
