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
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  state = getState()

  componentWillUpdate() {
    const el = this.refs.chat;
    const lastMessage = el.lastElementChild;
    if (lastMessage) {
      const neededSize = el.scrollTop + el.offsetHeight + lastMessage.offsetHeight;
      this._isScrolledToBottom = neededSize >= el.scrollHeight - 20;
    } else {
      this._isScrolledToBottom = true;
    }
    debug('willUpdate', this._isScrolledToBottom);
  }

  componentDidUpdate() {
    debug('didUpdate', this._isScrolledToBottom);
    if (this._isScrolledToBottom) {
      const el = this.refs.chat;
      el.scrollTop = el.scrollHeight;
    }
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    return (
      <div className="Chat" ref="chat">
        {this.state.messages.map(msg => <Message key={msg.id} {...msg} />)}
      </div>
    );
  }
}
