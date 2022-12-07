import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Interpolate } from '@u-wave/react-translate';
import useUserCard from '../../../hooks/useUserCard';
import Avatar from '../../Avatar';
import Username from '../../Username';
import MessageTimestamp from '../MessageTimestamp';

const {
  useCallback,
  useMemo,
} = React;

function UserNotificationMessage({
  className,
  user,
  timestamp,
  ...props
}) {
  const userCard = useUserCard(user);
  const date = useMemo(() => new Date(timestamp), [timestamp]);
  const onClick = useCallback((event) => {
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
          {...props}
        />
      </div>
    </div>
  );
}

UserNotificationMessage.propTypes = {
  className: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default UserNotificationMessage;
