import React from 'react';
import PropTypes from 'prop-types';

const timeFormatOptions = { hour: 'numeric', minute: 'numeric' };

const MessageTimestamp = ({ date }) => (
  <time
    className="ChatMessage-timestamp"
    dateTime={date.toISOString()}
  >
    {date.toLocaleTimeString([], timeFormatOptions)}
  </time>
);

MessageTimestamp.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired
};

export default MessageTimestamp;
