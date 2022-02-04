import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MEDIA } from '../../../constants/DDItemTypes';
import PlaylistItemRow from './PlaylistItemRow';

const {
  useEffect,
  useRef,
} = React;

function DroppablePlaylistItemRow({
  style,
  media,
  ...props
}) {
  const droppableRef = useRef(null);
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({
    id: media._id,
    data: {
      type: MEDIA,
      media,
    },
  });
  useEffect(() => {
    setNodeRef(droppableRef.current);
  });

  const draggableStyle = {
    ...style,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <PlaylistItemRow
      className={cx({ 'is-dragging': isDragging })}
      style={draggableStyle}
      media={media}
      containerRef={droppableRef}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
}

DroppablePlaylistItemRow.propTypes = {
  style: PropTypes.object, // from react-window
  media: PropTypes.object.isRequired,
};

export default DroppablePlaylistItemRow;
