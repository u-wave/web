import React from 'react';
import { useStore, useSelector } from 'react-redux';
import { useBus } from 'react-bus';
import splitargs from 'splitargs';
import { inputMessage } from '../actions/ChatActionCreators';
import {
  availableGroupMentionsSelector,
  emojiCompletionsSelector,
} from '../selectors/chatSelectors';
import {
  userListSelector,
  isLoggedInSelector,
} from '../selectors/userSelectors';
import commandList from '../utils/commands';
import ChatCommands from '../utils/ChatCommands';

const ChatInput = React.lazy(() => (
  import(/* webpackPreload: true */ '../components/Chat/Input')
));

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
  const availableEmoji = useSelector(emojiCompletionsSelector);
  const store = useStore();
  const { dispatch } = store;
  const commander = useMemo(() => new ChatCommands(store, commandList), [store]);
  const onSend = useCallback((message) => {
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
    dispatch(inputMessage(message));
  }, [commander, dispatch]);

  const bus = useBus();
  const onScroll = useCallback((direction) => {
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
