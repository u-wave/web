import { createSelector, createStructuredSelector } from 'reselect';
import { getAvailableGroupMentions } from '../utils/chatMentions';
import {
  availableEmojiNamesSelector,
  availableEmojiImagesSelector,
  customEmojiNamesSelector,
  rolesSelector,
} from '../reducers/config';
import { currentUserSelector } from '../reducers/auth';
import { userHasRole } from '../reducers/users';

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
