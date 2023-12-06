import cx from 'clsx';
import React from 'react';
import { useDrop } from 'react-dnd';
import { MEDIA } from '../../../constants/DDItemTypes';
import isDraggingNearTopOfRow from '../../../utils/isDraggingNearTopOfRow';
import PlaylistItemRow from './PlaylistItemRow';
import { usePlaylistContext } from '.';
import type { PlaylistItem } from '../../../reducers/playlists';

const {
  useRef,
  useState,
} = React;

type PlaylistItemRowProps = {
  className?: string,
  // For virtual list positioning
  style?: React.CSSProperties,
  containerRef?: React.RefObject<HTMLDivElement>,
  index: number,
  media: PlaylistItem,
  onClick: () => void,
};
function DroppablePlaylistItemRow({
  className,
  style,
  index,
  media,
  onClick,
}: PlaylistItemRowProps) {
  const { onMoveMedia } = usePlaylistContext();
  const [insertingAbove, setInsertAbove] = useState(false);
  const droppableRef = useRef(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: MEDIA,
    drop(_item, monitor) {
      const { media: droppedItems } = monitor.getItem<{ media: PlaylistItem[] }>();
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

export default DroppablePlaylistItemRow;
