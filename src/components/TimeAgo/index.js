import * as React from 'react';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import ms from 'ms';

import timed from '../../utils/timed';

const TimeAgo = ({ t, currentTime, timestamp }) => {
  const secondsAgo = Math.max(0, Math.floor((currentTime - timestamp) / 1000));
  return (
    <span>
      {t('timeAgo', { time: ms(secondsAgo * 1000, { long: true }) })}
    </span>
  );
};

TimeAgo.propTypes = {
  t: React.PropTypes.func.isRequired,
  currentTime: React.PropTypes.number.isRequired,
  timestamp: React.PropTypes.number.isRequired
};

export default compose(
  translate(),
  timed()
)(TimeAgo);
