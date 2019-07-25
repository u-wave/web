import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { translate, Interpolate } from '@u-wave/react-translate';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import userCardable from '../../../utils/userCardable';
import Avatar from '../../Avatar';
import Username from '../../Username';
import MessageTimestamp from '../MessageTimestamp';

const enhance = compose(
  translate(),
  React.memo,
  userCardable(),
  withHandlers({
    onClick: props => (event) => {
      const { openUserCard, user } = props;

      event.preventDefault();
      openUserCard(user);
    },
  }),
);

const UserNotificationMessage = ({
  className,
  user,
  timestamp,
  onClick,
  ...props
}) => (
  <div className={cx('ChatMessage', 'ChatMessage--userNotification', className)}>
    <Avatar
      className="ChatMessage-avatar"
      user={user}
    />
    <div className="ChatMessage-content">
      <div className="ChatMessage-hover">
        <MessageTimestamp date={new Date(timestamp)} />
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

UserNotificationMessage.propTypes = {
  className: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default enhance(UserNotificationMessage);
