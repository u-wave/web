import React, { Component } from 'react';
import { connect } from 'react-redux';

import { chatSelector } from '../selectors/chatSelectors';
import Chat from '../components/Chat';

@connect(chatSelector)
export default class ChatContainer extends Component {
  render() {
    return <Chat {...this.props} />;
  }
}
