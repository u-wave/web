import { useTranslator } from '@u-wave/react-translate';
import Username from '../../Username';
import UserNotificationMessage from './UserNotificationMessage';
import type { User } from '../../../reducers/users';

function getLangKey(hasModerator: boolean, hasReason: boolean) {
  if (hasReason) {
    return hasModerator ? 'chat.modSkipReason' : 'chat.selfSkipReason';
  }
  return hasModerator ? 'chat.modSkip' : 'chat.selfSkip';
}

type SkipMessageProps = {
  user: User,
  moderator?: User | null,
  reason: string,
  timestamp: number,
};
function SkipMessage({
  user,
  moderator,
  reason,
  timestamp,
}: SkipMessageProps) {
  const { t } = useTranslator();

  return (
    <UserNotificationMessage
      type="skip"
      className="ChatMessage--skip"
      i18nKey={getLangKey(!!moderator, !!reason)}
      i18nProps={{
        djName: <Username user={user} />,
        reason: reason ? t(`booth.skip.reasons.${reason}`) : undefined,
      }}
      user={moderator ?? user}
      timestamp={timestamp}
    />
  );
}

export default SkipMessage;
