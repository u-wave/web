import cx from 'clsx';
import { useCallback, useMemo } from 'react';
import { Interpolate } from '@u-wave/react-translate';
import useUserCard from '../../../hooks/useUserCard';
import Avatar from '../../Avatar';
import Username from '../../Username';
import MessageTimestamp from '../MessageTimestamp';
import type { User } from '../../../reducers/users';

type UserNotificationMessageProps = {
  className?: string,
  user: User,
  timestamp: number,
  type: string,
  i18nKey: string,
  i18nProps?: Record<string, React.ReactNode>,
};

function UserNotificationMessage({
  className,
  user,
  timestamp,
  i18nKey,
  i18nProps,
}: UserNotificationMessageProps) {
  const userCard = useUserCard(user);
  const date = useMemo(() => new Date(timestamp), [timestamp]);
  const onClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    userCard.open();
    // The `userCard.open` reference never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cx('ChatMessage', 'ChatMessage--userNotification', className)}
      ref={userCard.refAnchor}
    >
      {userCard.card}
      <Avatar
        className="ChatMessage-avatar"
        user={user}
      />
      <div className="ChatMessage-content">
        <div className="ChatMessage-hover">
          <MessageTimestamp date={date} />
        </div>
        <Interpolate
          username={(
            <button
              type="button"
              className="ChatMessage-username ChatMessage-cardable"
              onClick={onClick}
            >
              <Username user={user} />
            </button>
          )}
          {...i18nProps}
          i18nKey={i18nKey}
        />
      </div>
    </div>
  );
}

export default UserNotificationMessage;
