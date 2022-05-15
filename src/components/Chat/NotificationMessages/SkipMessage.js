import React from 'react';
import PropTypes from 'prop-types';
import Username from '../../Username';
import UserNotificationMessage from './UserNotificationMessage';

const toUsername = (user) => (
  <Username user={user} />
);

const getLangKey = (hasModerator, hasReason) => {
  if (hasReason) {
    return hasModerator ? 'chat.modSkipReason' : 'chat.selfSkipReason';
  }
  return hasModerator ? 'chat.modSkip' : 'chat.selfSkip';
};

function SkipMessage({
  user,
  moderator,
  reason,
  timestamp,
}) {
  return (
    <UserNotificationMessage
      type="skip"
      className="ChatMessage--skip"
      i18nKey={getLangKey(!!moderator, !!reason)}
      user={moderator ?? user}
      djName={toUsername(user)}
      reason={reason}
      timestamp={timestamp}
    />
  );
}

SkipMessage.propTypes = {
  user: PropTypes.object.isRequired,
  moderator: PropTypes.object,
  timestamp: PropTypes.number.isRequired,
  reason: PropTypes.string,
};

export default SkipMessage;
