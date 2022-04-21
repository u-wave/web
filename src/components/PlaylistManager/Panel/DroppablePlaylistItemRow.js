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
  className,
  style,
  media,
  index,
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
      media: [media],
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
      className={cx(className, { 'is-dragging': isDragging })}
      style={draggableStyle}
      index={index}
      media={media}
      containerRef={droppableRef}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
}

DroppablePlaylistItemRow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // from virtual list positioning
  index: PropTypes.number.isRequired,
  media: PropTypes.object.isRequired,
};

export default DroppablePlaylistItemRow;
