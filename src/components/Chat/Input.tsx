import { mdiAccountMultiple } from '@mdi/js';
import Paper from '@mui/material/Paper';
import { useTranslator } from '@u-wave/react-translate';
import cx from 'clsx';
import { useCombobox } from 'downshift';
import { matchSorter } from 'match-sorter';
import React, { useMemo, useRef, useState } from 'react';
import { useSelector } from '../../hooks/useRedux';
import { customEmojiNamesSelector } from '../../reducers/config';
import type { User } from '../../reducers/users';
import emojiUrl from '../../utils/emojiUrl';
import Avatar from '../Avatar';
import SvgIcon from '../SvgIcon';

const MAX_SUGGESTIONS = 64;

/** Set the cursor position in an input element. */
function setCursorPosition(input: HTMLInputElement, position: number) {
  input.setSelectionRange(position, position);
}

type UserGroup = { role: string };
type ChatCompletionSuggestion = User | UserGroup | Emoji;

/**
 * Filter an array down to unique elements, keyed by a function.
 */
function uniqBy<T, K>(array: T[], key: (element: T) => K): T[] {
  const seen = new Set();
  return array.filter((item) => {
    const v = key(item);
    if (!seen.has(v)) {
      seen.add(v);
      return true;
    }
    return false;
  });
}

// User suggestions:
function isUserCompletion(value: ChatCompletionSuggestion): value is User {
  return 'username' in value;
}
function getUserCompletions(value: string, completions: User[]) {
  return matchSorter(completions, value, { keys: ['username'] });
}
function getUserText(user: User) {
  return `@${user.username} `;
}

type UserSuggestionProps = React.ComponentPropsWithRef<'button'> & { user: User };
function UserSuggestion({ user, ...props }: UserSuggestionProps) {
  return (
    <button className="SuggestionItem" {...props}>
      <span className="SuggestionItem-icon">
        <Avatar user={user} />
      </span>
      <span className="SuggestionItem-label">{user.username}</span>
    </button>
  );
}

// Group suggestions:
function isGroupCompletion(value: ChatCompletionSuggestion): value is UserGroup {
  return 'role' in value;
}
function getGroupCompletions(value: string, completions: string[]): UserGroup[] {
  return matchSorter(completions, value).map((role) => ({ role }));
}
function getGroupText(value: UserGroup) {
  return `@${value.role} `;
}
type GroupSuggestionProps = React.ComponentPropsWithRef<'button'> & { userGroup: UserGroup };
function GroupSuggestion({ userGroup, ...props }: GroupSuggestionProps) {
  return (
    <button className="SuggestionItem" {...props}>
      <span className="SuggestionItem-icon">
        <SvgIcon path={mdiAccountMultiple} />
      </span>
      <span className="SuggestionItem-label">{userGroup.role}</span>
    </button>
  );
}

// Emoji suggestions:
type Emoji = { shortcode: string, image: string };

function isEmojiCompletion(value: ChatCompletionSuggestion): value is Emoji {
  return 'shortcode' in value;
}
function getEmojiCompletions(value: string, completions: Emoji[]) {
  const compare = value.toLowerCase();
  const results = matchSorter(completions, compare, {
    keys: ['shortcode'],
    baseSort: (a, b) => a.rankedValue.length - b.rankedValue.length,
  });

  return uniqBy(results, (emoji) => emoji.image).slice(0, MAX_SUGGESTIONS);
}
function getEmojiText(value: Emoji) {
  return `:${value.shortcode}: `;
}

type EmojiSuggestionProps = React.ComponentPropsWithRef<'button'> & { emoji: Emoji };
function EmojiSuggestion({ emoji, ...props }: EmojiSuggestionProps) {
  const customEmojiNames = useSelector(customEmojiNamesSelector);
  const isCustom = customEmojiNames.has(emoji.shortcode);
  const url = emojiUrl(emoji.image, isCustom);

  return (
    <button className="SuggestionItem" {...props}>
      <span className="SuggestionItem-icon">
        <img loading="lazy" className="EmojiSuggestion-image" src={url.href} />
      </span>
      <span className="SuggestionItem-label">{getEmojiText(emoji)}</span>
    </button>
  );
}

const completionRx = /(.*)([:@])(.*?)$/;

type ChatInputProps = {
  onSend: (message: string) => void,
  onScroll: (by: -1 | 1 | 'start' | 'end') => void,
  mentionableUsers: User[],
  mentionableGroups: string[],
  availableEmoji: Emoji[],
};
function ChatInput(props: ChatInputProps) {
  const { t } = useTranslator();

  // In the future, maybe we can pull this out to a `useTextCompletions` hook that
  // doesn't include the specifics of emoji vs. users vs. groups

  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [inputValue, setValue] = useState('');
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const m = selectionEnd != null ? completionRx.exec(inputValue.slice(0, selectionEnd)) : null;
  const trigger = m?.[2];
  const matchingValue = m?.[3];
  const items = useMemo(() => {
    if (trigger == null || matchingValue == null) {
      return [];
    }

    if (trigger === ':' && matchingValue.length > 1) {
      return getEmojiCompletions(matchingValue, props.availableEmoji);
    }
    if (trigger === '@' && matchingValue.length > 0) {
      return (getUserCompletions(matchingValue, props.mentionableUsers) as ChatCompletionSuggestion[]).concat(
        getGroupCompletions(matchingValue, props.mentionableGroups),
      );
    }

    return [];
  }, [trigger, matchingValue, props.availableEmoji, props.mentionableUsers, props.mentionableGroups]);

  const isOpen = focused && items.length > 0;

  const combobox = useCombobox({
    inputValue,
    items,

    // Because we only open the suggestions box when focused, we can always require
    // one of the items to be highlighted
    isOpen,
    highlightedIndex: isOpen && highlightedIndex === -1 ? 0 : highlightedIndex,

    itemToString: (completion) => {
      if (completion == null) {
        return '';
      }
      if (isEmojiCompletion(completion)) {
        return getEmojiText(completion);
      }
      if (isUserCompletion(completion)) {
        return getUserText(completion);
      }
      if (isGroupCompletion(completion)) {
        return getGroupText(completion);
      }
      const _: never = completion;
      return '';
    },
    onSelectedItemChange: (changes) => {
      if (changes.selectedItem == null || selectionEnd == null) {
        return;
      }

      const m = completionRx.exec(inputValue.slice(0, selectionEnd));
      if (m == null) {
        return;
      }

      const before = m[1]!;
      const after = inputValue.slice(selectionEnd);
      // inputValue is an already-stringified version of `selectedItem` at this point
      const newValue = `${before}${changes.inputValue}${after}`;

      // Set value manually through the ref before setting it through state,
      // this way the cursor position is maintained
      inputRef.current!.value = newValue;
      setCursorPosition(inputRef.current!, before.length + changes.inputValue!.length);

      setValue(newValue);
      setSelectionEnd(null);
    },
    onHighlightedIndexChange: ({ highlightedIndex }) => {
      setHighlightedIndex(highlightedIndex);
    },
  });

  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    if (event.key === 'End' && event.ctrlKey) {
      props.onScroll('end');
    } else if (event.key === 'Home' && event.ctrlKey) {
      props.onScroll('start');
    } else if (event.key === 'PageUp' && combobox.isOpen === false) {
      props.onScroll(-1);
    } else if (event.key === 'PageDown' && combobox.isOpen === false) {
      props.onScroll(1);
    } else if (event.key === 'Home') {
      setCursorPosition(input, 0);
    } else if (event.key === 'End') {
      setCursorPosition(input, input.value.length);
    } else if (event.key === 'Enter' && combobox.isOpen === false) {
      props.onSend(inputValue);
      setValue('');
      setSelectionEnd(0);
      combobox.reset();
    }
  };

  // downshift handles the ref correctly during render.
  // eslint-disable-next-line react/refs
  const inputProps = combobox.getInputProps({
    role: 'textbox', // It's not a combobox, it just has completions
    ref: inputRef,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: (event) => {
      setValue(event.target.value);
      setSelectionEnd(event.target.selectionEnd);
    },
    onKeyDown: handleKeyDown,
  });

  return (
    <div className="ChatInput">
      <input
        type="text"
        className={cx('ChatInput-input', focused ? 'is-focused' : '')}
        placeholder={focused ? '' : t('chat.placeholder')}
        {...inputProps}
        value={inputValue}
        aria-labelledby={undefined}
        aria-label={t('chat.label')}
      />

      <div
        className={cx('ChatInput-suggestions', isOpen ? 'is-open' : '')}
        {...combobox.getMenuProps()}
        aria-labelledby={undefined}
        aria-label={t('chat.suggestionsLabel')}
      >
        {items.length > 0
          ? (
            <Paper>
              {items.map((suggestion, index) => {
                if (isEmojiCompletion(suggestion)) {
                  return (
                    <EmojiSuggestion
                      key={suggestion.shortcode}
                      emoji={suggestion}
                      {...combobox.getItemProps({
                        item: suggestion,
                        index,
                      })}
                    />
                  );
                }
                if (isUserCompletion(suggestion)) {
                  return (
                    <UserSuggestion
                      key={suggestion._id}
                      user={suggestion}
                      {...combobox.getItemProps({
                        item: suggestion,
                        index,
                      })}
                    />
                  );
                }
                if (isGroupCompletion(suggestion)) {
                  return (
                    <GroupSuggestion
                      key={suggestion.role}
                      userGroup={suggestion}
                      {...combobox.getItemProps({
                        item: suggestion,
                        index,
                      })}
                    />
                  );
                }
              })}
            </Paper>
          )
          : null}
      </div>
    </div>
  );
}

export default ChatInput;
