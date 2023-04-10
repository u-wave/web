import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { mutate } from 'swr';
import type { StoreState } from './configureStore';
import {
  advance,
  skipped,
} from '../actions/BoothActionCreators';
import {
  deleteMessageByID,
  deleteMessagesByUser,
  deleteAllMessages,
  muteUser,
  unmuteUser,
} from '../reducers/chat';
import * as waitlistActions from '../reducers/waitlist';
import { receive as receiveMessage } from '../actions/ChatActionCreators';
import { cyclePlaylist } from '../actions/PlaylistActionCreators';
import { movedInWaitlist } from '../actions/WaitlistActionCreators';
import { favorited, receiveVote } from '../actions/VoteActionCreators';
import { currentTimeSelector } from '../selectors/timeSelectors';
import {
  addRoles,
  receiveGuestCount,
  removeRoles,
  userJoin,
  userLeave,
  usernameChanged,
} from '../reducers/users';
import { socketMessage, SocketMessageParams } from './socket';

const actions: {
  [K in keyof SocketMessageParams]: (data: SocketMessageParams[K]) =>
    (AnyAction | ThunkAction<unknown, StoreState, never, AnyAction>)
} = {
  chatMessage({
    id, userID, message, timestamp,
  }) {
    return receiveMessage({
      _id: id,
      userID,
      text: message,
      timestamp,
    });
  },
  chatDelete() {
    return deleteAllMessages();
  },
  chatDeleteByID({ _id }) {
    return deleteMessageByID({ _id });
  },
  chatDeleteByUser({ userID }) {
    return deleteMessagesByUser({ userID });
  },
  chatMute({ userID, expiresAt, moderatorID }) {
    return (dispatch, getState) => {
      const currentTime = currentTimeSelector(getState());
      const expireIn = expiresAt - currentTime;
      const expirationTimer = expireIn > 0
        ? setTimeout(() => dispatch(unmuteUser({ userID })), expireIn)
        : null;
      muteUser({
        userID,
        moderatorID,
        expiresAt,
        expirationTimer,
      });
    };
  },
  chatUnmute({ userID, moderatorID }) {
    return unmuteUser({ userID, moderatorID });
  },
  advance(booth) {
    return advance(booth);
  },
  skip({ userID, moderatorID, reason }) {
    return skipped({ userID, moderatorID, reason });
  },
  favorite({ userID }) {
    return favorited({ userID });
  },
  vote({ _id, value }) {
    return receiveVote({ userID: _id, vote: value });
  },
  waitlistJoin({ userID, waitlist }) {
    return waitlistActions.join({ userID, waitlist });
  },
  waitlistLeave({ userID, waitlist }) {
    return waitlistActions.leave({ userID, waitlist });
  },
  waitlistUpdate(waitlist) {
    return waitlistActions.update({ waitlist });
  },
  waitlistLock({ locked }) {
    return waitlistActions.lock({ locked });
  },
  waitlistMove({
    userID, moderatorID, position, waitlist,
  }) {
    return movedInWaitlist({
      userID, moderatorID, position, waitlist,
    });
  },
  // TODO Treat moderator force-add and force-remove differently from voluntary
  // joins and leaves.
  waitlistAdd({ userID, waitlist }) {
    return waitlistActions.join({ userID, waitlist });
  },
  waitlistRemove({ userID, waitlist }) {
    return waitlistActions.leave({ userID, waitlist });
  },
  waitlistClear() {
    return waitlistActions.clear();
  },
  playlistCycle({ playlistID }) {
    return cyclePlaylist(playlistID);
  },
  join(user) {
    return userJoin({ user });
  },
  leave(userID) {
    return userLeave({ userID });
  },
  nameChange(payload) {
    return usernameChanged(payload);
  },
  guests(count) {
    return receiveGuestCount({ guests: count });
  },
  'acl:allow': addRoles,
  'acl:disallow': removeRoles,

  reloadEmotes: () => {
    return () => {
      mutate('/emotes');
    };
  },
};

const middleware = createListenerMiddleware();
middleware.startListening({
  actionCreator: socketMessage,
  effect: (action, api) => {
    const { command, data } = action.payload;
    const dispatchable = actions[command]?.(data);
    if (dispatchable) {
      api.dispatch(dispatchable);
    }
  },
});

export default middleware;
