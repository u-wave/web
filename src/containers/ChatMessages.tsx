import { useCallback } from 'react';
import { useDispatch, useSelector } from '../hooks/useRedux';
import {
  motdSelector,
  messagesSelector,
  markupCompilerOptionsSelector,
  canDeleteMessagesSelector,
} from '../selectors/chatSelectors';
import { deleteChatMessage } from '../actions/ModerationActionCreators';
import ChatMessages from '../components/Chat/ChatMessages';

function ChatMessagesContainer() {
  const dispatch = useDispatch();
  const motd = useSelector(motdSelector);
  const messages = useSelector(messagesSelector);
  const compileOptions = useSelector(markupCompilerOptionsSelector);
  const canDeleteMessages = useSelector(canDeleteMessagesSelector);
  const onDeleteMessage = useCallback((id: string) => {
    dispatch(deleteChatMessage(id));
  }, [dispatch]);

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
