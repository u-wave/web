import {
  BOOTH_SKIP,
  USER_JOIN,
  USER_LEAVE,
  CHANGE_USERNAME,
  USER_ADD_ROLES,
  USER_REMOVE_ROLES,
} from '../../constants/ActionTypes';

export default function reduceNotifications(state, { type, payload }) {
  switch (type) {
    case USER_JOIN:
      return state.concat([{
        type: 'userJoin',
        _id: `userJoin-${payload.user._id}-${payload.timestamp}`,
        user: payload.user,
        timestamp: payload.timestamp,
      }]);
    case USER_LEAVE:
      return state.concat([{
        type: 'userLeave',
        _id: `userLeave-${payload.user._id}-${payload.timestamp}`,
        user: payload.user,
        timestamp: payload.timestamp,
      }]);
    case CHANGE_USERNAME:
      return state.concat([{
        type: 'userNameChanged',
        _id: `userNameChanged-${payload.userID}-${payload.timestamp}`,
        user: payload.user,
        newUsername: payload.username,
        timestamp: payload.timestamp,
      }]);
    case USER_ADD_ROLES: // fall through
    case USER_REMOVE_ROLES:
      return state.concat([{
        type: 'roleUpdate',
        _id: `roleUpdate-${payload.timestamp}`,
        user: payload.user,
        updateType: type === USER_ADD_ROLES ? 'add' : 'remove',
        roles: payload.roles,
        timestamp: payload.timestamp,
      }]);
    case BOOTH_SKIP:
      return state.concat([{
        type: 'skip',
        _id: `skip-${payload.timestamp}`,
        user: payload.user,
        moderator: payload.moderator,
        reason: payload.reason,
        timestamp: payload.timestamp,
      }]);
    default:
      return state;
  }
}
