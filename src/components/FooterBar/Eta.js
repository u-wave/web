import cx from 'classnames';
import * as React from 'react';
import pure from 'recompose/pure';
import formatDuration from '../../utils/formatDuration';

const getEtaText = eta => (eta > 0 ? `in ${formatDuration(eta)}` : '');

const Eta = ({ className, eta, nowPlaying }) => (
  <span className={cx('Eta', className)}>
    {nowPlaying ? 'playing now' : getEtaText(eta)}
  </span>
);

Eta.propTypes = {
  className: React.PropTypes.string,
  eta: React.PropTypes.number,
  nowPlaying: React.PropTypes.bool
};

export default pure(Eta);
