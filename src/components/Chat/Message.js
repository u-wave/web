import cx from 'classnames';
import * as React from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withProps from 'recompose/withProps';

import userCardable from '../../utils/userCardable';
import Avatar from '../Avatar';
import Username from '../Username';
import Loader from '../Loader';

import compile from './Markup/compile';
import DeleteButton from './DeleteButton';
import MessageTimestamp from './MessageTimestamp';

const enhance = compose(
  pure,
  userCardable(),
  withProps(props => ({
    onUsernameClick(event) {
      event.preventDefault();
      props.openUserCard(props.user);
    }
  }))
);

const Message = ({
  alternate,
  user,
  text,
  parsedText,
  inFlight,
  isMention,
  timestamp,
  compileOptions,
  onDelete,
  onUsernameClick
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

  const className = cx(
    'ChatMessage',
    inFlight && 'ChatMessage--loading',
    isMention && 'ChatMessage--mention',
    alternate && 'ChatMessage--alternate'
  );
  return (
    <div className={className}>
      {avatar}
      <div className="ChatMessage-content">
        <div className="ChatMessage-hover">
          {onDelete && <DeleteButton onDelete={onDelete} />}
          <MessageTimestamp date={date} />
        </div>
        <button
          className="ChatMessage-username ChatMessage-cardable"
          onClick={onUsernameClick}
        >
          <Username user={user} />
        </button>
        <span className="ChatMessage-text">{children}</span>
      </div>
    </div>
  );
};

Message.propTypes = {
  alternate: React.PropTypes.bool,
  user: React.PropTypes.object.isRequired,
  text: React.PropTypes.string.isRequired,
  parsedText: React.PropTypes.array.isRequired,
  inFlight: React.PropTypes.bool,
  timestamp: React.PropTypes.number.isRequired,
  isMention: React.PropTypes.bool.isRequired,
  onDelete: React.PropTypes.func,
  compileOptions: React.PropTypes.shape({
    availableEmoji: React.PropTypes.array,
    emojiImages: React.PropTypes.object
  }),
  onUsernameClick: React.PropTypes.func.isRequired
};

export default enhance(Message);
