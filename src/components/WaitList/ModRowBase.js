import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { DragSource } from 'react-dnd';
import DragIcon from 'material-ui/svg-icons/editor/drag-handle';
import RemoveIcon from 'material-ui/svg-icons/navigation/close';
import { WAITLIST_USER } from '../../constants/DDItemTypes';
import userCardable from '../../utils/userCardable';
import Avatar from '../Avatar';
import Username from '../Username';
import Position from './Position';

const userSource = {
  beginDrag(props) {
    return { user: props.user };
  },
  endDrag(props, monitor) {
    const result = monitor.getDropResult();
    const item = monitor.getItem();
    if (item.user && result) {
      props.onMoveUser(result.position);
    }
  },
};

const collect = (connect, monitor) => ({
  isDragging: monitor.isDragging(),
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
});

/**
 * A Draggable waitlist user row with moderation tools.
 */
const ModRowBase = ({
  className,
  position,
  user,
  isDragging,
  connectDragPreview,
  connectDragSource,
  onOpenCard,
  onRemoveUser,
}) => connectDragPreview((
  <div
    className={cx(
      'UserRow',
      'WaitlistRow',
      'WaitlistRow--moderate',
      isDragging && 'is-dragging',
      className,
    )}
  >
    <Position position={position + 1} />
    <button
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
      {connectDragSource((
        <div className="WaitlistRow-tool WaitlistRow-handle">
          <DragIcon />
        </div>
      ))}
      <button
        className="WaitlistRow-tool WaitlistRow-remove"
        onClick={onRemoveUser}
      >
        <RemoveIcon />
      </button>
    </div>
  </div>
));

ModRowBase.propTypes = {
  className: PropTypes.string,
  position: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  onMoveUser: PropTypes.func.isRequired,
  onRemoveUser: PropTypes.func.isRequired,
};

export default compose(
  DragSource(WAITLIST_USER, userSource, collect),
  userCardable(),
  withProps(props => ({
    onOpenCard(event) {
      event.preventDefault();
      props.openUserCard(props.user);
    },
  })),
)(ModRowBase);
