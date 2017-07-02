import React from 'react';
import PropTypes from 'prop-types';
import UserNotificationMessage from './UserNotificationMessage';

const JoinMessage = ({
  user,
  timestamp
}) => (
  <UserNotificationMessage
    type="userJoin"
    className="ChatMessage--userJoin"
    i18nKey="chat.userJoin"
    user={user}
    timestamp={timestamp}
  />
);

JoinMessage.propTypes = {
  user: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired
};

export default JoinMessage;
