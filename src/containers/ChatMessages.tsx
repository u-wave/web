import { useCallback, useMemo } from 'react';
import ChatMessages from '../components/Chat/ChatMessages';
import type { CompileOptions } from '../components/Chat/Markup';
import useEmotes from '../hooks/useEmotes';
import useHasRole from '../hooks/useHasRole';
import { useDispatch, useSelector } from '../hooks/useRedux';
import { deleteChatMessage, messagesSelector, motdSelector } from '../reducers/chat';
import { customEmojiNamesSelector } from '../reducers/config';

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
      onDeleteMessage={canDeleteMessages ? onDeleteMessage : undefined}
    />
  );
}

export default ChatMessagesContainer;
