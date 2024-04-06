import type { User } from '../../../reducers/users';
import UserNotificationMessage from './UserNotificationMessage';

type LeaveMessageProps = {
  user: User,
  timestamp: number,
};
function LeaveMessage({ user, timestamp }: LeaveMessageProps) {
  return (
    <UserNotificationMessage
      type="userLeave"
      className="ChatMessage--userLeave"
      i18nKey="chat.userLeave"
      user={user}
      timestamp={timestamp}
    />
  );
}

export default LeaveMessage;
