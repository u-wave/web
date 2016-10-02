import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  motdSelector,
  messagesSelector,
  markupCompilerOptionsSelector
} from '../selectors/chatSelectors';
import {
  deleteChatMessage
} from '../actions/ModerationActionCreators';

import ChatMessages from '../components/Chat/ChatMessages';

const mapStateToProps = createStructuredSelector({
  motd: motdSelector,
  messages: messagesSelector,
  compileOptions: markupCompilerOptionsSelector
});

const mapDispatchToProps = {
  onDeleteMessage: deleteChatMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessages);
