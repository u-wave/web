import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useBus } from 'react-bus';
import { createStructuredSelector } from 'reselect';
import { inputMessage } from '../actions/ChatActionCreators';
import {
  availableGroupMentionsSelector,
  emojiCompletionsSelector,
} from '../selectors/chatSelectors';
import {
  userListSelector,
  isLoggedInSelector,
} from '../selectors/userSelectors';
import ChatInput from '../components/Chat/Input';

const { useCallback } = React;

const mapStateToProps = createStructuredSelector({
  isLoggedIn: isLoggedInSelector,
  mentionableUsers: userListSelector,
  mentionableGroups: availableGroupMentionsSelector,
  availableEmoji: emojiCompletionsSelector,
});

const mapDispatchToProps = {
  onSend: inputMessage,
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

function ChatInputContainer({ isLoggedIn, ...props }) {
  const bus = useBus();
  const onScroll = useCallback((direction) => {
    bus.emit('chat:scroll', direction);
  }, []);

  return (
    isLoggedIn
      ? <ChatInput {...props} onScroll={onScroll} />
      : <span />
  );
}

ChatInputContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default enhance(ChatInputContainer);
