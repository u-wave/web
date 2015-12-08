import cx from 'classnames';
import React from 'react';
import Avatar from '../Avatar';
import Loader from '../Loader';
import compile from './Markup/compile';

const Message = ({ user, text, parsedText, inFlight, isMention }) => {
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

  const children = parsedText ? compile(parsedText) : text;

  const inFlightClass = inFlight ? 'ChatMessage--loading' : '';
  const mentionClass = isMention ? 'ChatMessage--mention' : '';
  return (
    <div className={cx('ChatMessage', inFlightClass, mentionClass)}>
      {avatar}
      <div className="ChatMessage-content">
        <span className="ChatMessage-username">{user.username}</span>
        <span className="ChatMessage-text">{children}</span>
      </div>
    </div>
  );
};

export default Message;
