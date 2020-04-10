import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useBus } from 'react-bus';
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

const {
  useCallback,
} = React;

function ChatInputContainer() {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const mentionableUsers = useSelector(userListSelector);
  const mentionableGroups = useSelector(availableGroupMentionsSelector);
  const availableEmoji = useSelector(emojiCompletionsSelector);
  const dispatch = useDispatch();
  const onSend = useCallback((message) => dispatch(inputMessage(message)));

  const bus = useBus();
  const onScroll = useCallback((direction) => {
    bus.emit('chat:scroll', direction);
  }, [bus]);

  if (isLoggedIn) {
    return (
      <ChatInput
        mentionableUsers={mentionableUsers}
        mentionableGroups={mentionableGroups}
        availableEmoji={availableEmoji}
        onSend={onSend}
        onScroll={onScroll}
      />
    );
  }

  return null;
}

export default ChatInputContainer;
