import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { messagesSelector } from '../selectors/chatSelectors';
import { availableEmojiSelector } from '../selectors/emojiSelectors';
import Chat from '../components/Chat';

const mapStateToProps = createStructuredSelector({
  messages: messagesSelector,
  availableEmoji: availableEmojiSelector
});

export default connect(mapStateToProps)(Chat);
