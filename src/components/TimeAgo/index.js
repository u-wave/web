import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import ms from 'ms';

import timed from '../../utils/timed';

// Bit weird to do it like this perhaps, convert to an english string first and
// then translate afterwards.
function translateMs(str) {
  // `ms` output of the form "3 hours"
  const [count, key] = str.split(' ');
  return {
    key: `${key.replace(/s$/, '')}s`,
    count: parseInt(count, 10),
  };
}

const TimeAgo = ({ t, currentTime, timestamp }) => {
  const secondsAgo = Math.max(0, Math.floor((currentTime - timestamp) / 1000));
  const msString = ms(secondsAgo * 1000, { long: true });
  const { key, count } = translateMs(msString);
  return (
    <span>
      {t('timeAgo.format', {
        time: t(`timeAgo.${key}`, {
          count,
          defaultValue: msString,
        }),
      })}
    </span>
  );
};

TimeAgo.propTypes = {
  t: PropTypes.func.isRequired,
  currentTime: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default compose(
  translate(),
  timed(),
)(TimeAgo);
