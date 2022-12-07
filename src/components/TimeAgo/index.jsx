import React from 'react';
import PropTypes from 'prop-types';
import ms from 'ms';
import { useTranslator } from '@u-wave/react-translate';
import useClock from '../../hooks/useClock';
import useIntl from '../../hooks/useIntl';

// Bit weird to do it like this perhaps, convert to an english string first and
// then translate afterwards.
function translateMs(str) {
  // `ms` output of the form "3 hours"
  const [count, key] = str.split(' ');
  return {
    key: key.replace(/s$/, ''),
    count: parseInt(count, 10),
  };
}

const now = { key: 'seconds', count: 0 };

function TimeAgo({ timestamp }) {
  const { t } = useTranslator();
  const { relativeTimeFormatter } = useIntl();
  const currentTime = useClock();

  const secondsAgo = Math.max(0, Math.floor((currentTime - timestamp) / 1000));
  const msString = ms(secondsAgo * 1000, { long: true });
  const { key, count } = secondsAgo < 1 ? now : translateMs(msString);

  if (relativeTimeFormatter) {
    return (
      <span>
        {relativeTimeFormatter.format(-count, key)}
      </span>
    );
  }

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
}

TimeAgo.propTypes = {
  timestamp: PropTypes.number.isRequired,
};

export default TimeAgo;
