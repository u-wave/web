import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from '../hooks/useRedux';
import { deleteChatMessage, motdSelector, messagesSelector } from '../reducers/chat';
import { customEmojiNamesSelector } from '../reducers/config';
import ChatMessages from '../components/Chat/ChatMessages';
import useEmotes from '../hooks/useEmotes';
import type { CompileOptions } from '../components/Chat/Markup';
import useHasRole from '../hooks/useHasRole';

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
  const canDeleteMessages = useHasRole('chat.delete');
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
