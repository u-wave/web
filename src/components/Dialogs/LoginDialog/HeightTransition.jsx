import React from 'react';
import PropTypes from 'prop-types';

const {
  useEffect,
  useRef,
} = React;

const style = {
  overflow: 'hidden',
  transition: 'height 300ms ease',
};

function HeightTransition({ children }) {
  const wrapper = useRef(null);
  const activeChild = useRef(null);

  useEffect(() => {
    if (activeChild.current) {
      wrapper.current.style.height = `${activeChild.current.scrollHeight}px`;
    }
  }, [children]);

  return (
    <div ref={wrapper} style={style}>
      <div ref={activeChild}>{children}</div>
    </div>
  );
}

HeightTransition.propTypes = {
  children: PropTypes.node,
};

export default HeightTransition;
