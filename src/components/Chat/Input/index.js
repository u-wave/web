import cx from 'classnames';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import AutoComplete, { Completion } from 'react-abstract-autocomplete';
import SuggestionsList from './SuggestionsList';
import EmojiSuggestion from './EmojiSuggestion';
import GroupSuggestion from './GroupSuggestion';
import UserSuggestion from './UserSuggestion';

const renderSuggestions = children => (
  <SuggestionsList>{children}</SuggestionsList>
);

// User suggestions:
const getUserCompletions = (value, { trigger, completions }) => {
  const compare = value.substr(trigger.length).toLowerCase();
  return completions.filter(user => (
    user.username.substr(0, compare.length).toLowerCase() === compare
  ));
};
const getUserText = (user, { trigger }) => `${trigger}${user.username} `;
const renderUser = props => <UserSuggestion {...props} />;

// Group suggestions:
const renderGroup = props => <GroupSuggestion {...props} />;

// Emoji suggestions:
const getEmojiCompletions = (value, { trigger, completions }) => {
  const compare = value.substr(trigger.length).toLowerCase();
  const results = completions.filter(emoji => (
    emoji.shortcode.substr(0, compare.length).toLowerCase() === compare
  ));
  return sortBy(
    uniqBy(results, emoji => emoji.image),
    emoji => emoji.shortcode.length,
  );
};
const getEmojiText = value => `:${value.shortcode}: `;
const renderEmoji = props => <EmojiSuggestion {...props} />;

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

  state = {
    focused: false,
    value: '',
  };

  clear() {
    this.setState({ value: '' });
  }

  handleFocus = () => {
    this.setState({ focused: true });
  };
  handleBlur = () => {
    this.setState({ focused: false });
  };

  handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      const value = e.target.value.trim();
      if (value.length > 0) {
        this.props.onSend(value);
      }
      this.clear();
    }
    if (e.key === 'PageUp') {
      e.preventDefault();
      this.props.onScroll(-1);
    }
    if (e.key === 'PageDown') {
      e.preventDefault();
      this.props.onScroll(1);
    }
    if (e.key === 'End' && e.ctrlKey) {
      e.preventDefault();
      this.props.onScroll('end');
    }
    if (e.key === 'Home' && e.ctrlKey) {
      e.preventDefault();
      this.props.onScroll('start');
    }
  };

  handleUpdate = (newValue) => {
    this.setState({ value: newValue });
  };

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
    return (
      <div className={cx('ChatInput', focusClass)}>
        <AutoComplete
          inputProps={{
            type: 'text',
            className: cx('ChatInput-input', focusClass),
            placeholder: focused ? '' : t('chat.placeholder'),
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
