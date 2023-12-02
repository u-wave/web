import cx from 'clsx';
import { useCallback, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { mdiClose, mdiDragHorizontalVariant } from '@mdi/js';
import { WAITLIST_USER } from '../../constants/DDItemTypes';
import isDraggingNearTopOfRow from '../../utils/isDraggingNearTopOfRow';
import useUserCard from '../../hooks/useUserCard';
import Avatar from '../Avatar';
import SvgIcon from '../SvgIcon';
import Username from '../Username';
import Position from './Position';
import { User } from '../../reducers/users';

type DropResult = { position: number };

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
  const [insertAbove, setInsertAbove] = useState(false);
  const [{ isDragging }, connectDragSource, connectDragPreview] = useDrag({
    type: WAITLIST_USER,
    item() {
      return { user };
    },
    end(item, monitor) {
      const result = monitor.getDropResult<DropResult>();
      if (item.user && result) {
        onMoveUser(result.position);
      }
    },
    collect(monitor) {
      return { isDragging: monitor.isDragging() };
    },
  });
  const [{ isOver }, connectDropTarget] = useDrop(() => ({
    accept: WAITLIST_USER,
    hover(_item, monitor) {
      setInsertAbove(isDraggingNearTopOfRow(monitor, userCard.refAnchor.current));
    },
    drop(_item, monitor): DropResult {
      const insertAfter = !isDraggingNearTopOfRow(monitor, userCard.refAnchor.current);
      return {
        position: insertAfter ? position + 1 : position,
      };
    },
    collect(monitor) {
      return { isOver: monitor.isOver() };
    },
  }), [position]);

  connectDropTarget(userCard.refAnchor);
  connectDragSource(handleRef);

  const rowClassName = cx(className, {
    UserRow: true,
    WaitlistRow: true,
    'WaitlistRow--moderate': true,
    'WaitlistRow--dropAbove': isOver && insertAbove,
    'WaitlistRow--dropBelow': isOver && !insertAbove,
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
        ref={connectDragPreview}
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
