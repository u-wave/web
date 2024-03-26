import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useStore } from '../../hooks/useRedux';
import { currentTimeSelector } from '../../reducers/server';

const { useEffect, useRef } = React;

function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max));
}

function Progress({ className, startTime, duration }) {
  const animateRef = useRef();
  const store = useStore();

  useEffect(() => {
    let frame;
    function animate() {
      const currentTime = currentTimeSelector(store.getState());
      const width = Math.round(((currentTime - startTime) / duration) * 100) / 1000;
      animateRef.current.style.width = `${clamp(width, 0, 100)}%`;
      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [store, startTime, duration]);

  return (
    <div className={cx('Progress', className)}>
      <div className="Progress-fill" ref={animateRef} />
    </div>
  );
}

Progress.propTypes = {
  className: PropTypes.string,
  startTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default Progress;
