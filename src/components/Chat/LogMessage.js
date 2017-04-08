import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';

const LogMessage = ({ text }) => (
  <div className="ChatMessage ChatMessage--log">
    <div className="ChatMessage-content">
      <span className="ChatMessage-text">{text}</span>
    </div>
  </div>
);

LogMessage.propTypes = {
  text: PropTypes.string.isRequired
};

export default pure(LogMessage);
