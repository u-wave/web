import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import formatDuration from 'format-duration';
import timed from '../../utils/timed';

const enhance = compose(
  timed(),
  React.memo,
);

const Eta = ({
  className, base, currentTime, endTime,
}) => {
  const currentRemaining = endTime - currentTime;
  return (
    <span className={cx('Eta', className)}>
      {formatDuration(base + currentRemaining)}
    </span>
  );
};

Eta.propTypes = {
  className: PropTypes.string,
  currentTime: PropTypes.number.isRequired,
  endTime: PropTypes.number,
  base: PropTypes.number,
};

export default enhance(Eta);
