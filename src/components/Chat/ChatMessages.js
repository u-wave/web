import * as React from 'react';

import LogMessage from './LogMessage';
import Message from './Message';
import Motd from './Motd';

export default class ChatMessages extends React.Component {
  static propTypes = {
    messages: React.PropTypes.array,
    motd: React.PropTypes.array,
    canDeleteMessages: React.PropTypes.bool,
    onDeleteMessage: React.PropTypes.func,
    compileOptions: React.PropTypes.shape({
      availableEmoji: React.PropTypes.array,
      emojiImages: React.PropTypes.object
    })
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

  makeDeleteHandler(msg) {
    if (this.props.canDeleteMessages) {
      return () => {
        this.props.onDeleteMessage(msg._id);
      };
    }
    return null;
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

  renderMessage(msg, index) {
    const alternate = index % 2 === 0;
    if (msg.type === 'log') {
      return (
        <LogMessage
          key={msg._id}
          alternate={alternate}
          {...msg}
        />
      );
    }

    return (
      <Message
        key={msg._id}
        alternate={alternate}
        compileOptions={this.props.compileOptions}
        onDelete={this.makeDeleteHandler(msg)}
        {...msg}
      />
    );
  }

  render() {
    return (
      <div className="ChatMessages" ref={this.refContainer}>
        {this.renderMotd()}
        {this.props.messages.map(this.renderMessage, this)}
      </div>
    );
  }
}
