import { findDOMNode } from 'react-dom';

export default function isDraggingNearTopOfRow(monitor, component) {
  // FIXME do this without findDOMNode, perhaps by using refs in the calling
  // components.
  // eslint-disable-next-line react/no-find-dom-node
  const componentRect = findDOMNode(component).getBoundingClientRect();
  const clientOffset = monitor.getClientOffset();

  const middle = Math.ceil(componentRect.height / 2);
  const topOffset = clientOffset.y - componentRect.top;
  return topOffset < middle;
}
