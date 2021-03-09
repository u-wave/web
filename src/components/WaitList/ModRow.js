import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { WAITLIST_USER } from '../../constants/DDItemTypes';
import isDraggingNearTopOfRow from '../../utils/isDraggingNearTopOfRow';

import ModRowBase from './ModRowBase';

const {
  useEffect,
  useRef,
  useState,
} = React;

function ModRow({ style, ...props }) {
  const { position } = props;

  const [insertAbove, setInsertAbove] = useState(false);
  const refRow = useRef(null);
  const [{ isOver }, connectDropTarget] = useDrop(() => ({
    accept: WAITLIST_USER,
    hover(item, monitor) {
      setInsertAbove(isDraggingNearTopOfRow(monitor, refRow.current));
    },
    drop(item, monitor) {
      const insertAfter = !isDraggingNearTopOfRow(monitor, refRow.current);
      return {
        position: insertAfter ? position + 1 : position,
      };
    },
    collect(monitor) {
      return { isOver: monitor.isOver() };
    },
  }), [position]);

  useEffect(() => {
    connectDropTarget(refRow.current);
  });

  const dropIndicator = <div className="WaitlistRow-drop-indicator" />;

  // Need a wrapper div so hovering over the drop indicator
  // does not change the hover state.
  return (
    <div style={style} ref={refRow}>
      {isOver && insertAbove && dropIndicator}
      <ModRowBase {...props} />
      {isOver && !insertAbove && dropIndicator}
    </div>
  );
}

ModRow.propTypes = {
  style: PropTypes.object, // for react-window
  position: PropTypes.number.isRequired,
};

export default ModRow;
