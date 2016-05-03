import cx from 'classnames';
import * as React from 'react';
import pure from 'recompose/pure';
import formatDuration from '../../utils/formatDuration';
import timed from '../../utils/timed';

const getEtaText = eta => (eta > 0 ? `in ${formatDuration(eta)}` : '');

const Eta = ({ className, base, currentTime, endTime, nowPlaying }) => {
  const currentRemaining = Math.floor((endTime - currentTime) / 1000);
  return (
    <span className={cx('Eta', className)}>
      {nowPlaying ? 'playing now' : getEtaText(base + currentRemaining)}
    </span>
  );
};

Eta.propTypes = {
  className: React.PropTypes.string,
  currentTime: React.PropTypes.number.isRequired,
  endTime: React.PropTypes.number,
  base: React.PropTypes.number,
  nowPlaying: React.PropTypes.bool
};

export default timed()(pure(Eta));
