import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import formatDuration from 'format-duration';
import useClock from '../../hooks/useClock';

function PlayTime({ className, startTime, mediaDuration }) {
  const currentTime = useClock();
  const currentElapsed = currentTime - startTime;
  return (
    <span className={cx('Timer', className)}>
      {formatDuration(currentElapsed)} / {formatDuration(mediaDuration * 1000)}
    </span>
  );
}

PlayTime.propTypes = {
  className: PropTypes.string,
  startTime: PropTypes.number.isRequired,
  mediaDuration: PropTypes.number.isRequired,
};

export default React.memo(PlayTime);
