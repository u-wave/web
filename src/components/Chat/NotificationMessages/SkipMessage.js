import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Username from '../../Username';
import UserNotificationMessage from './UserNotificationMessage';

const toUsername = user => (
  <Username user={user} />
);

const getLangKey = (hasModerator, hasReason) => {
  if (hasReason) {
    return hasModerator ? 'chat.modSkipReason' : 'chat.selfSkipReason';
  }
  return hasModerator ? 'chat.modSkip' : 'chat.selfSkip';
};

const enhance = translate();

const SkipMessage = ({
  t,
  user,
  moderator,
  reason,
  timestamp,
}) => (
  <UserNotificationMessage
    type="skip"
    className="ChatMessage--skip"
    i18nKey={getLangKey(!!moderator, !!reason)}
    user={moderator || user}
    djName={toUsername(user)}
    reason={reason ? t(`booth.skip.reasons.${reason}`) : undefined}
    timestamp={timestamp}
  />
);

SkipMessage.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  moderator: PropTypes.object,
  timestamp: PropTypes.number.isRequired,
  reason: PropTypes.string,
};

export default enhance(SkipMessage);
