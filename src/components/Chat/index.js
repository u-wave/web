import React from 'react';
import ChatStore from '../../stores/ChatStore';
import listen from '../../utils/listen';
import Message from './Message';

function getState() {
  return {
    messages: ChatStore.getMessages()
  };
}

@listen(ChatStore)
export default class Chat extends React.Component {
  state = getState();

  componentWillUpdate() {
    this._isScrolledToBottom = this.isScrolledToBottom();
  }

  componentDidUpdate() {
    if (this._isScrolledToBottom) {
      const el = this.refs.chat;
      el.scrollTop = el.scrollHeight;
    }
  }

  onChange() {
    this.setState(getState());
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

  render() {
    return (
      <div className="Chat" ref="chat">
        {this.state.messages.map(msg => <Message key={msg._id} {...msg} />)}
      </div>
    );
  }
}
