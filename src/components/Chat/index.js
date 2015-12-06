import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Message from './Message';

function mapStateToProps(state) {
  return {
    messages: state.chat.messages
  };
}

@connect(mapStateToProps)
export default class Chat extends Component {
  static propTypes = {
    messages: PropTypes.array
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

  render() {
    return (
      <div className="Chat" ref="chat">
        {this.props.messages.map(msg => <Message key={msg._id} {...msg} />)}
      </div>
    );
  }
}
