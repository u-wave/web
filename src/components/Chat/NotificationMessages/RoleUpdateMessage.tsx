import type { User } from '../../../reducers/users';
import upperCaseFirst from '../../../utils/upperCaseFirst';
import UserNotificationMessage from './UserNotificationMessage';

function getLangKey(updateType: 'add' | 'remove') {
  if (updateType === 'add') {
    return 'chat.rolesAdded';
  }
  return 'chat.rolesRemoved';
}

type RoleUpdateMessageProps = {
  user: User,
  updateType: 'add' | 'remove',
  roles: string[],
  timestamp: number,
};
function RoleUpdateMessage({
  user,
  updateType,
  roles,
  timestamp,
}: RoleUpdateMessageProps) {
  return (
    <UserNotificationMessage
      type="roleUpdate"
      className="ChatMessage--roleUpdate"
      i18nKey={getLangKey(updateType)}
      i18nProps={{ roles: roles.map(upperCaseFirst).join(', ') }}
      user={user}
      timestamp={timestamp}
    />
  );
}

export default RoleUpdateMessage;
