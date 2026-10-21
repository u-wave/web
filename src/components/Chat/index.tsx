import ChatInput from '../../containers/ChatInput';
import ChatMessages from '../../containers/ChatMessages';

function Chat() {
  return (
    <div className="ChatContainer">
      <div className="ChatContainer-messages">
        <ChatMessages />
      </div>
      <div className="ChatContainer-input ChatInputWrapper">
        <ChatInput />
      </div>
    </div>
  );
}

export default Chat;
