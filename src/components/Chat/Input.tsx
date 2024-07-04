import cx from 'clsx';
import React from 'react';
import { mdiAccountMultiple } from '@mdi/js';
import Paper from '@mui/material/Paper';
import { type Translator, translate } from '@u-wave/react-translate';
import AutoComplete, { Completion, type CompletionProps } from 'react-abstract-autocomplete';
import { matchSorter } from 'match-sorter';
import SvgIcon from '../SvgIcon';
import Avatar from '../Avatar';
import type { User } from '../../reducers/users';
import { useSelector } from '../../hooks/useRedux';
import emojiUrl from '../../utils/emojiUrl';
import { customEmojiNamesSelector } from '../../reducers/config';

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

function renderUser(props: UserSuggestionProps) {
  return <UserSuggestion {...props} />;
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

function renderGroup(props: GroupSuggestionProps) {
  return <GroupSuggestion {...props} />;
}

// Emoji suggestions:
type Emoji = { shortcode: string, image: string };

function getEmojiCompletions(value: string, { trigger, completions }: CompletionProps<Emoji>) {
  const compare = value.slice(trigger.length).toLowerCase();
  const results = matchSorter(completions, compare, {
    keys: ['shortcode'],
    baseSort: (a, b) => a.rankedValue.length - b.rankedValue.length,
  });

  return uniqBy(results, (emoji) => emoji.image);
}
function getEmojiText(value: Emoji) {
  return `:${value.shortcode}: `;
}

type EmojiSuggestionProps = {
  value: Emoji,
  select: () => void,
  selected: boolean,
};
function EmojiSuggestion({ value, select, selected }: EmojiSuggestionProps) {
  const customEmojiNames = useSelector(customEmojiNamesSelector);
  const isCustom = customEmojiNames.has(value.shortcode);
  const url = emojiUrl(value.image, isCustom);

  return (
    <button
      type="button"
      onClick={select}
      className={cx('SuggestionItem', selected && 'is-focused')}
    >
      <span
        className="SuggestionItem-icon EmojiSuggestion-image"
        style={{ backgroundImage: `url(${CSS.escape(url.href)})` }}
      />
      <span className="SuggestionItem-label">{getEmojiText(value)}</span>
    </button>
  );
}

function renderEmoji(props: EmojiSuggestionProps) {
  return <EmojiSuggestion {...props} />;
}

type SuggestionsListProps = {
  children: React.ReactNode,
};
function SuggestionsList({ children }: SuggestionsListProps) {
  return (
    <div className="ChatInput-suggestions">
      <Paper>
        {children}
      </Paper>
    </div>
  );
}

function renderSuggestions(children: React.ReactNode) {
  return (
    <SuggestionsList>{children}</SuggestionsList>
  );
}

const enhance = translate();

type ChatInputProps = {
  t: Translator['t'],
  onSend: (message: string) => void,
  onScroll: (by: -1 | 1 | 'start' | 'end') => void,
  mentionableUsers: User[],
  mentionableGroups: string[],
  availableEmoji: Emoji[],
};
type ChatInputState = {
  focused: boolean,
  value: string,
};
class ChatInput extends React.Component<ChatInputProps, ChatInputState> {
  constructor(props: ChatInputProps) {
    super(props);

    this.state = {
      focused: false,
      value: '',
    };
  }

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = () => {
    this.setState({ focused: false });
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onSend, onScroll } = this.props;

    e.stopPropagation();
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim();
      if (value.length > 0) {
        onSend(value);
      }
      this.clear();
    }
    if (e.key === 'PageUp') {
      e.preventDefault();
      onScroll(-1);
    }
    if (e.key === 'PageDown') {
      e.preventDefault();
      onScroll(1);
    }
    if (e.key === 'End' && e.ctrlKey) {
      e.preventDefault();
      onScroll('end');
    }
    if (e.key === 'Home' && e.ctrlKey) {
      e.preventDefault();
      onScroll('start');
    }
  };

  handleUpdate = (newValue: string) => {
    this.setState({ value: newValue });
  };

  clear() {
    this.setState({ value: '' });
  }

  render() {
    const {
      focused,
      value,
    } = this.state;
    const {
      t,
      mentionableUsers,
      mentionableGroups,
      availableEmoji,
    } = this.props;

    const focusClass = focused ? 'is-focused' : '';

    // TODO(@goto-bus-stop) Use downshift for accessibility
    return (
      <div className={cx('ChatInput', focusClass)}>
        <AutoComplete
          inputProps={{
            type: 'text',
            className: cx('ChatInput-input', focusClass),
            placeholder: focused ? '' : t('chat.placeholder'),
            'aria-label': t('chat.label'),
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onKeyDown: this.handleKeyDown,
          }}
          onUpdate={this.handleUpdate}
          value={value}
          renderSuggestions={renderSuggestions}
          limit={6}
        >
          <Completion
            trigger="@"
            minLength={2}
            completions={mentionableUsers}
            getCompletions={getUserCompletions}
            getText={getUserText}
            renderSuggestion={renderUser}
          />
          <Completion
            trigger="@"
            minLength={2}
            completions={mentionableGroups}
            renderSuggestion={renderGroup}
          />
          <Completion
            trigger=":"
            completions={availableEmoji}
            getCompletions={getEmojiCompletions}
            getText={getEmojiText}
            renderSuggestion={renderEmoji}
          />
        </AutoComplete>
      </div>
    );
  }
}

export default enhance(ChatInput);
