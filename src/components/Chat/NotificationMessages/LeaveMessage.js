import React from 'react';
import PropTypes from 'prop-types';
import UserNotificationMessage from './UserNotificationMessage';

const LeaveMessage = ({
  user,
  timestamp
}) => (
  <UserNotificationMessage
    type="userLeave"
    className="ChatMessage--userLeave"
    i18nKey="chat.userLeave"
    user={user}
    timestamp={timestamp}
  />
);

LeaveMessage.propTypes = {
  user: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired
};

export default LeaveMessage;
