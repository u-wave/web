import cx from 'classnames';
import * as React from 'react';

import Avatar from '../Avatar';
import Username from '../Username';

import Loader from '../Loader';
import compile from './Markup/compile';

const timeFormatOptions = { hour: 'numeric', minute: 'numeric' };

const Message = ({
  user,
  text,
  parsedText,
  inFlight,
  isMention,
  timestamp,
  compileOptions
}) => {
  let avatar;
  if (inFlight) {
    avatar = (
      <div className="ChatMessage-avatar">
        <Loader size="tiny" />
      </div>
    );
  } else {
    avatar = (
      <Avatar
        className="ChatMessage-avatar"
        user={user}
      />
    );
  }

  const children = parsedText ? compile(parsedText, compileOptions) : text;

  const date = new Date(timestamp);

  const inFlightClass = inFlight ? 'ChatMessage--loading' : '';
  const mentionClass = isMention ? 'ChatMessage--mention' : '';
  return (
    <div className={cx('ChatMessage', inFlightClass, mentionClass)}>
      {avatar}
      <div className="ChatMessage-content">
        <time
          className="ChatMessage-timestamp"
          dateTime={date.toISOString()}
        >
          {date.toLocaleTimeString([], timeFormatOptions)}
        </time>
        <Username className="ChatMessage-username" user={user} />
        <span className="ChatMessage-text">{children}</span>
      </div>
    </div>
  );
};

Message.propTypes = {
  user: React.PropTypes.object.isRequired,
  text: React.PropTypes.string.isRequired,
  parsedText: React.PropTypes.array.isRequired,
  inFlight: React.PropTypes.bool,
  timestamp: React.PropTypes.number.isRequired,
  isMention: React.PropTypes.bool.isRequired,
  compileOptions: React.PropTypes.shape({
    availableEmoji: React.PropTypes.array,
    emojiImages: React.PropTypes.object
  })
};

export default Message;
