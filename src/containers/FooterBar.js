import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { skipSelf } from '../actions/BoothActionCreators';
import { openLoginDialog, openRegisterDialog } from '../actions/DialogActionCreators';
import { togglePlaylistManager, toggleSettings } from '../actions/OverlayActionCreators';
import { joinWaitlist, leaveWaitlist } from '../actions/WaitlistActionCreators';
import { openFavoriteMenu, doUpvote, doDownvote } from '../actions/VoteActionCreators';

import { isCurrentDJSelector, canSkipSelector } from '../selectors/boothSelectors';
import { activePlaylistSelector, nextMediaSelector } from '../selectors/playlistSelectors';
import { currentUserSelector } from '../selectors/userSelectors';
import { etaSelector, userInWaitlistSelector, isLockedSelector } from '../selectors/waitlistSelectors';
import { currentVoteStatsSelector } from '../selectors/voteSelectors';
import FooterBar from '../components/FooterBar';

const mapStateToProps = createStructuredSelector({
  eta: etaSelector,
  playlist: activePlaylistSelector,
  nextMedia: nextMediaSelector,
  user: currentUserSelector,
  userInWaitlist: userInWaitlistSelector,
  userIsDJ: isCurrentDJSelector,
  showSkip: canSkipSelector,
  waitlistIsLocked: isLockedSelector,
  voteStats: currentVoteStatsSelector
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    joinWaitlist, leaveWaitlist,
    openLoginDialog, openRegisterDialog,
    togglePlaylistManager, toggleSettings,
    onSkipTurn: skipSelf,
    onFavorite: openFavoriteMenu,
    onUpvote: doUpvote,
    onDownvote: doDownvote
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class FooterBarContainer extends React.Component {
  render() {
    return <FooterBar {...this.props} />;
  }
}
