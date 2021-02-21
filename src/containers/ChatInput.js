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

const ChatInput = React.lazy(() => (
  import(/* webpackPreload: true */ '../components/Chat/Input')
));

const {
  useCallback,
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
  const dispatch = useDispatch();
  const onSend = useCallback((message) => dispatch(inputMessage(message)), [dispatch]);

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
