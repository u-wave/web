import * as React from 'react';
import ms from 'ms';

import timed from '../../utils/timed';

const TimeAgo = ({ currentTime, timestamp }) => {
  const secondsAgo = Math.max(0, Math.floor((currentTime - timestamp) / 1000));
  return (
    <span>
      {ms(secondsAgo * 1000, { long: true })} ago
    </span>
  );
};

TimeAgo.propTypes = {
  currentTime: React.PropTypes.number.isRequired,
  timestamp: React.PropTypes.number.isRequired
};

export default timed()(TimeAgo);
