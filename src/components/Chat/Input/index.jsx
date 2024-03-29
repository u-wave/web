import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import AutoComplete, { Completion } from 'react-abstract-autocomplete';
import { matchSorter } from 'match-sorter';
import SuggestionsList from './SuggestionsList';
import EmojiSuggestion from './EmojiSuggestion';
import GroupSuggestion from './GroupSuggestion';
import UserSuggestion from './UserSuggestion';

/**
 * Filter an array down to unique elements, keyed by a function.
 *
 * @template Element,Key
 * @param {Element[]} array
 * @param {(element: Element) => Key} key
 * @return {Element[]}
 */
function uniqBy(array, key) {
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

const renderSuggestions = (children) => (
  <SuggestionsList>{children}</SuggestionsList>
);

// User suggestions:
const getUserCompletions = (value, { trigger, completions }) => {
  const compare = value.substr(trigger.length);
  return matchSorter(completions, compare, { keys: ['username'] });
};
const getUserText = (user, { trigger }) => `${trigger}${user.username} `;
const renderUser = (props) => <UserSuggestion {...props} />;

// Group suggestions:
const renderGroup = (props) => <GroupSuggestion {...props} />;

// Emoji suggestions:
const getEmojiCompletions = (value, { trigger, completions }) => {
  const compare = value.substr(trigger.length).toLowerCase();
  const results = matchSorter(completions, compare, {
    keys: ['shortcode'],
    baseSort: (a, b) => a.rankedValue.length - b.rankedValue.length,
  });

  return uniqBy(results, (emoji) => emoji.image);
};
const getEmojiText = (value) => `:${value.shortcode}: `;
const renderEmoji = (props) => <EmojiSuggestion {...props} />;

const enhance = translate();

class ChatInput extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
    onScroll: PropTypes.func.isRequired,
    mentionableUsers: PropTypes.array.isRequired,
    mentionableGroups: PropTypes.array.isRequired,
    availableEmoji: PropTypes.array.isRequired,
  };

  constructor(props) {
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

  handleKeyDown = (e) => {
    const { onSend, onScroll } = this.props;

    e.stopPropagation();
    if (e.key === 'Enter') {
      const value = e.target.value.trim();
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

  handleUpdate = (newValue) => {
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
