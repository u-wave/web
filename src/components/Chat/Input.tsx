import { mdiAccountMultiple } from '@mdi/js';
import Paper from '@mui/material/Paper';
import { useTranslator } from '@u-wave/react-translate';
import cx from 'clsx';
import { useCombobox } from 'downshift';
import { matchSorter } from 'match-sorter';
import React, { useRef, useState } from 'react';
import { useSelector } from '../../hooks/useRedux';
import { customEmojiNamesSelector } from '../../reducers/config';
import type { User } from '../../reducers/users';
import emojiUrl from '../../utils/emojiUrl';
import Avatar from '../Avatar';
import SvgIcon from '../SvgIcon';

const MAX_SUGGESTIONS = 64;

function setCursorPosition(input: HTMLInputElement, position: number) {
  input.setSelectionRange(position, position);
}

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

/** @deprecated */
type CompletionProps<T> = { trigger: string, completions: T[] };

// User suggestions:
function getUserCompletions(value: string, { trigger, completions }: CompletionProps<User>) {
  const compare = value.slice(trigger.length);
  return matchSorter(completions, compare, { keys: ['username'] });
}
function getUserText(user: User, { trigger }: CompletionProps<User>) {
  return `${trigger}${user.username} `;
}

type UserSuggestionProps = {
  value: User,
  select: () => void,
  selected: boolean,
};
function UserSuggestion({ value, select, selected }: UserSuggestionProps) {
  return (
    <button
      type="button"
      onClick={select}
      className={cx('SuggestionItem', selected && 'is-focused')}
    >
      <span className="SuggestionItem-icon">
        <Avatar user={value} />
      </span>
      <span className="SuggestionItem-label">{value.username}</span>
    </button>
  );
}

// Group suggestions:
type GroupSuggestionProps = {
  value: string,
  select: () => void,
  selected: boolean,
};
function GroupSuggestion({ value, select, selected }: GroupSuggestionProps) {
  return (
    <button
      type="button"
      onClick={select}
      className={cx('SuggestionItem', selected && 'is-focused')}
    >
      <span className="SuggestionItem-icon">
        <SvgIcon path={mdiAccountMultiple} />
      </span>
      <span className="SuggestionItem-label">{value}</span>
    </button>
  );
}

// Emoji suggestions:
type Emoji = { shortcode: string, image: string };

function getEmojiCompletions(value: string, { completions }: CompletionProps<Emoji>) {
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
    <button {...props} className={cx('SuggestionItem', props['aria-selected'] && 'is-focused')}>
      <span
        className="SuggestionItem-icon EmojiSuggestion-image"
        style={{ backgroundImage: `url(${CSS.escape(url.href)})` }}
      />
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

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  let suggestions: Emoji[] = [];
  const m = selectionEnd != null ? completionRx.exec(value.slice(0, selectionEnd)) : null;
  if (m != null) {
    const trigger = m[2]!;
    const matchingValue = m[3]!;
    if (matchingValue.length > 2) {
      suggestions = getEmojiCompletions(matchingValue, { trigger, completions: props.availableEmoji });
    }
  }

  // I think I have to control `isOpen`, based on whether there are any suggestions for the current
  // matching text? Or just based on if a completion trigger is currently active?
  // That would then let me select the top highlighted element on initial open
  const combobox = useCombobox({
    inputValue: value,
    isOpen: isOpen && suggestions.length > 0,
    items: suggestions,
    itemToString: (emoji) => emoji == null ? '' : getEmojiText(emoji),
    onSelectedItemChange: (changes) => {
      if (selectionEnd != null && changes.selectedItem != null) {
        const m = completionRx.exec(value.slice(0, selectionEnd));
        if (m) {
          const before = m[1]!;
          const after = value.slice(selectionEnd);
          // inputValue is an already-stringified version of `selectedItem` at this point
          const newValue = `${before}${changes.inputValue}${after}`;

          // Set value manually through the ref before setting it through state,
          // this way the cursor position is maintained
          inputRef.current!.value = newValue;
          setCursorPosition(inputRef.current!, before.length + changes.inputValue!.length);

          setValue(newValue);
        }
      }
    },
    onIsOpenChange: ({ isOpen }) => {
      setIsOpen(isOpen);
    },
  });

  const [focused, setFocused] = useState(false);

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
    } else if (event.key === 'Home') {
      setCursorPosition(input, 0);
    } else if (event.key === 'End') {
      setCursorPosition(input, input.value.length);
    } else if (event.key === 'Enter' && combobox.isOpen === false) {
      props.onSend(value);
      setValue('');
      setSelectionEnd(0);
      combobox.reset();
    } else if (event.key === 'PageUp' && combobox.isOpen === false) {
      props.onScroll(-1);
    } else if (event.key === 'PageDown' && combobox.isOpen === false) {
      props.onScroll(1);
    }
  };

  const inputProps = combobox.getInputProps({
    ref: inputRef,
    onChange: (event) => {
      setValue(event.target.value);
      setSelectionEnd(event.target.selectionEnd);
    },
    onKeyDown: handleKeyDown,
  });

  console.log('state:', {
    isOpen: combobox.isOpen,
    highlightedIndex: combobox.highlightedIndex,
    inputValue: combobox.inputValue,
    selectedItem: combobox.selectedItem,
  });

  return (
    <div className={cx('ChatInput', focused ? 'is-focused' : '')}>
      <input
        type="text"
        className={cx('ChatInput-input', focused ? 'is-focused' : '')}
        placeholder={focused ? '' : t('chat.placeholder')}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...inputProps}
        value={value}
        // aria-label= {t('chat.label')}
      />

      <div className="ChatInput-suggestions" {...combobox.getMenuProps()}>
        {suggestions.length > 0
          ? (
            <Paper>
              {suggestions.map((suggestion, index) => (
                <EmojiSuggestion
                  key={suggestion.shortcode}
                  emoji={suggestion}
                  {...combobox.getItemProps({
                    item: suggestion,
                    index,
                  })}
                />
              ))}
            </Paper>
          )
          : null}
      </div>
    </div>
  );
}

export default ChatInput;
