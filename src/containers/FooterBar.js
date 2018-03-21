import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { skipSelf } from '../actions/BoothActionCreators';
import { openLoginDialog, openRegisterDialog } from '../actions/DialogActionCreators';
import { skipCurrentDJ as modSkipCurrentDJ } from '../actions/ModerationActionCreators';
import { togglePlaylistManager, toggleSettings } from '../actions/OverlayActionCreators';
import { joinWaitlist, leaveWaitlist } from '../actions/WaitlistActionCreators';
import { openFavoriteMenu, doUpvote, doDownvote } from '../actions/VoteActionCreators';

import {
  djSelector,
  isCurrentDJSelector,
  canSkipSelector,
  endTimeSelector,
} from '../selectors/boothSelectors';
import {
  activePlaylistSelector,
  nextMediaSelector,
} from '../selectors/playlistSelectors';
import { currentUserSelector } from '../selectors/userSelectors';
import {
  baseEtaSelector,
  userInWaitlistSelector,
  isLockedSelector,
} from '../selectors/waitlistSelectors';
import { currentVoteStatsSelector } from '../selectors/voteSelectors';

import FooterBar from '../components/FooterBar';

const mapStateToProps = createStructuredSelector({
  baseEta: baseEtaSelector,
  mediaEndTime: endTimeSelector,
  playlist: activePlaylistSelector,
  nextMedia: nextMediaSelector,
  user: currentUserSelector,
  userInWaitlist: userInWaitlistSelector,
  userIsDJ: isCurrentDJSelector,
  currentDJ: djSelector,
  showSkip: canSkipSelector,
  waitlistIsLocked: isLockedSelector,
  voteStats: currentVoteStatsSelector,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    joinWaitlist,
    leaveWaitlist,
    openLoginDialog,
    openRegisterDialog,
    togglePlaylistManager,
    toggleSettings,
    onSkipTurn: skipSelf,
    onModSkip: modSkipCurrentDJ,
    onFavorite: openFavoriteMenu,
    onUpvote: doUpvote,
    onDownvote: doDownvote,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterBar);
