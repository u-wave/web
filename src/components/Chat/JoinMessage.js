import React from 'react';
import PropTypes from 'prop-types';
import { Interpolate } from 'react-i18next';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withHandlers from 'recompose/withHandlers';
import userCardable from '../../utils/userCardable';
import Avatar from '../Avatar';
import Username from '../Username';
import MessageTimestamp from './MessageTimestamp';

const enhance = compose(
  pure,
  userCardable(),
  withHandlers({
    onClick: props => (event) => {
      event.preventDefault();
      props.openUserCard(props.user);
    }
  })
);

const JoinMessage = ({
  user,
  timestamp,
  onClick
}) => (
  <div className="ChatMessage ChatMessage--userJoin">
    <Avatar
      className="ChatMessage-avatar"
      user={user}
    />
    <div className="ChatMessage-content">
      <div className="ChatMessage-hover">
        <MessageTimestamp date={new Date(timestamp)} />
      </div>
      <Interpolate
        i18nKey="chat.userJoin"
        username={(
          <button className="ChatMessage-username ChatMessage-cardable" onClick={onClick}>
            <Username user={user} />
          </button>
        )}
      />
    </div>
  </div>
);

JoinMessage.propTypes = {
  user: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default enhance(JoinMessage);
