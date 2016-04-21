import * as React from 'react';
import find from 'array-find';
import TransitionGroup from 'react-addons-css-transition-group';

const Overlays = ({ children, active }) => {
  let view;
  if (Array.isArray(children)) {
    view = find(children, child => child.key === active);
  } else if (children.key === active) {
    view = children;
  }
  return (
    <div className="Overlays">
      <TransitionGroup
        transitionName="Overlay"
        transitionEnterTimeout={180}
        transitionLeaveTimeout={180}
      >
        {view}
      </TransitionGroup>
    </div>
  );
};

Overlays.propTypes = {
  children: React.PropTypes.node,
  active: React.PropTypes.string
};

export default Overlays;
