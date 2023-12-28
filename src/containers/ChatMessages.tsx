import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from '../hooks/useRedux';
import { motdSelector, messagesSelector } from '../reducers/chat';
import { canDeleteMessagesSelector } from '../selectors/chatSelectors';
import { customEmojiNamesSelector } from '../reducers/config';
import { deleteChatMessage } from '../actions/ModerationActionCreators';
import ChatMessages from '../components/Chat/ChatMessages';
import useEmotes from '../hooks/useEmotes';
import type { CompileOptions } from '../components/Chat/Markup';

function ChatMessagesContainer() {
  const dispatch = useDispatch();
  const motd = useSelector(motdSelector);
  const messages = useSelector(messagesSelector);
  const emotes = useEmotes();
  const customEmojiNames = useSelector(customEmojiNamesSelector);
  const compileOptions: CompileOptions = useMemo(() => ({
    availableEmoji: new Set(Object.keys(emotes)),
    emojiImages: emotes,
    customEmojiNames,
  }), [emotes, customEmojiNames]);
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
