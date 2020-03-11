import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  motdSelector,
  messagesSelector,
  markupCompilerOptionsSelector,
  canDeleteMessagesSelector,
} from '../selectors/chatSelectors';
import { deleteChatMessage } from '../actions/ModerationActionCreators';
import ChatMessages from '../components/Chat/ChatMessages';

const {
  useCallback,
} = React;

function ChatMessagesContainer() {
  const motd = useSelector(motdSelector);
  const messages = useSelector(messagesSelector);
  const compileOptions = useSelector(markupCompilerOptionsSelector);
  const canDeleteMessages = useSelector(canDeleteMessagesSelector);
  const dispatch = useDispatch();
  const onDeleteMessage = useCallback((id) => dispatch(deleteChatMessage(id)), []);

  return (
    <ChatMessages
      motd={motd}
      messages={messages}
      compileOptions={compileOptions}
      canDeleteMessages={canDeleteMessages}
      onDeleteMessage={onDeleteMessage}
    />
  );
}

export default ChatMessagesContainer;
