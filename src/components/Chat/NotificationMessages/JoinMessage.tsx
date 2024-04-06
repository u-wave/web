import type { User } from '../../../reducers/users';
import UserNotificationMessage from './UserNotificationMessage';

type JoinMessageProps = {
  user: User,
  timestamp: number,
};
function JoinMessage({ user, timestamp }: JoinMessageProps) {
  return (
    <UserNotificationMessage
      type="userJoin"
      className="ChatMessage--userJoin"
      i18nKey="chat.userJoin"
      user={user}
      timestamp={timestamp}
    />
  );
}

export default JoinMessage;
