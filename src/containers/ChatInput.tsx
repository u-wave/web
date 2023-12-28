import React from 'react';
import { useBus } from 'react-bus';
import splitargs from 'splitargs';
import { useDispatch, useStore, useSelector } from '../hooks/useRedux';
import { sendChat } from '../actions/ChatActionCreators';
import { availableGroupMentionsSelector } from '../selectors/chatSelectors';
import { isLoggedInSelector } from '../reducers/auth';
import { userListSelector } from '../reducers/users';
import commandList from '../utils/commands';
import ChatCommands from '../utils/ChatCommands';
import useEmotes from '../hooks/useEmotes';

const ChatInput = React.lazy(() => import('../components/Chat/Input'));

const {
  useCallback,
  useMemo,
  Suspense,
} = React;

const inactiveChatInput = (
  <div className="ChatInput">
    <input className="ChatInput-input" type="text" disabled />
  </div>
);

function ChatInputContainer() {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const mentionableUsers = useSelector(userListSelector);
  const mentionableGroups = useSelector(availableGroupMentionsSelector);
  const emotes = useEmotes();
  const availableEmoji = useMemo(() => {
    return Object.entries(emotes).map(([shortcode, url]) => ({
      shortcode,
      image: url,
    }));
  }, [emotes]);
  const dispatch = useDispatch();
  const store = useStore();
  const commander = useMemo(() => new ChatCommands(store, commandList), [store]);
  const onSend = useCallback((message: string) => {
    if (message.startsWith('/')) {
      const [command, ...params] = splitargs(message.slice(1));
      if (command) {
        const result = commander.execute(command, params);
        if (result) {
          dispatch(result);
        }
        return;
      }
    }
    dispatch(sendChat(message));
  }, [commander, dispatch]);

  const bus = useBus();
  const onScroll = useCallback((direction: unknown) => {
    bus.emit('chat:scroll', direction);
  }, [bus]);

  if (isLoggedIn) {
    return (
      <Suspense fallback={inactiveChatInput}>
        <ChatInput
          mentionableUsers={mentionableUsers}
          mentionableGroups={mentionableGroups}
          availableEmoji={availableEmoji}
          onSend={onSend}
          onScroll={onScroll}
        />
      </Suspense>
    );
  }

  return null;
}

export default ChatInputContainer;
