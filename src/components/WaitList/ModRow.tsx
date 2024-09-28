import cx from 'clsx';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { attachClosestEdge, type Edge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { mdiClose, mdiDragHorizontalVariant } from '@mdi/js';
import useUserCard from '../../hooks/useUserCard';
import Avatar from '../Avatar';
import SvgIcon from '../SvgIcon';
import Username from '../Username';
import Position from './Position';
import type { User } from '../../reducers/users';
import { WAITLIST_USER } from '../../constants/DDItemTypes';

function createWaitlistData(data: { position: number }) {
  return Object.assign(data, { type: WAITLIST_USER });
}
function isWaitlistData(data: Record<string, unknown>): data is { position: number } {
  return data.type === WAITLIST_USER;
}

type ModRowProps = {
  className?: string,
  style?: React.CSSProperties,
  position: number,
  user: User,
  onMoveUser: (position: number) => void,
  onRemoveUser: () => void,
};

/**
 * A Draggable waitlist user row with moderation tools.
 */
function ModRow({
  className,
  style,
  position,
  user,
  onMoveUser,
  onRemoveUser,
}: ModRowProps) {
  const userCard = useUserCard(user);
  const onOpenCard = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    userCard.open();
    // The `userCard.open` reference never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drag-drop interactions
  const handleRef = useRef<HTMLDivElement>(null);
  const dragPreviewRef = useRef<HTMLButtonElement>(null);
  const [isDragging, setDragging] = useState(false);
  const [dropState, setDropState] = useState<Edge | null>(null);
  useEffect(() => {
    if (handleRef.current == null) return undefined;
    if (userCard.refAnchor.current == null) return undefined;

    return combine(
      draggable({
        element: userCard.refAnchor.current,
        dragHandle: handleRef.current,
        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          nativeSetDragImage?.(dragPreviewRef.current!, 0, 0);
        },
        onDrag: () => {
          setDragging(true);
        },
        onDrop: ({ location }) => {
          setDragging(false);

          const [target] = location.current.dropTargets;
          if (target == null || !isWaitlistData(target.data)) return;

          if (extractClosestEdge(target.data) === 'top') {
            onMoveUser(target.data.position);
          } else {
            onMoveUser(target.data.position + 1);
          }
        },
      }),
      dropTargetForElements({
        element: userCard.refAnchor.current,
        canDrop: ({ source }) => isWaitlistData(source.data),
        getData({ input, element }) {
          return attachClosestEdge(createWaitlistData({ position }), {
            input,
            element,
            allowedEdges: ['top', 'bottom'],
          });
        },
        onDragEnter({ self }) {
          setDropState(extractClosestEdge(self.data));
        },
        onDragLeave() {
          setDropState(null);
        },
        onDrop() {
          setDropState(null);
        },
      }),
    );
  }, [position, onMoveUser, userCard.refAnchor]);

  const rowClassName = cx(className, {
    UserRow: true,
    WaitlistRow: true,
    'WaitlistRow--moderate': true,
    'WaitlistRow--dropAbove': dropState === 'top',
    'WaitlistRow--dropBelow': dropState === 'bottom',
    'is-dragging': isDragging,
  });

  return (
    <div
      className={rowClassName}
      style={style}
      ref={userCard.refAnchor}
    >
      {userCard.card}
      <Position position={position + 1} />
      <button
        type="button"
        className="WaitlistRow-card"
        onClick={onOpenCard}
        ref={dragPreviewRef}
      >

        <Avatar
          className="UserRow-avatar"
          user={user}
        />
        <Username className="UserRow-username" user={user} />
      </button>
      <div className="WaitlistRow-tools">
        <div ref={handleRef} className="WaitlistRow-tool WaitlistRow-handle">
          <SvgIcon path={mdiDragHorizontalVariant} />
        </div>
        <button
          type="button"
          className="WaitlistRow-tool WaitlistRow-remove"
          onClick={onRemoveUser}
        >
          <SvgIcon path={mdiClose} />
        </button>
      </div>
    </div>
  );
}

export default ModRow;
