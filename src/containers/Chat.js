import { connect } from 'react-redux';

import { chatSelector } from '../selectors/chatSelectors';
import Chat from '../components/Chat';

export default connect(chatSelector)(Chat);
