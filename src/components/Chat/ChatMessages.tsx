import React from 'react';
import { useListener } from 'react-bus';
import type { MarkupNode } from 'u-wave-parse-chat-markup';
import Message from './Message';
import Motd from './Motd';
import ScrollDownNotice from './ScrollDownNotice';
import specialMessages from './specialMessages';
import type { Message as TMessage } from '../../reducers/chat';
import type { CompileOptions } from './Markup';

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

type ChatMessagesProps = {
  motd: MarkupNode[] | null,
  messages: TMessage[],
  canDeleteMessages?: boolean,
  onDeleteMessage?: (id: string) => void,
  compileOptions: CompileOptions,
};
function ChatMessages({
  messages,
  motd,
  canDeleteMessages = false,
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

  function renderMessage(msg: TMessage) {
    if (msg.type !== 'chat') {
      // TODO this could just use a switch
      const SpecialMessage = specialMessages[msg.type] as React.FC<unknown>;
      return (
        <SpecialMessage
          key={msg._id}
          {...msg}
        />
      );
    }

    return (
      <Message
        key={msg._id}
        _id={msg._id}
        user={msg.user}
        text={msg.text}
        parsedText={msg.parsedText}
        inFlight={msg.inFlight}
        isMention={msg.isMention}
        timestamp={msg.timestamp}
        compileOptions={compileOptions}
        deletable={canDeleteMessages}
        onDelete={onDeleteMessage}
      />
    );
  }

  return (
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
        <Motd compileOptions={compileOptions}>
          {motd}
        </Motd>
      ) : null}
      {messages.map(renderMessage)}
    </div>
  );
}

export default ChatMessages;
