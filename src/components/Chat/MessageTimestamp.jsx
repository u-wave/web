import React from 'react';
import PropTypes from 'prop-types';
import useIntl from '../../hooks/useIntl';

function MessageTimestamp({ date }) {
  const { timeFormatter } = useIntl();

  return (
    <time
      className="ChatMessage-timestamp"
      dateTime={date.toISOString()}
    >
      {timeFormatter.format(date)}
    </time>
  );
}

MessageTimestamp.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default MessageTimestamp;
