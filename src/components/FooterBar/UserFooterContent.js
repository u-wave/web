import cx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCurrentUser from '../../hooks/useCurrentUser';
import { skipSelf } from '../../actions/BoothActionCreators';
import { skipCurrentDJ as modSkipCurrentDJ } from '../../actions/ModerationActionCreators';
import { togglePlaylistManager, toggleSettings } from '../../actions/OverlayActionCreators';
import { joinWaitlist, leaveWaitlist } from '../../actions/WaitlistActionCreators';
import { openFavoriteMenu, doUpvote, doDownvote } from '../../actions/VoteActionCreators';
import {
  djSelector,
  isCurrentDJSelector,
  canSkipSelector,
  endTimeSelector,
} from '../../selectors/boothSelectors';
import {
  activePlaylistSelector,
  nextMediaSelector,
} from '../../selectors/playlistSelectors';
import { currentVoteStatsSelector } from '../../selectors/voteSelectors';
import {
  baseEtaSelector,
  userInWaitlistSelector,
  isLockedSelector,
} from '../../selectors/waitlistSelectors';
import NextMedia from './NextMedia';
import UserInfo from './UserInfo';
import SkipButton from './SkipButton';
import WaitlistButton from './WaitlistButton';
import ResponseBar from './Responses/Bar';

const {
  useCallback,
} = React;

function UserFooterContent() {
  const currentUser = useCurrentUser();
  const baseEta = useSelector(baseEtaSelector);
  const mediaEndTime = useSelector(endTimeSelector);
  const playlist = useSelector(activePlaylistSelector);
  const nextMedia = useSelector(nextMediaSelector);
  const userInWaitlist = useSelector(userInWaitlistSelector);
  const userIsDJ = useSelector(isCurrentDJSelector);
  const currentDJ = useSelector(djSelector);
  const showSkip = useSelector(canSkipSelector);
  const waitlistIsLocked = useSelector(isLockedSelector);
  const voteStats = useSelector(currentVoteStatsSelector);
  const dispatch = useDispatch();
  const handleTogglePlaylistManager = useCallback(() => {
    dispatch(togglePlaylistManager());
  }, [dispatch]);
  const handleToggleSettings = useCallback(() => {
    dispatch(toggleSettings());
  }, [dispatch]);
  const handleFavorite = useCallback((position) => {
    dispatch(openFavoriteMenu(position));
  }, [dispatch]);
  const handleUpvote = useCallback(() => {
    dispatch(doUpvote());
  }, [dispatch]);
  const handleDownvote = useCallback(() => {
    dispatch(doDownvote());
  }, [dispatch]);

  const handleSkipTurn = useCallback((reason) => {
    if (!userIsDJ) {
      return dispatch(modSkipCurrentDJ(reason));
    }
    return dispatch(skipSelf({ remove: false }));
  }, [userIsDJ, dispatch]);

  const handleJoinWaitlist = useCallback(() => {
    dispatch(joinWaitlist(currentUser));
  }, [dispatch, currentUser]);
  const handleLeaveWaitlist = useCallback(() => {
    if (userIsDJ) {
      return dispatch(skipSelf({ remove: true }));
    }
    return dispatch(leaveWaitlist(currentUser));
  }, [userIsDJ, dispatch, currentUser]);

  const canVote = !userIsDJ && !!currentDJ;

  return (
    <>
      <div className="FooterBar-user">
        <UserInfo
          user={currentUser}
          onClick={handleToggleSettings}
        />
      </div>
      <button
        type="button"
        className="FooterBar-next"
        onClick={handleTogglePlaylistManager}
      >
        <NextMedia
          playlist={playlist}
          nextMedia={nextMedia}
          userInWaitlist={userInWaitlist}
          userIsDJ={userIsDJ}
          baseEta={baseEta}
          mediaEndTime={mediaEndTime}
        />
      </button>
      <div
        className={cx(
          'FooterBar-responses',
          !showSkip && 'FooterBar-responses--spaced',
        )}
      >
        <ResponseBar
          disabled={!canVote}
          onFavorite={handleFavorite}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
          {...voteStats}
        />
      </div>
      {showSkip && (
        <div className="FooterBar-skip">
          <SkipButton
            userIsDJ={userIsDJ}
            currentDJ={currentDJ}
            onSkip={handleSkipTurn}
          />
        </div>
      )}
      <div className="FooterBar-join">
        <WaitlistButton
          isLocked={waitlistIsLocked}
          userInWaitlist={userInWaitlist}
          onClick={userInWaitlist ? handleLeaveWaitlist : handleJoinWaitlist}
        />
      </div>
    </>
  );
}

export default UserFooterContent;
