import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  inputMessage
} from '../actions/ChatActionCreators';
import {
  availableGroupMentionsSelector,
  emojiCompletionsSelector
} from '../selectors/chatSelectors';
import {
  userListSelector,
  isLoggedInSelector
} from '../selectors/userSelectors';

import ChatInput from '../components/Chat/Input';

const mapStateToProps = createStructuredSelector({
  isLoggedIn: isLoggedInSelector,
  mentionableUsers: userListSelector,
  mentionableGroups: availableGroupMentionsSelector,
  availableEmoji: emojiCompletionsSelector
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onSend: inputMessage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
