import cx from 'classnames';
import React from 'react';
import Avatar from '../Avatar';
import Loader from '../Loader';
import parse from './Markup/parse';

const Message = ({ user, text, inFlight, isMention }) => {
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

  const inFlightClass = inFlight ? 'ChatMessage--loading' : '';
  const mentionClass = isMention ? 'ChatMessage--mention' : '';
  return (
    <div className={cx('ChatMessage', inFlightClass, mentionClass)}>
      {avatar}
      <div className="ChatMessage-content">
        <span className="ChatMessage-username">{user.username}</span>
        <span className="ChatMessage-text">{parse(text)}</span>
      </div>
    </div>
  );
};

export default Message;
