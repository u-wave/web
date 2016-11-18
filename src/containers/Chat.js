import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  inputMessage
} from '../actions/ChatActionCreators';
import {
  motdSelector,
  messagesSelector,
  markupCompilerOptionsSelector,
  availableGroupMentionsSelector,
  emojiCompletionsSelector
} from '../selectors/chatSelectors';
import {
  userListSelector,
  isLoggedInSelector
} from '../selectors/userSelectors';

import Chat from '../components/Chat';
import ChatInput from '../components/Chat/Input';

const mapStateToProps = createStructuredSelector({
  motd: motdSelector,
  messages: messagesSelector,
  compileOptions: markupCompilerOptionsSelector,
  isLoggedIn: isLoggedInSelector,
  mentionableUsers: userListSelector,
  mentionableGroups: availableGroupMentionsSelector,
  availableEmoji: emojiCompletionsSelector
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onSend: inputMessage
}, dispatch);

const ChatContainer = ({
  mentionableUsers,
  mentionableGroups,
  availableEmoji,
  isLoggedIn,
  onSend,
  ...props
}) => (
  <div className="ChatContainer">
    <div className="ChatContainer-messages">
      <Chat {...props} />
    </div>
    <div className="ChatContainer-input ChatInputWrapper">
      {isLoggedIn && (
        <ChatInput
          onSend={onSend}
          mentionableUsers={mentionableUsers}
          mentionableGroups={mentionableGroups}
          availableEmoji={availableEmoji}
        />
      )}
    </div>
  </div>
);

ChatContainer.propTypes = {
  mentionableUsers: React.PropTypes.array.isRequired,
  mentionableGroups: React.PropTypes.array.isRequired,
  availableEmoji: React.PropTypes.array.isRequired,
  isLoggedIn: React.PropTypes.bool.isRequired,
  onSend: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
