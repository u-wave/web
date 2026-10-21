import { createSelector, createStructuredSelector } from 'reselect';
import { currentUserSelector } from '../reducers/auth';
import {
  availableEmojiImagesSelector,
  availableEmojiNamesSelector,
  customEmojiNamesSelector,
  rolesSelector,
} from '../reducers/config';
import { userHasRole } from '../reducers/users';
import { getAvailableGroupMentions } from '../utils/chatMentions';

export const markupCompilerOptionsSelector = createStructuredSelector({
  availableEmoji: availableEmojiNamesSelector,
  emojiImages: availableEmojiImagesSelector,
  customEmojiNames: customEmojiNamesSelector,
});

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
