import { applyTheme } from '../actions/SettingsActionCreators';
import { doUpvote, doDownvote } from '../actions/VoteActionCreators';
import { bindActionCreators } from 'redux';

export default function createApis({ dispatch }) {
  return bindActionCreators({
    applyTheme,
    upvote: doUpvote,
    downvote: doDownvote
  }, dispatch);
}
