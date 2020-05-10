import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
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

const {
  useCallback,
} = React;

function FooterBarContainer({ className }) {
  const baseEta = useSelector(baseEtaSelector);
  const mediaEndTime = useSelector(endTimeSelector);
  const playlist = useSelector(activePlaylistSelector);
  const nextMedia = useSelector(nextMediaSelector);
  const user = useSelector(currentUserSelector);
  const userInWaitlist = useSelector(userInWaitlistSelector);
  const userIsDJ = useSelector(isCurrentDJSelector);
  const currentDJ = useSelector(djSelector);
  const showSkip = useSelector(canSkipSelector);
  const waitlistIsLocked = useSelector(isLockedSelector);
  const voteStats = useSelector(currentVoteStatsSelector);

  const dispatch = useDispatch();
  const onJoinWaitlist = useCallback(() => dispatch(joinWaitlist()), []);
  const onLeaveWaitlist = useCallback(() => dispatch(leaveWaitlist()), []);
  const onOpenLoginDialog = useCallback(() => dispatch(openLoginDialog()), []);
  const onOpenRegisterDialog = useCallback(() => dispatch(openRegisterDialog()), []);
  const onTogglePlaylistManager = useCallback(() => dispatch(togglePlaylistManager()), []);
  const onToggleSettings = useCallback(() => dispatch(toggleSettings()), []);
  const onSkipTurn = useCallback(() => dispatch(skipSelf()), []);
  const onModSkip = useCallback(() => dispatch(modSkipCurrentDJ()), []);
  const onFavorite = useCallback(() => dispatch(openFavoriteMenu()), []);
  const onUpvote = useCallback(() => dispatch(doUpvote()), []);
  const onDownvote = useCallback(() => dispatch(doDownvote()), []);

  return (
    <FooterBar
      className={className}
      baseEta={baseEta}
      mediaEndTime={mediaEndTime}
      playlist={playlist}
      nextMedia={nextMedia}
      user={user}
      userInWaitlist={userInWaitlist}
      userIsDJ={userIsDJ}
      currentDJ={currentDJ}
      showSkip={showSkip}
      waitlistIsLocked={waitlistIsLocked}
      voteStats={voteStats}
      onJoinWaitlist={onJoinWaitlist}
      onLeaveWaitlist={onLeaveWaitlist}
      onOpenLoginDialog={onOpenLoginDialog}
      onOpenRegisterDialog={onOpenRegisterDialog}
      onTogglePlaylistManager={onTogglePlaylistManager}
      onToggleSettings={onToggleSettings}
      onSkipTurn={onSkipTurn}
      onModSkip={onModSkip}
      onFavorite={onFavorite}
      onUpvote={onUpvote}
      onDownvote={onDownvote}
    />
  );
}

FooterBarContainer.propTypes = {
  className: PropTypes.string,
};

export default FooterBarContainer;
