import React from 'react';
import PropTypes from 'prop-types';
import UserNotificationMessage from './UserNotificationMessage';

const UserNameChanged = ({
  user,
  timestamp,
  newUsername
}) => (
  <UserNotificationMessage
    type="userNameChanged"
    className="ChatMessage--userNameChanged"
    i18nKey="chat.userNameChanged"
    user={user}
    timestamp={timestamp}
    newUsername={newUsername}
  />
);

UserNameChanged.propTypes = {
  user: PropTypes.object.isRequired,
  newUsername: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired
};

export default UserNameChanged;
