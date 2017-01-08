import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  motdSelector,
  messagesSelector,
  markupCompilerOptionsSelector
} from '../selectors/chatSelectors';

import Chat from '../components/Chat';
import ChatInput from './ChatInput';

const mapStateToProps = createStructuredSelector({
  motd: motdSelector,
  messages: messagesSelector,
  compileOptions: markupCompilerOptionsSelector
});

const ChatMessages = connect(mapStateToProps)(Chat);

// TODO This is UI, so it should probably be moved elsewhere.
const ChatContainer = () => (
  <div className="ChatContainer">
    <div className="ChatContainer-messages">
      <ChatMessages />
    </div>
    <div className="ChatContainer-input ChatInputWrapper">
      <ChatInput />
    </div>
  </div>
);

export default ChatContainer;
