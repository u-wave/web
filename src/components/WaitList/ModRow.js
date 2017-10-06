import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { WAITLIST_USER } from '../../constants/DDItemTypes';
import isDraggingNearTopOfRow from '../../utils/isDraggingNearTopOfRow';

import ModRowBase from './ModRowBase';

const userTarget = {
  hover(props, monitor, component) {
    component.setState({
      insertAbove: isDraggingNearTopOfRow(monitor, component)
    });
  },
  drop(props, monitor, component) {
    const insertAfter = !isDraggingNearTopOfRow(monitor, component);
    const { position } = component.props;
    return { position: insertAfter ? position + 1 : position };
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
});

/**
 * A Waitlist user row with drag/drop reordering support. This draws a drop
 * indicator around the main row.
 */
class ModRow extends React.Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
  };

  state = {
    insertAbove: false
  };

  render() {
    const {
      connectDropTarget,
      isOver,
      ...props
    } = this.props;
    const { insertAbove } = this.state;

    const dropIndicator = <div className="WaitlistRow-drop-indicator" />;

    return connectDropTarget((
      <div>
        {isOver && insertAbove && dropIndicator}
        <ModRowBase {...props} />
        {isOver && !insertAbove && dropIndicator}
      </div>
    ));
  }
}

export default DropTarget(WAITLIST_USER, userTarget, collect)(ModRow);
