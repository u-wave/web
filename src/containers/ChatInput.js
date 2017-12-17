import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { connect } from 'react-redux';
import { withBus } from 'react-bus';
import { createStructuredSelector } from 'reselect';
import {
  inputMessage
} from '../actions/ChatActionCreators';
import {
  availableGroupMentionsSelector,
  emojiCompletionsSelector
} from '../selectors/chatSelectors';
import {
  userListSelector,
  isLoggedInSelector
} from '../selectors/userSelectors';

import ChatInput from '../components/Chat/Input';

const mapStateToProps = createStructuredSelector({
  isLoggedIn: isLoggedInSelector,
  mentionableUsers: userListSelector,
  mentionableGroups: availableGroupMentionsSelector,
  availableEmoji: emojiCompletionsSelector
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onSend: inputMessage
}, dispatch);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withBus(),
  withProps(({ bus }) => ({
    onScroll: direction => bus.emit('chat:scroll', direction)
  }))
);

const ChatInputContainer = ({ isLoggedIn, ...props }) => (
  isLoggedIn
    ? <ChatInput {...props} />
    : <span />
);

ChatInputContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default enhance(ChatInputContainer);
