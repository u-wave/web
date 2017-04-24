import React from 'react';
import PropTypes from 'prop-types';
import find from 'array-find';
import TransitionGroup from 'react-transition-group/CSSTransitionGroup';

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
  children: PropTypes.node,
  active: PropTypes.string
};

export default Overlays;
