import { v4 as randomUUID } from 'uuid';
import {
  ADVANCE,
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
        _id: randomUUID(),
        user: payload.user,
        timestamp: payload.timestamp,
      }]);
    case USER_LEAVE:
      return state.concat([{
        type: 'userLeave',
        _id: randomUUID(),
        user: payload.user,
        timestamp: payload.timestamp,
      }]);
    case CHANGE_USERNAME:
      return state.concat([{
        type: 'userNameChanged',
        _id: randomUUID(),
        user: payload.user,
        newUsername: payload.username,
        timestamp: payload.timestamp,
      }]);
    case USER_ADD_ROLES: // fall through
    case USER_REMOVE_ROLES:
      return state.concat([{
        type: 'roleUpdate',
        _id: randomUUID(),
        user: payload.user,
        updateType: type === USER_ADD_ROLES ? 'add' : 'remove',
        roles: payload.roles,
        timestamp: payload.timestamp,
      }]);
    case ADVANCE: {
      if (payload === null) {
        return state;
      }

      return state.concat([{
        type: 'nowPlaying',
        _id: randomUUID(),
        entry: payload.media,
        timestamp: payload.timestamp,
      }]);
    }
    case BOOTH_SKIP:
      return state.concat([{
        type: 'skip',
        _id: randomUUID(),
        user: payload.user,
        moderator: payload.moderator,
        reason: payload.reason,
        timestamp: payload.timestamp,
      }]);
    default:
      return state;
  }
}
