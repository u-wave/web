import cx from 'classnames';
import React from 'react';
import formatDuration from '../../utils/formatDuration';

const getEtaText = eta => eta > 0 ? `in ${formatDuration(eta)}` : '';

const Eta = ({ className, eta, nowPlaying }) => {
  return (
    <span className={cx('Eta', className)}>
      {nowPlaying ? 'playing now' : getEtaText(eta)}
    </span>
  );
};

export default Eta;
