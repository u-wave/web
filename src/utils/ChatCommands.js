const debug = require('debug')('uwave:chat-commands');

const commands = {};

export function getCommands() {
  return commands;
}

export function register(name, description, { action, guard }) {
  commands[name] = { description, action, guard };
}

export function canExecute(state, { guard } = {}) {
  return guard ? guard(state) : true;
}

export function execute(state, name, args = []) {
  debug('execute', name, args);
  if (commands[name]) {
    const allowed = canExecute(state, commands[name]);
    debug('canExecute', allowed);
    if (allowed) {
      return commands[name].action(...args);
    }
  }
}

// TODO move default commands to some other file!
import find from 'array-find';
import { log } from '../actions/ChatActionCreators';
import {
  skipCurrentDJ,
  moveWaitlistUser, removeWaitlistUser,
  deleteChatMessagesByUser, deleteAllChatMessages,
  setUserRole
} from '../actions/ModerationActionCreators';
import {
  joinWaitlist,
  modClearWaitlist, modLockWaitlist, modUnlockWaitlist
} from '../actions/WaitlistActionCreators';
import { currentUserSelector, userListSelector } from '../selectors/userSelectors';
import {
  djAndWaitlistUsersSelector,
  waitlistUsersSelector
} from '../selectors/waitlistSelectors';

const ROLE_MODERATOR = 2;
const ROLE_MANAGER = 3;
const hasRole = role => state => currentUserSelector(state).role >= role;
const isModerator = hasRole(ROLE_MODERATOR);
const isManager = hasRole(ROLE_MANAGER);

register('help', 'List available commands.', {
  action: () => (dispatch, getState) => {
    const available = getCommands();
    dispatch(log('Available commands:'));
    Object.keys(available).sort().forEach(name => {
      const command = available[name];
      if (canExecute(getState(), command)) {
        dispatch(log(`/${name} - ${command.description}`));
      }
    });
  }
});

register('skip', 'Skip the current DJ.', {
  guard: isModerator,
  action: (...args) => skipCurrentDJ(args ? args.join(' ') : '[No reason given]')
});

register('clearchat',
  'Delete all chat messages. ' +
  'Pass a username ("/clearchat kool_panda") to only delete messages by that user.',
  {
    guard: isModerator,
    action: (...args) => (dispatch, getState) => {
      const username = args.join(' ').trim();
      if (username) {
        const users = userListSelector(getState());
        const lname = username.toLowerCase();
        const user = find(users, o => o.username.toLowerCase() === lname);
        if (user) {
          return dispatch(deleteChatMessagesByUser(user._id));
        }
        return dispatch(log(`User ${username} is not online right now.`));
      }
      return dispatch(deleteAllChatMessages());
    }
  }
);

register(
  'wladd',
  'Add a user to the waitlist. Syntax: "/wladd username"',
  {
    guard: isModerator,
    action: username => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to add to the waitlist. Syntax: "/wladd username"'));
      }

      const users = userListSelector(getState());
      const lname = username.toLowerCase();
      const user = find(users, o => o.username.toLowerCase() === lname);
      if (user) {
        return dispatch(joinWaitlist(user));
      }
      return dispatch(log(`User ${username} is not online right now.`));
    }
  }
);

register(
  'wlremove',
  'Remove a user from the waitlist. Syntax: "/wlremove username"',
  {
    guard: isModerator,
    action: username => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to remove from the waitlist. Syntax: "/wlremove username"'));
      }

      const users = djAndWaitlistUsersSelector(getState());
      const lname = username.toLowerCase();
      const user = find(users, o => o.username.toLowerCase() === lname);
      if (user) {
        return dispatch(removeWaitlistUser(user));
      }
      return dispatch(log(`User ${username} is not in the waitlist.`));
    }
  }
);

register(
  'wlclear',
  'Remove everyone from the waitlist.',
  { guard: isModerator, action: modClearWaitlist }
);

register(
  'wllock',
  'Lock the waitlist.',
  { guard: isModerator, action: modLockWaitlist }
);

register(
  'wlunlock',
  'Unlock the waitlist.',
  { guard: isModerator, action: modUnlockWaitlist }
);

register(
  'wlmove',
  'Move a user to a different position in the waitlist. ' +
  'Syntax: "/wlmove username position"',
  {
    guard: isModerator,
    action: (username, posStr) => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to move in the waitlist. Syntax: "/wlmove username position"'));
      }
      const position = parseInt(posStr, 10) - 1;
      if (!isFinite(position) || position < 0) {
        return dispatch(log(`Provide a position to move @${username} to. Syntax: "/wlmove username position"`));
      }

      const users = waitlistUsersSelector(getState());
      const lname = username.toLowerCase();
      const user = find(users, o => o.username.toLowerCase() === lname);
      if (user) {
        return dispatch(moveWaitlistUser(user, position));
      }
      return dispatch(log(`User ${username} is not in the waitlist.`));
    }
  }
);

const roleNames = {
  user: 0,
  default: 0,
  normal: 0,
  none: 0,
  special: 1,
  moderator: 2,
  mod: 2,
  manager: 3,
  admin: 4
};
register(
  'userrole',
  'Assign a different role to a user. Syntax: "/userrole username role"',
  {
    guard: isManager,
    action: (username, role) => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to promote or demote.'));
      }
      if (!(role in roleNames)) {
        return dispatch(log(
          `Provide a role to promote ${username} to. [user, special, moderator, manager, admin]`
        ));
      }
      const users = userListSelector(getState());
      const lname = username.toLowerCase();
      const user = find(users, o => o.username.toLowerCase() === lname);
      return dispatch(setUserRole(user, roleNames[role]));
    }
  }
);

import ms from 'ms';
import { muteUser } from '../actions/ModerationActionCreators';
register(
  'mute',
  'Mute a user in chat, preventing them from chatting. Syntax: "/mute username duration"',
  {
    guard: isModerator,
    action: (username, duration = '30m') => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to mute.'));
      }
      const users = userListSelector(getState());
      const lname = username.toLowerCase();
      const user = find(users, o => o.username.toLowerCase() === lname);
      if (!user) {
        return dispatch(log(`User "${username}" is not online.`));
      }
      return dispatch(muteUser(user, ms(`${duration}`)));
    }
  }
);
