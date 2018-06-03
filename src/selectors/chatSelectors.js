import { createSelector, createStructuredSelector } from 'reselect';
import objMap from 'object.map';
import parseChatMarkup from 'u-wave-parse-chat-markup';

import { getAvailableGroupMentions } from '../utils/chatMentions';
import {
  availableEmojiNamesSelector,
  availableEmojiImagesSelector,
} from './configSelectors';
import {
  usersSelector,
  currentUserSelector,
  currentUserHasRoleSelector,
  createRoleCheckSelector,
} from './userSelectors';
import { notificationSettingsSelector } from './settingSelectors';

const baseSelector = state => state.chat;

export const rawMotdSelector = createSelector(baseSelector, chat => chat.motd);
export const motdSelector = createSelector(
  rawMotdSelector,
  motd => (motd ? parseChatMarkup(motd) : null),
);

const MAX_MESSAGES = 500;
const allMessagesSelector = createSelector(baseSelector, chat => chat.messages);
const filteredMessagesSelector = createSelector(
  allMessagesSelector,
  notificationSettingsSelector,
  (messages, notificationSettings) => messages.filter((message) => {
    if (message.type === 'userJoin') return notificationSettings.userJoin;
    if (message.type === 'userLeave') return notificationSettings.userLeave;
    if (message.type === 'userNameChanged') return notificationSettings.userNameChanged;
    if (message.type === 'skip') return notificationSettings.skip;
    return true;
  }),
);
export const messagesSelector = createSelector(
  filteredMessagesSelector,
  messages => messages.slice(-MAX_MESSAGES),
);

export const markupCompilerOptionsSelector = createStructuredSelector({
  availableEmoji: availableEmojiNamesSelector,
  emojiImages: availableEmojiImagesSelector,
});

const mutesSelector = createSelector(baseSelector, chat => chat.mutedUsers);

export const muteTimeoutsSelector = createSelector(
  mutesSelector,
  mutes => objMap(mutes, mute => mute.expirationTimer),
);

export const mutedUserIDsSelector = createSelector(
  mutesSelector,
  mutes => Object.keys(mutes),
);

export const mutedUsersSelector = createSelector(
  mutedUserIDsSelector,
  usersSelector,
  (mutedIDs, users) => mutedIDs.map(userID => users[userID]),
);

export const currentUserMuteSelector = createSelector(
  currentUserSelector,
  mutesSelector,
  (user, mutes) => (user ? mutes[user._id] : null),
);

export const availableGroupMentionsSelector = createSelector(
  currentUserHasRoleSelector,
  hasRole => getAvailableGroupMentions(mention => hasRole(`chat.mention.${mention}`)),
);

export const emojiCompletionsSelector = createSelector(
  availableEmojiImagesSelector,
  images => Object.keys(images).map(name => ({
    shortcode: name,
    image: images[name],
  })),
);

export const canDeleteMessagesSelector = createRoleCheckSelector('chat.delete');
