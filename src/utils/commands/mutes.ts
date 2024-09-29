import ms from 'ms';
import { findUser, type Command } from '../ChatCommands';
import {
  log,
  muteUser,
  unmuteUser,
  mutedUserSelector,
} from '../../reducers/chat';
import {
  userListSelector,
  isModeratorSelector,
} from '../../reducers/users';

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
      return dispatch(muteUser({
        userID: user._id,
        duration: ms(`${duration}`),
      }));
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
      const user = findUser(userListSelector(getState()), username);
      if (user == null) {
        return dispatch(log(`User "${username}" not found.`));
      }
      const mute = mutedUserSelector(getState(), user._id);
      if (mute == null) {
        return dispatch(log(`User "${username}" is not muted.`));
      }
      return dispatch(unmuteUser({ userID: user._id }));
    },
  },
] satisfies Command[];
