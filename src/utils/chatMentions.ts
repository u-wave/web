import type { MarkupNode, MentionNode } from 'u-wave-parse-chat-markup';
import { userListSelector, type User } from '../reducers/users';
import type { StoreState } from '../redux/configureStore';
import groupMentions from './groupMentions';

export { groupMentions };

/** Get a list of group names that can be mentioned by a user. */
export function getAvailableGroupMentions(canMention: (group: string) => boolean) {
  if (canMention) {
    return Object.keys(groupMentions).filter(canMention);
  }
  return [];
}

const groupTag = Symbol('group');
const userTag = Symbol('user');
function tagWithGroup(node: MentionNode, group: Set<string>) {
  Object.defineProperty(node, groupTag, { value: group });
}
function tagWithUser(node: MentionNode, user: User) {
  Object.defineProperty(node, userTag, { value: user });
}

function taggedGroup(node: MentionNode): Set<string> | undefined {
  return (node as Record<symbol, Set<string>>)[groupTag];
}
function taggedUser(node: MentionNode): User | undefined {
  return (node as Record<symbol, User>)[userTag];
}

/** Attach user objects to mentions in a parsed chat message. */
export function resolveMentions(tree: MarkupNode[], state: StoreState) {
  const users = userListSelector(state);
  tree.forEach((node) => {
    if (typeof node === 'string') {
      // No mentions in plain text :)
    } else if (node.type === 'mention') {
      const groupSelector = node.mention in groupMentions
        ? groupMentions[node.mention as keyof typeof groupMentions]
        : null;
      /* eslint-disable no-param-reassign */
      if (groupSelector != null) {
        const group = groupSelector(state).filter((user) => user != null);
        if (group.length > 0) {
          tagWithGroup(node, new Set(group.map((user) => user._id)));
        }
      } else {
        const mentionedUser = users.find((user) => user.username.toLowerCase() === node.mention);
        if (mentionedUser != null) {
          tagWithUser(node, mentionedUser);
        }
      }
      /* eslint-enable no-param-reassign */
    } else if ('content' in node) {
      resolveMentions(node.content, state);
    }
  });
}

/**
 * Check whether a parsed chat message mentions a given user ID. Expects mention
 * nodes to have User data, added by `resolveMentions()`.
 */
export function hasMention(tree: MarkupNode[], userID: string): boolean {
  return tree.some((node) => {
    if (typeof node === 'object' && node.type === 'mention') {
      const user = taggedUser(node);
      if (user != null) {
        return user._id === userID;
      }
      const group = taggedGroup(node);
      if (group != null) {
        return group.has(userID);
      }
      return false;
    }
    return Array.isArray(node) && hasMention(node, userID);
  });
}
