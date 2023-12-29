import { createListenerMiddleware } from '@reduxjs/toolkit';
import { mutate } from 'swr';
import type { AppDispatch, StoreState } from './configureStore';
import {
  deleteMessageByID,
  deleteMessagesByUser,
  deleteAllMessages,
  muteUser,
  unmuteUser,
  receiveSkip,
} from '../reducers/chat';
import * as waitlistActions from '../reducers/waitlist';
import { receive as receiveMessage } from '../actions/ChatActionCreators';
import {
  advance,
  receiveUpvote,
  receiveDownvote,
  receiveFavorite,
} from '../reducers/booth';
import { currentTimeSelector } from '../reducers/server';
import {
  addRoles,
  receiveGuestCount,
  removeRoles,
  userJoin,
  userLeave,
  userSelector,
  usernameChanged,
} from '../reducers/users';
import { socketMessage } from './socket';
import { cyclePlaylist } from '../reducers/playlists';

function expectType<T>(
  _param: T, // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  // type-only function
}

const middleware = createListenerMiddleware<StoreState, AppDispatch>();
middleware.startListening({
  actionCreator: socketMessage,
  effect: (action, api) => {
    const { command, data } = action.payload;
    switch (command) {
      // Booth
      case 'advance':
        api.dispatch(advance(data));
        break;
      case 'favorite':
        api.dispatch(receiveFavorite(data));
        break;
      case 'vote':
        api.dispatch(data.value === -1
          ? receiveDownvote({ userID: data._id })
          : receiveUpvote({ userID: data._id }));
        break;
      case 'skip': {
        const state = api.getState();
        const user = userSelector(state, data.userID);
        if (user != null) {
          api.dispatch(receiveSkip({
            user,
            moderator: userSelector(state, data.moderatorID),
            reason: data.reason,
            timestamp: Date.now(),
          }));
        }
        break;
      }
      // Users
      case 'join':
        api.dispatch(userJoin({ user: data }));
        break;
      case 'leave':
        api.dispatch(userLeave({ userID: data }));
        break;
      case 'nameChange':
        api.dispatch(usernameChanged(data));
        break;
      case 'guests':
        api.dispatch(receiveGuestCount({ guests: data }));
        break;
      // Chat
      case 'chatMessage':
        api.dispatch(receiveMessage({
          _id: data.id,
          userID: data.userID,
          text: data.message,
          timestamp: data.timestamp,
        }));
        break;
      case 'chatDelete':
        api.dispatch(deleteAllMessages());
        break;
      case 'chatDeleteByID':
        api.dispatch(deleteMessageByID(data));
        break;
      case 'chatDeleteByUser':
        api.dispatch(deleteMessagesByUser(data));
        break;
      case 'chatMute': {
        const currentTime = currentTimeSelector(api.getState());
        const expireIn = data.expiresAt - currentTime;
        const expirationTimer = expireIn > 0
          ? setTimeout(() => api.dispatch(unmuteUser({ userID: data.userID })), expireIn)
          : null;
        api.dispatch(muteUser({
          ...data,
          expirationTimer,
        }));
        break;
      }
      case 'chatUnmute':
        api.dispatch(unmuteUser(data));
        break;
      case 'acl:allow':
        api.dispatch(addRoles(data));
        break;
      case 'acl:disallow':
        api.dispatch(removeRoles(data));
        break;
      case 'reloadEmotes':
        mutate('/emotes');
        break;
      case 'playlistCycle':
        api.dispatch(cyclePlaylist(data.playlistID));
        break;
      case 'waitlistJoin':
        api.dispatch(waitlistActions.receiveJoin(data));
        break;
      case 'waitlistLeave':
        api.dispatch(waitlistActions.receiveLeave(data));
        break;
      case 'waitlistUpdate':
        api.dispatch(waitlistActions.waitlistUpdated({ waitlist: data }));
        break;
      case 'waitlistLock':
        api.dispatch(waitlistActions.lockChanged(data));
        break;
      case 'waitlistMove':
        api.dispatch(waitlistActions.moved(data));
        break;
      // TODO Treat moderator force-add and force-remove differently from voluntary
      // joins and leaves.
      case 'waitlistAdd':
        api.dispatch(waitlistActions.receiveJoin(data));
        break;
      case 'waitlistRemove':
        api.dispatch(waitlistActions.receiveLeave(data));
        break;
      case 'waitlistClear':
        api.dispatch(waitlistActions.clear());
        break;
      default:
        // Never happens
        expectType<never>(command);
    }
  },
});

export default middleware;
