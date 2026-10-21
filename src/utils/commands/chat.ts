import { deleteAllChatMessages, deleteChatMessagesByUser, log, setMotd } from '../../reducers/chat';
import { isManagerSelector, isModeratorSelector, userListSelector } from '../../reducers/users';
import { type Command, findUser } from '../ChatCommands';

export default [
  {
    name: 'motd',
    description: 'Set the Message of the Day, displayed at the very top of the chat.',
    guard: isManagerSelector,
    action: (_commander, ...args) => {
      const motd = args.join(' ');
      return setMotd(motd);
    },
  },
  {
    name: 'clearchat',
    description: 'Delete all chat messages. '
      + 'Pass a username ("/clearchat kool_panda") to only delete messages by that user.',
    guard: isModeratorSelector,
    action: (_commander, ...args) => (dispatch, getState) => {
      const username = args.join(' ').trim();
      if (username) {
        const user = findUser(userListSelector(getState()), username);
        if (user) {
          return dispatch(deleteChatMessagesByUser(user._id));
        }
        return dispatch(log(`User ${username} is not online right now.`));
      }
      return dispatch(deleteAllChatMessages());
    },
  },
] satisfies Command[];
