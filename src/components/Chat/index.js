import React, { Component, PropTypes } from 'react';

import LogMessage from './LogMessage';
import Message from './Message';

export default class Chat extends Component {
  static propTypes = {
    messages: PropTypes.array,
    availableEmoji: PropTypes.array
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentWillUpdate() {
    this._isScrolledToBottom = this.isScrolledToBottom();
  }

  componentDidUpdate() {
    if (this._isScrolledToBottom) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    const el = this.refs.chat;
    el.scrollTop = el.scrollHeight;
  }

  isScrolledToBottom() {
    const el = this.refs.chat;
    const lastMessage = el.lastElementChild;
    if (lastMessage) {
      const neededSize = el.scrollTop + el.offsetHeight + lastMessage.offsetHeight;
      return neededSize >= el.scrollHeight - 20;
    }
    return true;
  }

  renderMessage(msg) {
    if (msg.type === 'log') {
      return <LogMessage key={msg._id} {...msg} />;
    }
    return (
      <Message
        key={msg._id}
        availableEmoji={this.props.availableEmoji}
        {...msg}
      />
    );
  }

  render() {
    return (
      <div className="Chat" ref="chat">
        {this.props.messages.map(this.renderMessage, this)}
      </div>
    );
  }
}
