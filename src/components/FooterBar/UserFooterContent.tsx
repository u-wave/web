import cx from 'clsx';
import { useCallback } from 'react';
import { useDispatch, useSelector } from '../../hooks/useRedux';
import { toggleOverlay } from '../../reducers/activeOverlay';
import { openFavoriteMenu } from '../../reducers/addToPlaylistMenu';
import {
  skipSelf,
  skipCurrentDJ as modSkipCurrentDJ,
  upvote,
  downvote,
  djSelector,
  endTimeSelector,
  historyIDSelector,
  isCurrentDJSelector,
  currentVoteStatsSelector,
  canSkipSelector,
} from '../../reducers/booth';
import { activePlaylistSelector, nextMediaSelector } from '../../reducers/playlists';
import {
  joinWaitlist,
  leaveWaitlist,
  baseEtaSelector,
  userInWaitlistSelector,
  waitlistIsLockedSelector,
} from '../../reducers/waitlist';
import NextMedia from './NextMedia';
import UserInfo from './UserInfo';
import SkipButton from './SkipButton';
import WaitlistButton from './WaitlistButton';
import ResponseBar from './ResponseBar';
import type { User } from '../../reducers/users';

type UserFooterContentProps = {
  user: User,
};
function UserFooterContent({ user: currentUser }: UserFooterContentProps) {
  const baseEta = useSelector(baseEtaSelector);
  const mediaEndTime = useSelector(endTimeSelector);
  const playlist = useSelector(activePlaylistSelector);
  const nextMedia = useSelector(nextMediaSelector);
  const userInWaitlist = useSelector(userInWaitlistSelector);
  const userIsDJ = useSelector(isCurrentDJSelector);
  const currentDJ = useSelector(djSelector);
  const historyID = useSelector(historyIDSelector);
  const showSkip = useSelector(canSkipSelector);
  const waitlistIsLocked = useSelector(waitlistIsLockedSelector);
  const voteStats = useSelector(currentVoteStatsSelector);
  const dispatch = useDispatch();
  const handleTogglePlaylistManager = useCallback(() => {
    dispatch(toggleOverlay('playlistManager'));
  }, [dispatch]);
  const handleToggleSettings = useCallback(() => {
    dispatch(toggleOverlay('settings'));
  }, [dispatch]);
  const handleFavorite = useCallback((position: { x: number, y: number }) => {
    if (historyID != null) {
      dispatch(openFavoriteMenu(historyID, position));
    }
  }, [historyID, dispatch]);
  const handleUpvote = useCallback(() => {
    if (historyID != null) {
      dispatch(upvote({ historyID }));
    }
  }, [dispatch, historyID]);
  const handleDownvote = useCallback(() => {
    if (historyID != null) {
      dispatch(downvote({ historyID }));
    }
  }, [dispatch, historyID]);

  const handleSkipTurn = useCallback((reason: string) => {
    if (!userIsDJ) {
      return dispatch(modSkipCurrentDJ({ reason }));
    }
    return dispatch(skipSelf({ remove: false }));
  }, [userIsDJ, dispatch]);

  const handleJoinWaitlist = useCallback(() => {
    dispatch(joinWaitlist()).catch(() => {
      // error is already reported
    });
  }, [dispatch]);
  const handleLeaveWaitlist = useCallback(() => {
    if (userIsDJ) {
      return dispatch(skipSelf({ remove: true }));
    }
    return dispatch(leaveWaitlist());
  }, [userIsDJ, dispatch]);

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
          userIsDJ={userIsDJ}
          userInWaitlist={userInWaitlist}
          onClick={userInWaitlist ? handleLeaveWaitlist : handleJoinWaitlist}
        />
      </div>
    </>
  );
}

export default UserFooterContent;
