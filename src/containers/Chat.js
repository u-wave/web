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

const ChatContainer = props => (
  <div className="ChatContainer">
    <div className="ChatContainer-messages">
      <Chat {...props} />
    </div>
    <div className="ChatContainer-input ChatInputWrapper">
      <ChatInput />
    </div>
  </div>
);

// Copy propTypes, since all props are passed through.
ChatContainer.propTypes = Chat.propTypes;

export default connect(mapStateToProps)(ChatContainer);
