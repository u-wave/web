import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import DragIcon from '@material-ui/icons/DragHandle';
import RemoveIcon from '@material-ui/icons/Close';
import { WAITLIST_USER } from '../../constants/DDItemTypes';
import isDraggingNearTopOfRow from '../../utils/isDraggingNearTopOfRow';
import useUserCard from '../../hooks/useUserCard';
import Avatar from '../Avatar';
import Username from '../Username';
import Position from './Position';

const {
  useCallback,
  useRef,
  useState,
} = React;

/**
 * A Draggable waitlist user row with moderation tools.
 */
function ModRow({
  className,
  position,
  user,
  onMoveUser,
  onRemoveUser,
}) {
  const userCard = useUserCard(user);
  const onOpenCard = useCallback((event) => {
    event.preventDefault();
    userCard.open();
    // The `userCard.open` reference never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drag-drop interactions
  const handleRef = useRef();
  const [insertAbove, setInsertAbove] = useState(false);
  const [{ isDragging }, connectDragSource, connectDragPreview] = useDrag({
    type: WAITLIST_USER,
    item() {
      return { user };
    },
    end(item, monitor) {
      const result = monitor.getDropResult();
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
    hover(item, monitor) {
      setInsertAbove(isDraggingNearTopOfRow(monitor, userCard.refAnchor.current));
    },
    drop(item, monitor) {
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
          <DragIcon />
        </div>
        <button
          type="button"
          className="WaitlistRow-tool WaitlistRow-remove"
          onClick={onRemoveUser}
        >
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
}

ModRow.propTypes = {
  className: PropTypes.string,
  position: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  onMoveUser: PropTypes.func.isRequired,
  onRemoveUser: PropTypes.func.isRequired,
};

export default ModRow;
