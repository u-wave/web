import { findDOMNode } from 'react-dom';

export default function isDraggingNearTopOfRow(monitor, component) {
  const componentRect = findDOMNode(component).getBoundingClientRect();
  const clientOffset = monitor.getClientOffset();

  const middle = Math.ceil(componentRect.height / 2);
  const topOffset = clientOffset.y - componentRect.top;
  return topOffset < middle;
}
