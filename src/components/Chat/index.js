import * as React from 'react';

import LogMessage from './LogMessage';
import Message from './Message';
import Motd from './Motd';

export default class Chat extends React.Component {
  static propTypes = {
    messages: React.PropTypes.array,
    motd: React.PropTypes.array,
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

  renderMessage(msg) {
    if (msg.type === 'log') {
      return <LogMessage key={msg._id} {...msg} />;
    }
    return (
      <Message
        key={msg._id}
        compileOptions={this.props.compileOptions}
        {...msg}
      />
    );
  }

  render() {
    return (
      <div className="Chat" ref={this.refContainer}>
        {this.renderMotd()}
        {this.props.messages.map(this.renderMessage, this)}
      </div>
    );
  }
}
