import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  motdSelector,
  messagesSelector,
  markupCompilerOptionsSelector
} from '../selectors/chatSelectors';

import ChatMessages from '../components/Chat/ChatMessages';

const mapStateToProps = createStructuredSelector({
  motd: motdSelector,
  messages: messagesSelector,
  compileOptions: markupCompilerOptionsSelector
});

export default connect(mapStateToProps)(ChatMessages);
