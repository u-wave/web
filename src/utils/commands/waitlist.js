import { register, findUser } from '../ChatCommands';
import { log } from '../../actions/ChatActionCreators';

import {
  joinWaitlist,
  modClearWaitlist,
  modLockWaitlist,
  modUnlockWaitlist,
} from '../../actions/WaitlistActionCreators';
import {
  skipCurrentDJ,
  removeWaitlistUser,
  moveWaitlistUser,
} from '../../actions/ModerationActionCreators';
import {
  userListSelector,
  isModeratorSelector,
} from '../../selectors/userSelectors';
import {
  waitlistUsersSelector,
  djAndWaitlistUsersSelector,
} from '../../selectors/waitlistSelectors';

register('skip', 'Skip the current DJ.', {
  guard: isModeratorSelector,
  action: (...args) => skipCurrentDJ(args ? args.join(' ') : '[No reason given]'),
});

register(
  'wladd',
  'Add a user to the waitlist. Syntax: "/wladd username"',
  {
    guard: isModeratorSelector,
    action: username => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to add to the waitlist. Syntax: "/wladd username"'));
      }

      const user = findUser(userListSelector(getState()), username);
      if (user) {
        return dispatch(joinWaitlist(user));
      }
      return dispatch(log(`User ${username} is not online right now.`));
    },
  },
);

register(
  'wlremove',
  'Remove a user from the waitlist. Syntax: "/wlremove username"',
  {
    guard: isModeratorSelector,
    action: username => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to remove from the waitlist. Syntax: "/wlremove username"'));
      }

      const user = findUser(
        djAndWaitlistUsersSelector(getState()),
        username,
      );
      if (user) {
        return dispatch(removeWaitlistUser(user));
      }
      return dispatch(log(`User ${username} is not in the waitlist.`));
    },
  },
);

register(
  'wlclear',
  'Remove everyone from the waitlist.',
  { guard: isModeratorSelector, action: modClearWaitlist },
);

register(
  'wllock',
  'Lock the waitlist.',
  { guard: isModeratorSelector, action: modLockWaitlist },
);

register(
  'wlunlock',
  'Unlock the waitlist.',
  { guard: isModeratorSelector, action: modUnlockWaitlist },
);

register(
  'wlmove',
  'Move a user to a different position in the waitlist. '
  + 'Syntax: "/wlmove username position"',
  {
    guard: isModeratorSelector,
    action: (username, posStr) => (dispatch, getState) => {
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
        return dispatch(moveWaitlistUser(user, position));
      }
      return dispatch(log(`User ${username} is not in the waitlist.`));
    },
  },
);
