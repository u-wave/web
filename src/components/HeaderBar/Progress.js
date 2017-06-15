import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import transformStyle from '../../utils/transformStyle';

const Progress = ({ className, currentProgress, timeRemaining }) => {
  function animate(el) {
    if (!el) return;

    // Set the width to the current progress without animating
    Object.assign(el.style, {
      transitionDuration: '0s'
    }, transformStyle(`scaleX(${currentProgress})`));

    // Force browser to rerender the bar immediately
    el.scrollWidth; // eslint-disable-line no-unused-expressions

    // Set up the actual animation. Progress bar goes to 100% full
    // in $timeRemaining seconds.
    Object.assign(el.style, {
      transitionDuration: `${timeRemaining}s`
    }, transformStyle('scaleX(1)'));
  }

  return (
    <div className={cx('Progress', className)}>
      <div className="Progress-fill" ref={animate} />
    </div>
  );
};

Progress.propTypes = {
  className: PropTypes.string,
  currentProgress: PropTypes.number.isRequired,
  timeRemaining: PropTypes.number.isRequired
};

export default Progress;
