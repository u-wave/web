import ms from 'ms';
import { findUser } from '../ChatCommands';
import { log } from '../../reducers/chat';
import { mutedUsersSelector } from '../../selectors/chatSelectors';
import {
  userListSelector,
  isModeratorSelector,
} from '../../reducers/users';
import { muteUser, unmuteUser } from '../../actions/ModerationActionCreators';

export default [
  {
    name: 'muteuser',
    description: 'Mute a user in chat, preventing them from chatting. Syntax: "/muteuser username duration"',
    guard: isModeratorSelector,
    action: (_commander, username, duration = '30m') => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to mute.'));
      }
      const user = findUser(
        userListSelector(getState()),
        username,
      );
      if (!user) {
        return dispatch(log(`User "${username}" is not online.`));
      }
      return dispatch(muteUser(user, ms(`${duration}`)));
    },
  },
  {
    name: 'unmuteuser',
    description: 'Unmute a user in chat. Syntax: "/unmuteuser username"',
    guard: isModeratorSelector,
    action: (_commander, username) => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to unmute.'));
      }
      const user = findUser(mutedUsersSelector(getState()), username);
      if (!user) {
        return dispatch(log(`User "${username}" is not muted.`));
      }
      return dispatch(unmuteUser(user));
    },
  },
];
