import cx from 'classnames';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import * as React from 'react';
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
    emoji => emoji.shortcode.length
  );
};
const getEmojiText = value => `:${value.shortcode}: `;
const renderEmoji = props => <EmojiSuggestion {...props} />;

@translate()
export default class Input extends React.Component {
  static propTypes = {
    t: React.PropTypes.func.isRequired,
    onSend: React.PropTypes.func.isRequired,
    mentionableUsers: React.PropTypes.array.isRequired,
    mentionableGroups: React.PropTypes.array.isRequired,
    availableEmoji: React.PropTypes.array.isRequired
  };

  state = {
    focused: false
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
  };

  handleUpdate = (newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const {
      focused,
      value
    } = this.state;
    const {
      t,
      mentionableUsers,
      mentionableGroups,
      availableEmoji
    } = this.props;
    const focusClass = focused ? 'is-focused' : '';
    return (
      <div className={cx('ChatInput', focusClass)}>
        <AutoComplete
          inputProps={{
            className: cx('ChatInput-input', focusClass),
            placeholder: focused ? '' : t('chat.placeholder'),
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onKeyDown: this.handleKeyDown
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
