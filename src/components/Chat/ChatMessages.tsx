import React, { createContext, use } from 'react';
import { useListener } from 'react-bus';
import type { MarkupNode } from 'u-wave-parse-chat-markup';
import type { Message as TMessage } from '../../reducers/chat';
import ScrollDownNotice from './ScrollDownNotice';
import { CompileOptionsContext, type CompileOptions } from './Markup';
import ChatMessage from './Message';
import LogMessage from './LogMessage';
import Motd from './Motd';
import SkipMessage from './NotificationMessages/SkipMessage';
import JoinMessage from './NotificationMessages/JoinMessage';
import LeaveMessage from './NotificationMessages/LeaveMessage';
import NameChangedMessage from './NotificationMessages/NameChangedMessage';
import NowPlayingMessage from './NotificationMessages/NowPlayingMessage';
import RoleUpdateMessage from './NotificationMessages/RoleUpdateMessage';

const {
  useCallback,
  useEffect,
  useRef,
  useState,
} = React;

function checkIsScrolledToBottom(el: HTMLElement) {
  const lastMessage = el.lastElementChild;
  if (lastMessage instanceof HTMLElement) {
    const neededSize = el.scrollTop + el.offsetHeight + lastMessage.offsetHeight;
    return neededSize >= el.scrollHeight - 20;
  }
  return true;
}

function useScrolledToBottom(ref: React.RefObject<HTMLElement | null>, initialValue = true) {
  const [isScrolledToBottom, setScrolledToBottom] = useState(initialValue);

  const update = useCallback(() => {
    if (ref.current) {
      setScrolledToBottom(checkIsScrolledToBottom(ref.current));
    }
  }, [ref]);

  return [isScrolledToBottom, update] satisfies [unknown, unknown];
}

function scrollToBottom(el: HTMLElement) {
  el.scrollTop = el.scrollHeight;
}

interface ChatMessageContext {
  onDeleteMessage: undefined | ((id: string) => void);
}
const ChatMessageContext = createContext<ChatMessageContext>({
  onDeleteMessage: undefined,
});

type MessageProps = {
  message: TMessage,
};
function Message({ message: msg }: MessageProps) {
  switch (msg.type) {
    case 'chat': {
      const { onDeleteMessage } = use(ChatMessageContext);
      return (
        <ChatMessage
          _id={msg._id}
          user={msg.user}
          text={msg.text}
          parsedText={msg.parsedText}
          inFlight={msg.inFlight}
          isMention={msg.isMention}
          timestamp={msg.timestamp}
          onDelete={onDeleteMessage}
        />
      );
    }
    case 'log':
      return <LogMessage text={msg.text} />;
    case 'nowPlaying':
      return <NowPlayingMessage entry={msg.entry} timestamp={msg.timestamp} />;
    case 'skip':
      return (
        <SkipMessage
          user={msg.user}
          moderator={msg.moderator}
          reason={msg.reason}
          timestamp={msg.timestamp}
        />
      );
    case 'userJoin':
      return <JoinMessage user={msg.user} timestamp={msg.timestamp} />;
    case 'userLeave':
      return <LeaveMessage user={msg.user} timestamp={msg.timestamp} />;
    case 'userNameChanged':
      return (
        <NameChangedMessage
          user={msg.user}
          newUsername={msg.newUsername}
          timestamp={msg.timestamp}
        />
      );
    case 'roleUpdate':
      return (
        <RoleUpdateMessage
          user={msg.user}
          updateType={msg.updateType}
          roles={msg.roles}
          timestamp={msg.timestamp}
        />
      );
  }
}

type ChatMessagesProps = {
  motd: MarkupNode[] | null,
  messages: TMessage[],
  onDeleteMessage?: (id: string) => void,
  compileOptions: CompileOptions,
};
function ChatMessages({
  messages,
  motd,
  onDeleteMessage,
  compileOptions,
}: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolledToBottom, updateScroll] = useScrolledToBottom(containerRef, true);

  // Scroll to bottom on window resizes, if we were scrolled to bottom before.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleResize = () => {
      if (isScrolledToBottom && containerRef.current) {
        scrollToBottom(containerRef.current);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isScrolledToBottom]);

  // Scroll to bottom again if the last message changes.
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : undefined;
  // Use a ref to avoid triggering the effect repeatedly when scrolling _up_ from the bottom.
  // TODO: This can probably nowadays be improved with `useEffectEvent`?
  const scrolledToBottomRef = useRef(isScrolledToBottom);
  useEffect(() => {
    scrolledToBottomRef.current = isScrolledToBottom;
  }, [isScrolledToBottom]);
  useEffect(() => {
    if (scrolledToBottomRef.current && containerRef.current) {
      scrollToBottom(containerRef.current);
    }
  }, [lastMessage]);

  // Accept externally controlled scrolling using the global event bus, so the chat input box
  // can tell us to scroll up or down.
  const handleExternalScroll = useCallback((arg: unknown) => {
    const direction = arg as number | 'start' | 'end';
    const el = containerRef.current;
    if (!el || direction == null) {
      return;
    }

    if (direction === 'start') {
      el.scrollTop = 0;
    } else if (direction === 'end') {
      el.scrollTop = el.scrollHeight;
    } else {
      el.scrollTop += direction * 250;
    }
  }, []);

  useListener('chat:scroll', handleExternalScroll);

  const compileOptionsWithDefaults: Required<CompileOptions> = {
    availableEmoji: new Set(),
    customEmojiNames: new Set(),
    emojiImages: {},
    ...compileOptions,
  };

  return (
    <CompileOptionsContext value={compileOptionsWithDefaults}>
      <div
        ref={containerRef}
        className="ChatMessages"
        onScroll={updateScroll}
      >
        <ScrollDownNotice
          show={!isScrolledToBottom}
          onClick={() => containerRef.current && scrollToBottom(containerRef.current)}
        />
        {motd ? (
          <Motd>
            {motd}
          </Motd>
        ) : null}
        <ChatMessageContext value={{ onDeleteMessage }}>
          {messages.map((message) => <Message key={message._id} message={message} />)}
        </ChatMessageContext>
      </div>
    </CompileOptionsContext>
  );
}

export default ChatMessages;
