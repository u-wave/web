import React from 'react';
import PropTypes from 'prop-types';
import LogMessage from './LogMessage';
import Message from './Message';
import Motd from './Motd';
import ScrollDownNotice from './ScrollDownNotice';

export default class ChatMessages extends React.Component {
  static propTypes = {
    messages: PropTypes.array,
    motd: PropTypes.array,
    canDeleteMessages: PropTypes.bool,
    onDeleteMessage: PropTypes.func,
    compileOptions: PropTypes.shape({
      availableEmoji: PropTypes.array,
      emojiImages: PropTypes.object
    })
  };

  state = {
    isScrolledToBottom: true
  };

  componentDidMount() {
    this.scrollToBottom();
    this.shouldScrollToBottom = false;

    // A window resize may affect the available space.
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillReceiveProps() {
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
    if (this.state.isScrolledToBottom) {
      this.scrollToBottom();
    }
  };

  handleScroll = () => {
    this.setState({
      isScrolledToBottom: this.isScrolledToBottom()
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
    if (!this.props.motd) {
      return null;
    }
    return (
      <Motd compileOptions={this.props.compileOptions}>
        {this.props.motd}
      </Motd>
    );
  }

  renderMessage(msg) {
    if (msg.type === 'log') {
      return (
        <LogMessage
          key={msg._id}
          {...msg}
        />
      );
    }

    return (
      <Message
        key={msg._id}
        compileOptions={this.props.compileOptions}
        deletable={this.props.canDeleteMessages}
        onDelete={this.props.onDeleteMessage}
        {...msg}
      />
    );
  }

  render() {
    const { isScrolledToBottom } = this.state;

    return (
      <div
        ref={this.refContainer}
        className="ChatMessages"
        onScroll={this.handleScroll}
      >
        <ScrollDownNotice
          show={!isScrolledToBottom}
          onClick={this.handleScrollToBottom}
        />
        {this.renderMotd()}
        {this.props.messages.map(this.renderMessage, this)}
      </div>
    );
  }
}
