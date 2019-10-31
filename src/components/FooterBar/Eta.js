import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import formatDuration from 'format-duration';
import useClock from '../../hooks/useClock';

function Eta({ className, base, endTime }) {
  const currentTime = useClock();
  const currentRemaining = endTime - currentTime;
  return (
    <span className={cx('Eta', className)}>
      {formatDuration(base + currentRemaining)}
    </span>
  );
}

Eta.propTypes = {
  className: PropTypes.string,
  endTime: PropTypes.number.isRequired,
  base: PropTypes.number.isRequired,
};

export default React.memo(Eta);
