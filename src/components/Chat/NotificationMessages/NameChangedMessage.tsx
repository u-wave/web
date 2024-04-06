import UserNotificationMessage from './UserNotificationMessage';
import type { User } from '../../../reducers/users';

type UserNameChangedProps = {
  user: User,
  newUsername: string,
  timestamp: number,
};
function UserNameChanged({
  user,
  timestamp,
  newUsername,
}: UserNameChangedProps) {
  return (
    <UserNotificationMessage
      type="userNameChanged"
      className="ChatMessage--userNameChanged"
      i18nKey="chat.userNameChanged"
      i18nProps={{ newUsername }}
      user={user}
      timestamp={timestamp}
    />
  );
}

export default UserNameChanged;
