import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  messagesSelector,
  markupCompilerOptionsSelector
} from '../selectors/chatSelectors';
import Chat from '../components/Chat';

const mapStateToProps = createStructuredSelector({
  messages: messagesSelector,
  compileOptions: markupCompilerOptionsSelector
});

export default connect(mapStateToProps)(Chat);
