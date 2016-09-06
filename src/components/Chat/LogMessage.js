import cx from 'classnames';
import * as React from 'react';

const LogMessage = ({ odd, text }) => (
  <div className={cx('ChatMessage', 'ChatMessage--log', odd && 'ChatMessage--odd')}>
    <div className="ChatMessage-content">
      <span className="ChatMessage-text">{text}</span>
    </div>
  </div>
);

LogMessage.propTypes = {
  odd: React.PropTypes.bool,
  text: React.PropTypes.string.isRequired
};

export default LogMessage;
