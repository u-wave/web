import * as React from 'react';
import pure from 'recompose/pure';

const LogMessage = ({ text }) => (
  <div className="ChatMessage ChatMessage--log">
    <div className="ChatMessage-content">
      <span className="ChatMessage-text">{text}</span>
    </div>
  </div>
);

LogMessage.propTypes = {
  text: React.PropTypes.string.isRequired
};

export default pure(LogMessage);
