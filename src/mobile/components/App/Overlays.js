import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

const Overlays = ({ children, active }) => {
  let view;
  if (Array.isArray(children)) {
    view = children.find(child => child.key === active);
  } else if (children.key === active) {
    view = children;
  }

  if (view) {
    // Pass on the `view.key` so that overlays are mounted and unmounted correctly
    // when switching from one to the other.
    view = (
      <CSSTransition
        key={view.key}
        mountOnEnter
        unmountOnExit
        classNames="Overlay"
        timeout={180}
      >
        {view}
      </CSSTransition>
    );
  }

  return (
    <TransitionGroup className="Overlays">
      {view}
    </TransitionGroup>
  );
};

Overlays.propTypes = {
  children: PropTypes.node,
  active: PropTypes.string,
};

export default Overlays;
