import cx from 'classnames';
import * as React from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import formatDuration from '../../utils/formatDuration';
import timed from '../../utils/timed';

const Eta = ({ className, base, currentTime, endTime }) => {
  const currentRemaining = Math.floor((endTime - currentTime) / 1000);
  return (
    <span className={cx('Eta', className)}>
      {formatDuration(base + currentRemaining)}
    </span>
  );
};

Eta.propTypes = {
  className: React.PropTypes.string,
  currentTime: React.PropTypes.number.isRequired,
  endTime: React.PropTypes.number,
  base: React.PropTypes.number
};

export default compose(
  timed(),
  pure
)(Eta);
