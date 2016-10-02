import * as React from 'react';

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
  date: React.PropTypes.instanceOf(Date).isRequired
};

export default MessageTimestamp;
