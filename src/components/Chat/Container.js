import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chat from './index';

function mapStateToProps(state) {
  return {
    messages: state.chat.messages.map(message => ({
      ...message,
      user: state.users[message.userID]
    }))
  };
}

@connect(mapStateToProps)
export default class ChatContainer extends Component {
  render() {
    return <Chat {...this.props} />;
  }
}
