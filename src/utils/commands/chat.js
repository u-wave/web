import { register, findUser } from '../ChatCommands';
import { log } from '../../actions/ChatActionCreators';

import {
  userListSelector,
  isModeratorSelector
} from '../../selectors/userSelectors';
import {
  deleteChatMessagesByUser,
  deleteAllChatMessages
} from '../../actions/ModerationActionCreators';

register(
  'clearchat',
  'Delete all chat messages. ' +
  'Pass a username ("/clearchat kool_panda") to only delete messages by that user.',
  {
    guard: isModeratorSelector,
    action: (...args) => (dispatch, getState) => {
      const username = args.join(' ').trim();
      if (username) {
        const user = findUser(userListSelector(getState()), username);
        if (user) {
          return dispatch(deleteChatMessagesByUser(user._id));
        }
        return dispatch(log(`User ${username} is not online right now.`));
      }
      return dispatch(deleteAllChatMessages());
    }
  }
);
