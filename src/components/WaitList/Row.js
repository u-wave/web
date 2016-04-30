import cx from 'classnames';
import * as React from 'react';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
import DragIcon from 'material-ui/svg-icons/editor/drag-handle';

import { WAITLIST_USER } from '../../constants/DDItemTypes';
import isDraggingNearTopOfRow from '../../utils/isDraggingNearTopOfRow';

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
  }
};

const userTarget = {
  drop(props, monitor, component) {
    const insertAfter = !isDraggingNearTopOfRow(monitor, component);
    const position = component.props.position;
    return { position: insertAfter ? position + 1 : position };
  }
};

const collectSource = connect => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview()
});

const collectTarget = connect => ({
  connectDropTarget: connect.dropTarget()
});

const DraggableRow = ({
  className,
  position,
  user,
  connectDragPreview,
  connectDragSource,
  connectDropTarget
}) => connectDropTarget(connectDragPreview(
  <div className={cx('UserRow', 'UserRow--queue', className)}>
    <Position position={position + 1} />
    <Avatar
      className="UserRow-avatar"
      user={user}
    />
    <Username className="UserRow-username" user={user} />
    {connectDragSource(
      <div className="UserRow-handle">
        <DragIcon />
      </div>
    )}
  </div>
));

DraggableRow.propTypes = {
  className: React.PropTypes.string,
  position: React.PropTypes.number.isRequired,
  user: React.PropTypes.object.isRequired,
  connectDragPreview: React.PropTypes.func.isRequired,
  connectDragSource: React.PropTypes.func.isRequired,
  connectDropTarget: React.PropTypes.func.isRequired,
  onMoveUser: React.PropTypes.func.isRequired
};

export default compose(
  DropTarget(WAITLIST_USER, userTarget, collectTarget),
  DragSource(WAITLIST_USER, userSource, collectSource)
)(DraggableRow);
