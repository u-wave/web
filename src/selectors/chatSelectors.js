import { createSelector, createStructuredSelector } from 'reselect';
import mapValues from 'just-map-values';
import { getAvailableGroupMentions } from '../utils/chatMentions';
import {
  availableEmojiNamesSelector,
  availableEmojiImagesSelector,
  customEmojiNamesSelector,
  rolesSelector,
} from '../reducers/config';
import { currentUserSelector } from '../reducers/auth';
import { usersSelector, userHasRole } from '../reducers/users';

/** @param {import('../redux/configureStore').StoreState} state */
export const rawMotdSelector = (state) => state.chat.motd;

export const markupCompilerOptionsSelector = createStructuredSelector({
  availableEmoji: availableEmojiNamesSelector,
  emojiImages: availableEmojiImagesSelector,
  customEmojiNames: customEmojiNamesSelector,
});

/** @param {import('../redux/configureStore').StoreState} state */
const mutesSelector = (state) => state.chat.mutedUsers;

export const muteTimeoutsSelector = createSelector(
  mutesSelector,
  (mutes) => mapValues(mutes, (mute) => mute.expirationTimer),
);

export const mutedUserIDsSelector = createSelector(
  mutesSelector,
  (mutes) => Object.keys(mutes),
);

export const mutedUsersSelector = createSelector(
  mutedUserIDsSelector,
  usersSelector,
  (mutedIDs, users) => mutedIDs.map((userID) => users[userID]),
);

/** @param {import('../redux/configureStore').StoreState} state */
export const currentUserMuteSelector = (state) => {
  const user = currentUserSelector(state);
  const mutes = mutesSelector(state);
  return user ? mutes[user._id] : null;
};

export const availableGroupMentionsSelector = createSelector(
  rolesSelector,
  currentUserSelector,
  (roleConfig, user) => {
    if (user == null) {
      return [];
    }
    return getAvailableGroupMentions((mention) => userHasRole(roleConfig, user, `chat.mention.${mention}`));
  },
);

export const emojiCompletionsSelector = createSelector(
  availableEmojiImagesSelector,
  (images) => Object.keys(images).map((name) => ({
    shortcode: name,
    image: images[name],
  })),
);
