import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from '../hooks/useRedux';
import {
  motdSelector,
  messagesSelector,
  canDeleteMessagesSelector,
} from '../selectors/chatSelectors';
import { customEmojiNamesSelector } from '../selectors/configSelectors';
import { deleteChatMessage } from '../actions/ModerationActionCreators';
import ChatMessages from '../components/Chat/ChatMessages';
import useEmotes from '../hooks/useEmotes';
import { CompileOptions } from '../components/Chat/Markup';

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
