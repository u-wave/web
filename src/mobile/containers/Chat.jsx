import { useSelector } from '../../hooks/useRedux';
import { isLoggedInSelector } from '../../reducers/auth';
import ChatMessages from '../../containers/ChatMessages';
import ChatInput from '../../containers/ChatInput';
import LoginButtons from './LoginButtons';

function ChatContainer() {
  const isLoggedIn = useSelector(isLoggedInSelector);

  return (
    <div className="ChatContainer">
      <div className="ChatContainer-messages">
        <ChatMessages />
      </div>
      <div className="ChatContainer-input ChatInputWrapper">
        {isLoggedIn ? (
          <ChatInput />
        ) : (
          <LoginButtons />
        )}
      </div>
    </div>
  );
}

export default ChatContainer;
