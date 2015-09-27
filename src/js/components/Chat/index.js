import React from 'react';
import ChatStore from '../../stores/ChatStore';
import Message from './Message';

function getState() {
  return {
    messages: ChatStore.getMessages()
  };
}

export default class Chat extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  state = getState()

  componentDidMount() {
    ChatStore.on('change', this.onChange);
  }

  componentWillUpdate() {
    const el = React.findDOMNode(this.refs.chat);
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
      const el = React.findDOMNode(this.refs.chat);
      el.scrollTop = el.scrollHeight;
    }
  }

  componentWillUnmount() {
    ChatStore.removeListener('change', this.onChange);
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
