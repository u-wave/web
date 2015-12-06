import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chat from './index';

function mapStateToProps(state) {
  return {
    messages: state.chat.messages
  };
}

@connect(mapStateToProps)
export default class ChatContainer extends Component {
  render() {
    return <Chat {...this.props} />;
  }
}
