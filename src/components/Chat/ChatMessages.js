import React from 'react';
import PropTypes from 'prop-types';
import { useListener } from 'react-bus';
import Message from './Message';
import Motd from './Motd';
import ScrollDownNotice from './ScrollDownNotice';
import specialMessages from './specialMessages';

const {
  useCallback,
  useEffect,
  useRef,
  useState,
} = React;

function checkIsScrolledToBottom(el) {
  const lastMessage = el.lastElementChild;
  if (lastMessage) {
    const neededSize = el.scrollTop + el.offsetHeight + lastMessage.offsetHeight;
    return neededSize >= el.scrollHeight - 20;
  }
  return true;
}

function useScrolledToBottom(ref, initialValue = true) {
  const [isScrolledToBottom, setScrolledToBottom] = useState(initialValue);

  const update = useCallback(() => {
    setScrolledToBottom(checkIsScrolledToBottom(ref.current));
  }, [ref]);

  return [isScrolledToBottom, update];
}

function scrollToBottom(el) {
  // eslint-disable-next-line no-param-reassign
  el.scrollTop = el.scrollHeight;
}

function ChatMessages({
  messages,
  motd,
  canDeleteMessages,
  onDeleteMessage,
  compileOptions,
}) {
  const container = useRef(null);
  const [isScrolledToBottom, updateScroll] = useScrolledToBottom(container, true);

  // Scroll to bottom on window resizes, if we were scrolled to bottom before.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleResize = () => {
      if (isScrolledToBottom) {
        scrollToBottom(container.current);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isScrolledToBottom]);

  // Scroll to bottom again if the last message changes.
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : undefined;
  useEffect(() => {
    if (isScrolledToBottom) {
      scrollToBottom(container.current);
    }
    // We need to scroll to the bottom only if a new message comes in, not when the scroll-to-bottom
    // state changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);

  // Accept externally controlled scrolling using the global event bus, so the chat input box
  // can tell us to scroll up or down.
  const handleExternalScroll = useCallback((direction) => {
    const el = container.ref;
    if (direction === 'start') {
      el.scrollTop = 0;
    } else if (direction === 'end') {
      el.scrollTop = el.scrollHeight;
    } else {
      el.scrollTop += direction * 250;
    }
  }, []);

  useListener('chat:scroll', handleExternalScroll);

  function renderMessage(msg) {
    const SpecialMessage = specialMessages[msg.type];
    if (SpecialMessage) {
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
        compileOptions={compileOptions}
        deletable={canDeleteMessages}
        onDelete={onDeleteMessage}
        {...msg}
      />
    );
  }

  return (
    <div
      ref={container}
      className="ChatMessages"
      onScroll={updateScroll}
    >
      <ScrollDownNotice
        show={!isScrolledToBottom}
        onClick={() => scrollToBottom(container.current)}
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

ChatMessages.propTypes = {
  messages: PropTypes.array,
  motd: PropTypes.array,
  canDeleteMessages: PropTypes.bool,
  onDeleteMessage: PropTypes.func,
  compileOptions: PropTypes.shape({
    availableEmoji: PropTypes.array,
    emojiImages: PropTypes.object,
  }),
};

export default ChatMessages;
