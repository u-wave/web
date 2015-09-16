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

  componentWillUnmount() {
    ChatStore.removeListener('change', this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    return (
      <div className="Chat">
        {this.state.messages.map(msg => <Message key={msg.id} {...msg} />)}
      </div>
    );
  }
}
