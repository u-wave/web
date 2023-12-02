import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { MEDIA } from '../../../constants/DDItemTypes';
import isDraggingNearTopOfRow from '../../../utils/isDraggingNearTopOfRow';
import PlaylistItemRow from './PlaylistItemRow';
import { useMediaListContext } from '../../MediaList/BaseMediaList';

const {
  useRef,
  useState,
} = React;

function DroppablePlaylistItemRow({
  className,
  style,
  index,
  media,
  onClick,
}) {
  const { onMoveMedia } = useMediaListContext();
  const [insertingAbove, setInsertAbove] = useState(false);
  const droppableRef = useRef(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: MEDIA,
    drop(_item, monitor) {
      const { media: droppedItems } = monitor.getItem();
      if (droppedItems) {
        // Do not attempt to move when the selection is dropped on top of an item
        // that is in the selection.
        if (droppedItems.some((playlistItem) => playlistItem._id === media._id)) {
          return;
        }
        const insertBefore = isDraggingNearTopOfRow(monitor, droppableRef.current);
        onMoveMedia(
          droppedItems,
          insertBefore ? { before: media._id } : { after: media._id },
        );
      }
    },
    hover(_item, monitor) {
      setInsertAbove(isDraggingNearTopOfRow(monitor, droppableRef.current));
    },
    collect(monitor) {
      return { isOver: monitor.isOver() };
    },
  }), [media]);

  drop(droppableRef);
  return (
    <PlaylistItemRow
      className={cx(className, {
        'PlaylistItemRow--dropAbove': isOver && insertingAbove,
        'PlaylistItemRow--dropBelow': isOver && !insertingAbove,
      })}
      style={style}
      index={index}
      media={media}
      onClick={onClick}
      containerRef={droppableRef}
    />
  );
}

DroppablePlaylistItemRow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // from virtual list positioning
  index: PropTypes.number.isRequired,
  media: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DroppablePlaylistItemRow;
