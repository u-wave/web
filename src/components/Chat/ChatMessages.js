import React from 'react';
import PropTypes from 'prop-types';
import { useListener } from 'react-bus';
import Message from './Message';
import Motd from './Motd';
import ScrollDownNotice from './ScrollDownNotice';
import specialMessages from './specialMessages';

function ListenerProxy({ onScroll }) {
  useListener('chat:scroll', onScroll);
  return null;
}

ListenerProxy.propTypes = {
  onScroll: PropTypes.func.isRequired,
};

export default class ChatMessages extends React.Component {
  static propTypes = {
    messages: PropTypes.array,
    motd: PropTypes.array,
    canDeleteMessages: PropTypes.bool,
    onDeleteMessage: PropTypes.func,
    compileOptions: PropTypes.shape({
      availableEmoji: PropTypes.array,
      emojiImages: PropTypes.object,
    }),
  };

  state = {
    isScrolledToBottom: true,
  };

  componentDidMount() {
    this.scrollToBottom();
    this.shouldScrollToBottom = false;

    // A window resize may affect the available space.
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
    }
  }

  // This usually means that new messages came in;
  // either way it does not hurt to run this multiple times
  // so it is safe to use.
  // eslint-disable-next-line camelcase, react/sort-comp
  UNSAFE_componentWillReceiveProps() {
    this.shouldScrollToBottom = this.isScrolledToBottom();
  }

  componentDidUpdate() {
    // Keep the chat scrolled to the bottom after a new message is addded.
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  onExternalScroll = (direction) => {
    const el = this.container;
    if (direction === 'start') {
      el.scrollTop = 0;
    } else if (direction === 'end') {
      el.scrollTop = el.scrollHeight;
    } else {
      el.scrollTop += direction * 250;
    }
  };

  scrollToBottom() {
    const el = this.container;
    el.scrollTop = el.scrollHeight;
  }

  isScrolledToBottom() {
    const el = this.container;
    const lastMessage = el.lastElementChild;
    if (lastMessage) {
      const neededSize = el.scrollTop + el.offsetHeight + lastMessage.offsetHeight;
      return neededSize >= el.scrollHeight - 20;
    }
    return true;
  }

  handleResize = () => {
    const { isScrolledToBottom } = this.state;

    if (isScrolledToBottom) {
      this.scrollToBottom();
    }
  };

  handleScroll = () => {
    this.setState({
      isScrolledToBottom: this.isScrolledToBottom(),
    });
  };

  handleScrollToBottom = (event) => {
    event.preventDefault();
    this.scrollToBottom();
  };

  refContainer = (container) => {
    this.container = container;
  };

  renderMotd() {
    const { motd, compileOptions } = this.props;

    if (!motd) {
      return null;
    }
    return (
      <Motd compileOptions={compileOptions}>
        {motd}
      </Motd>
    );
  }

  renderMessage(msg) {
    const { compileOptions, canDeleteMessages, onDeleteMessage } = this.props;

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

  render() {
    const { messages } = this.props;
    const { isScrolledToBottom } = this.state;

    return (
      <div
        ref={this.refContainer}
        className="ChatMessages"
        onScroll={this.handleScroll}
      >
        <ListenerProxy onScroll={this.onExternalScroll} />
        <ScrollDownNotice
          show={!isScrolledToBottom}
          onClick={this.handleScrollToBottom}
        />
        {this.renderMotd()}
        {messages.map(this.renderMessage, this)}
      </div>
    );
  }
}
