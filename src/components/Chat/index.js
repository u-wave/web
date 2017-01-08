import * as React from 'react';
import ChatMessages from '../../containers/ChatMessages';
import ChatInput from '../../containers/ChatInput';

const Chat = () => (
  <div className="ChatContainer">
    <div className="ChatContainer-messages">
      <ChatMessages />
    </div>
    <div className="ChatContainer-input ChatInputWrapper">
      <ChatInput />
    </div>
  </div>
);

export default Chat;
