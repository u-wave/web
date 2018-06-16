import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

// Use the css transitionend event to mark the finish of a transition.
// Using this instead of a timeout prop so that we don't have to define
// the timeout in multiple places, and it also fixes a small visual
// glitch in Firefox where a scrollbar would appear for a split second
// when the enter transition was almost complete.
function addTransitionEndListener(node, done) {
  node.addEventListener('transitionend', done, false);
}

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
        addEndListener={addTransitionEndListener}
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
