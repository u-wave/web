import cx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { attachClosestEdge, extractClosestEdge, type Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { dropTargetForExternal } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import { containsURLs } from '@atlaskit/pragmatic-drag-and-drop/external/url';
import PlaylistItemRow from './PlaylistItemRow';
import type { PlaylistItem } from '../../../reducers/playlists';
import { MEDIA } from '../../../constants/DDItemTypes';

function isMediaDrag(x: Record<string, unknown>): x is { media: PlaylistItem[] } {
  return x.type === MEDIA;
}

const PLAYLIST_ITEM = 'dd/PLAYLIST_ITEM';
function createPlaylistItemData(media: PlaylistItem) {
  return {
    type: PLAYLIST_ITEM,
    media,
  };
}
export function isPlaylistItemData(data: Record<string, unknown>): data is { media: PlaylistItem } {
  return data.type === PLAYLIST_ITEM;
}

type PlaylistItemRowProps = {
  className?: string,
  // For virtual list positioning
  style?: React.CSSProperties,
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
  const droppableRef = useRef(null);

  const [dragState, setDragState] = useState<Edge | null>(null);
  useEffect(() => {
    if (droppableRef.current == null) return undefined;

    return combine(
      dropTargetForElements({
        element: droppableRef.current,
        canDrop: ({ source, element }) => isMediaDrag(source.data) && source.element !== element,
        // getIsSticky: () => true,
        getData({ input, element }) {
          return attachClosestEdge(createPlaylistItemData(media), {
            input,
            element,
            allowedEdges: ['top', 'bottom'],
          });
        },
        onDrag({ self }) {
          setDragState(extractClosestEdge(self.data));
        },
        onDragLeave() {
          setDragState(null);
        },
        onDrop() {
          setDragState(null);
        },
      }),
      dropTargetForExternal({
        element: droppableRef.current,
        canDrop: containsURLs,
        getData({ input, element }) {
          return attachClosestEdge(createPlaylistItemData(media), {
            input,
            element,
            allowedEdges: ['top', 'bottom'],
          });
        },
        onDragEnter({ self }) {
          setDragState(extractClosestEdge(self.data));
        },
        onDragLeave() {
          setDragState(null);
        },
        onDrop() {
          setDragState(null);
        },
      }),
    );
  }, [media]);

  return (
    <PlaylistItemRow
      className={cx(className, {
        'PlaylistItemRow--dropAbove': dragState === 'top',
        'PlaylistItemRow--dropBelow': dragState === 'bottom',
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
