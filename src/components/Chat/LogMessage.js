import cx from 'classnames';
import React from 'react';

const LogMessage = ({ text }) => {
  return (
    <div className={cx('ChatMessage', 'ChatMessage--log')}>
      <div className="ChatMessage-content">
        <span className="ChatMessage-text">{text}</span>
      </div>
    </div>
  );
};

export default LogMessage;
