import ms from 'ms';
import { findUser } from '../ChatCommands';
import { log } from '../../actions/ChatActionCreators';
import { mutedUsersSelector } from '../../selectors/chatSelectors';
import {
  userListSelector,
  isModeratorSelector,
} from '../../selectors/userSelectors';
import { muteUser, unmuteUser } from '../../actions/ModerationActionCreators';

export default [
  {
    name: 'muteuser',
    description: 'Mute a user in chat, preventing them from chatting. Syntax: "/muteuser username duration"',
    guard: isModeratorSelector,
    action: (username, duration = '30m') => (dispatch, getState) => {
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
    action: (username) => (dispatch, getState) => {
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
