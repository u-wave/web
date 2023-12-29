import { findUser } from '../ChatCommands';
import { log } from '../../reducers/chat';
import {
  modClearWaitlist,
  modLockWaitlist,
  modUnlockWaitlist,
} from '../../actions/WaitlistActionCreators';
import { skipCurrentDJ } from '../../actions/ModerationActionCreators';
import {
  userListSelector,
  isModeratorSelector,
} from '../../selectors/userSelectors';
import {
  addToWaitlist,
  removeWaitlistUser,
  moveWaitlistUser,
  waitlistUsersSelector,
  djAndWaitlistUsersSelector,
} from '../../reducers/waitlist';

export default [
  {
    name: 'skip',
    description: 'Skip the current DJ.',
    guard: isModeratorSelector,
    action: (_commander, ...args) => skipCurrentDJ(args.length > 0 ? args.join(' ') : '[No reason given]'),
  },

  {
    name: 'wladd',
    description: 'Add a user to the waitlist. Syntax: "/wladd username"',
    guard: isModeratorSelector,
    action: (_commander, username) => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to add to the waitlist. Syntax: "/wladd username"'));
      }

      const user = findUser(userListSelector(getState()), username);
      if (user) {
        return dispatch(addToWaitlist(user));
      }
      return dispatch(log(`User ${username} is not online right now.`));
    },
  },

  {
    name: 'wlremove',
    description: 'Remove a user from the waitlist. Syntax: "/wlremove username"',
    guard: isModeratorSelector,
    action: (_commander, username) => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to remove from the waitlist. Syntax: "/wlremove username"'));
      }

      const user = findUser(
        djAndWaitlistUsersSelector(getState()),
        username,
      );
      if (user) {
        return dispatch(removeWaitlistUser({ userID: user._id }));
      }
      return dispatch(log(`User ${username} is not in the waitlist.`));
    },
  },

  {
    name: 'wlclear',
    description: 'Remove everyone from the waitlist.',
    guard: isModeratorSelector,
    action: () => modClearWaitlist(),
  },

  {
    name: 'wllock',
    description: 'Lock the waitlist.',
    guard: isModeratorSelector,
    action: () => modLockWaitlist(),
  },

  {
    name: 'wlunlock',
    description: 'Unlock the waitlist.',
    guard: isModeratorSelector,
    action: () => modUnlockWaitlist(),
  },

  {
    name: 'wlmove',
    description: 'Move a user to a different position in the waitlist. '
      + 'Syntax: "/wlmove username position"',
    guard: isModeratorSelector,
    action: (_commander, username, posStr) => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to move in the waitlist. Syntax: "/wlmove username position"'));
      }
      const position = parseInt(posStr, 10) - 1;
      if (typeof position !== 'number' || position < 0) {
        return dispatch(log(`Provide a position to move @${username} to. Syntax: "/wlmove username position"`));
      }

      const user = findUser(
        waitlistUsersSelector(getState()),
        username,
      );
      if (user) {
        return dispatch(moveWaitlistUser({ userID: user._id, position }));
      }
      return dispatch(log(`User ${username} is not in the waitlist.`));
    },
  },
];
