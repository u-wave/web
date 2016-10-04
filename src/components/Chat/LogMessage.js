import cx from 'classnames';
import * as React from 'react';

const LogMessage = ({ alternate, text }) => (
  <div
    className={cx(
      'ChatMessage',
      'ChatMessage--log',
      alternate && 'ChatMessage--alternate'
    )}
  >
    <div className="ChatMessage-content">
      <span className="ChatMessage-text">{text}</span>
    </div>
  </div>
);

LogMessage.propTypes = {
  alternate: React.PropTypes.bool,
  text: React.PropTypes.string.isRequired
};

export default LogMessage;
