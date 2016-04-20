import cx from 'classnames';
import * as React from 'react';

const LogMessage = ({ text }) => (
  <div className={cx('ChatMessage', 'ChatMessage--log')}>
    <div className="ChatMessage-content">
      <span className="ChatMessage-text">{text}</span>
    </div>
  </div>
);

LogMessage.propTypes = {
  text: React.PropTypes.string.isRequired
};

export default LogMessage;
