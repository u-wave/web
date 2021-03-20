import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import DragIcon from '@material-ui/icons/DragHandle';
import RemoveIcon from '@material-ui/icons/Close';
import { WAITLIST_USER } from '../../constants/DDItemTypes';
import useUserCard from '../../hooks/useUserCard';
import Avatar from '../Avatar';
import Username from '../Username';
import Position from './Position';

const {
  useCallback,
  useEffect,
} = React;

/**
 * A Draggable waitlist user row with moderation tools.
 */
function ModRowBase({
  className,
  position,
  user,
  onMoveUser,
  onRemoveUser,
}) {
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
  const userCard = useUserCard(user);
  const onOpenCard = useCallback((event) => {
    event.preventDefault();
    userCard.open();
    // The `userCard.open` reference never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userCard.refAnchor.current) {
      connectDragPreview(userCard.refAnchor.current);
    }
  });

  return (
    <div
      className={cx(
        'UserRow',
        'WaitlistRow',
        'WaitlistRow--moderate',
        isDragging && 'is-dragging',
        className,
      )}
      ref={userCard.refAnchor}
    >
      {userCard.card}
      <Position position={position + 1} />
      <button
        type="button"
        className="WaitlistRow-card"
        onClick={onOpenCard}
      >
        <Avatar
          className="UserRow-avatar"
          user={user}
        />
        <Username className="UserRow-username" user={user} />
      </button>
      <div className="WaitlistRow-tools">
        <div ref={connectDragSource} className="WaitlistRow-tool WaitlistRow-handle">
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

ModRowBase.propTypes = {
  className: PropTypes.string,
  position: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  onMoveUser: PropTypes.func.isRequired,
  onRemoveUser: PropTypes.func.isRequired,
};

export default ModRowBase;
