import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import useUserCard from '../../hooks/useUserCard';
import Avatar from '../Avatar';
import Username from '../Username';
import compile from './Markup/compile';
import DeleteButton from './DeleteButton';
import MessageTimestamp from './MessageTimestamp';

const {
  useCallback,
} = React;

function Message({
  _id: id,
  user,
  text,
  parsedText,
  inFlight,
  isMention,
  timestamp,
  compileOptions,
  deletable,
  onDelete,
}) {
  const userCard = useUserCard(user);
  const onUsernameClick = useCallback((event) => {
    event.preventDefault();
    userCard.open();
    // The `userCard.open` reference never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let avatar;
  if (inFlight) {
    avatar = (
      <div className="ChatMessage-avatar">
        <CircularProgress size="100%" />
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
  );
  return (
    <div className={className} ref={userCard.refAnchor}>
      {userCard.card}
      {avatar}
      <div className="ChatMessage-content">
        <div className="ChatMessage-hover">
          {deletable && <DeleteButton onDelete={() => onDelete(id)} />}
          <MessageTimestamp date={date} />
        </div>
        <button
          type="button"
          className="ChatMessage-username ChatMessage-cardable"
          onClick={onUsernameClick}
        >
          <Username user={user} />
        </button>
        <span className="ChatMessage-text">{children}</span>
      </div>
    </div>
  );
}

Message.propTypes = {
  _id: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  parsedText: PropTypes.array.isRequired,
  inFlight: PropTypes.bool,
  timestamp: PropTypes.number.isRequired,
  isMention: PropTypes.bool.isRequired,
  deletable: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  compileOptions: PropTypes.shape({
    availableEmoji: PropTypes.array,
    emojiImages: PropTypes.object,
  }),
};

export default Message;
