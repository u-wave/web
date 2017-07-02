import {
  USER_JOIN,
  USER_LEAVE,
  CHANGE_USERNAME
} from '../../constants/ActionTypes';

export default function reduceNotifications(state, { type, payload }) {
  switch (type) {
  case USER_JOIN:
    return state.concat([ {
      type: 'userJoin',
      _id: `userJoin-${payload.user._id}-${payload.timestamp}`,
      user: payload.user,
      timestamp: payload.timestamp
    } ]);
  case USER_LEAVE:
    return state.concat([ {
      type: 'userLeave',
      _id: `userLeave-${payload.user._id}-${payload.timestamp}`,
      user: payload.user,
      timestamp: payload.timestamp
    } ]);
  case CHANGE_USERNAME:
    return state.concat([ {
      type: 'userNameChanged',
      _id: `userNameChanged-${payload.userID}-${payload.timestamp}`,
      user: payload.user,
      newUsername: payload.username,
      timestamp: payload.timestamp
    } ]);
  default:
    return state;
  }
}

