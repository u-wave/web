import { createSelector, createStructuredSelector } from 'reselect';
import objMap from 'object.map';

import { usersSelector, currentUserSelector } from './userSelectors';

const baseSelector = state => state.chat;

export const messagesSelector = createSelector(baseSelector, chat => chat.messages);
const mutesSelector = createSelector(baseSelector, chat => chat.mutedUsers);

export const chatSelector = createStructuredSelector({
  messages: messagesSelector
});

export const muteTimeoutsSelector = createSelector(
  mutesSelector,
  mutes => objMap(mutes, mute => mute.expirationTimer)
);

export const mutedUserIDsSelector = createSelector(
  mutesSelector,
  mutes => Object.keys(mutes)
);

export const mutedUsersSelector = createSelector(
  mutedUserIDsSelector,
  usersSelector,
  (mutedIDs, users) => mutedIDs.map(userID => users[userID])
);

export const currentUserMuteSelector = createSelector(
  currentUserSelector,
  mutesSelector,
  (user, mutes) => user ? mutes[user._id] : null
);
