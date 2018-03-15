import React from 'react';
import PropTypes from 'prop-types';
import upperCaseFirst from 'upper-case-first';
import UserNotificationMessage from './UserNotificationMessage';

const getLangKey = (updateType) => {
  if (updateType === 'add') {
    return 'chat.rolesAdded';
  }
  return 'chat.rolesRemoved';
};

const RoleUpdateMessage = ({
  user,
  updateType,
  roles,
  timestamp,
}) => (
  <UserNotificationMessage
    type="roleUpdate"
    className="ChatMessage--roleUpdate"
    i18nKey={getLangKey(updateType)}
    user={user}
    roles={roles.map(upperCaseFirst).join(', ')}
    timestamp={timestamp}
  />
);

RoleUpdateMessage.propTypes = {
  user: PropTypes.object.isRequired,
  updateType: PropTypes.oneOf(['add', 'remove']).isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default RoleUpdateMessage;
