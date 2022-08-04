import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIcon from '@mui/icons-material/DragHandle';
import RemoveIcon from '@mui/icons-material/Close';
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
function ModRow({
  className,
  style: parentStyle,
  position,
  user,
  onRemoveUser,
}) {
  const userCard = useUserCard(user);
  const onOpenCard = useCallback((event) => {
    event.preventDefault();
    userCard.open();
    // The `userCard.open` reference never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
  } = useSortable({
    id: user._id,
  });

  useEffect(() => {
    setNodeRef(userCard.refAnchor.current);
  }, [setNodeRef, userCard.refAnchor]);

  const style = {
    ...parentStyle,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const rowClassName = cx(className, {
    UserRow: true,
    WaitlistRow: true,
    'WaitlistRow--moderate': true,
  });

  return (
    <div
      className={rowClassName}
      ref={userCard.refAnchor}
      style={style}
      {...attributes}
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
        <div {...listeners} className="WaitlistRow-tool WaitlistRow-handle">
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
  style: PropTypes.object.isRequired, // from virtual list positioning
  position: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  onRemoveUser: PropTypes.func.isRequired,
};

export default ModRow;
