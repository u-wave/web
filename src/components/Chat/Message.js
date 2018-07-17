import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withHandlers from 'recompose/withHandlers';
import CircularProgress from '@material-ui/core/CircularProgress';
import userCardable from '../../utils/userCardable';
import Avatar from '../Avatar';
import Username from '../Username';
import compile from './Markup/compile';
import DeleteButton from './DeleteButton';
import MessageTimestamp from './MessageTimestamp';

const enhance = compose(
  pure,
  userCardable(),
  withHandlers({
    onDeleteClick: ({ onDelete, _id: id }) => () => onDelete(id),
    onUsernameClick: props => (event) => {
      const { openUserCard, user } = props;

      event.preventDefault();
      openUserCard(user);
    },
  }),
);

const Message = ({
  user,
  text,
  parsedText,
  inFlight,
  isMention,
  timestamp,
  compileOptions,
  deletable,
  onDeleteClick,
  onUsernameClick,
}) => {
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
    <div className={className}>
      {avatar}
      <div className="ChatMessage-content">
        <div className="ChatMessage-hover">
          {deletable && <DeleteButton onDelete={onDeleteClick} />}
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
};

Message.propTypes = {
  user: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  parsedText: PropTypes.array.isRequired,
  inFlight: PropTypes.bool,
  timestamp: PropTypes.number.isRequired,
  isMention: PropTypes.bool.isRequired,
  deletable: PropTypes.bool.isRequired,
  onDeleteClick: PropTypes.func,
  compileOptions: PropTypes.shape({
    availableEmoji: PropTypes.array,
    emojiImages: PropTypes.object,
  }),
  onUsernameClick: PropTypes.func.isRequired,
};

export default enhance(Message);
