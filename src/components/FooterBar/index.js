import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import NextMedia from './NextMedia';
import UserInfo from './UserInfo';
import ResponseBar from './Responses/Bar';

export default class FooterBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    eta: PropTypes.number,
    nextMedia: PropTypes.object,
    playlist: PropTypes.object,
    user: PropTypes.object,
    userInWaitlist: PropTypes.bool,
    isFavorite: PropTypes.bool,
    favoritesCount: PropTypes.number,
    isUpvote: PropTypes.bool,
    upvotesCount: PropTypes.number,
    isDownvote: PropTypes.bool,
    downvotesCount: PropTypes.number,

    openLoginDialog: PropTypes.func,
    openRegisterDialog: PropTypes.func,
    togglePlaylistManager: PropTypes.func,
    toggleSettings: PropTypes.func,
    joinWaitlist: PropTypes.func,
    leaveWaitlist: PropTypes.func,
    onFavorite: PropTypes.func,
    onUpvote: PropTypes.func,
    onDownvote: PropTypes.func
  };

  render() {
    const {
      openLoginDialog, openRegisterDialog,
      togglePlaylistManager, toggleSettings,
      joinWaitlist, leaveWaitlist,
      onFavorite, onUpvote, onDownvote
    } = this.props;
    const {
      user, userInWaitlist,
      playlist, nextMedia,
      eta,
      isFavorite, isUpvote, isDownvote,
      favoritesCount, upvotesCount, downvotesCount
    } = this.props;
    const className = cx('FooterBar', this.props.className);

    const waitlistAction = userInWaitlist ? leaveWaitlist : joinWaitlist;
    const waitlistText = userInWaitlist ? 'Leave Waitlist' : 'Join Waitlist';

    if (user && !user.isGuest) {
      return (
        <div className={className}>
          <div className="FooterBar-user">
            <UserInfo
              user={user}
              onClick={toggleSettings}
            />
          </div>
          <div className="FooterBar-next">
            <NextMedia
              playlist={playlist}
              nextMedia={nextMedia}
              eta={eta}
              onClick={togglePlaylistManager}
            />
          </div>
          <div className="FooterBar-responses">
            <ResponseBar
              onFavorite={onFavorite}
              onUpvote={onUpvote}
              onDownvote={onDownvote}
              isFavorite={isFavorite}
              favoritesCount={favoritesCount}
              isUpvote={isUpvote}
              upvotesCount={upvotesCount}
              isDownvote={isDownvote}
              downvotesCount={downvotesCount}
            />
          </div>
          <div
            className="FooterBar-join"
            onClick={() => waitlistAction(user)}
          >
            {waitlistText}
          </div>
        </div>
      );
    }
    return (
      <div className={className}>
        <button
          className="FooterAuthButton FooterAuthButton--login"
          onClick={openLoginDialog}
        >
          SIGN IN
        </button>
        <button
          className="FooterAuthButton FooterAuthButton--register"
          onClick={openRegisterDialog}
        >
          REGISTER
        </button>
        <div className="FooterBar-guest">
          You have to log in if you want to play!
        </div>
      </div>
    );
  }
}
