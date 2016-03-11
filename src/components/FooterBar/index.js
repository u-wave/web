import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import SkipIcon from 'material-ui/lib/svg-icons/av/skip-next';

import NextMedia from './NextMedia';
import UserInfo from './UserInfo';
import ResponseBar from './Responses/Bar';

const fullSize = {
  height: '100%',
  width: '100%'
};

export default class FooterBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    eta: PropTypes.number,
    nextMedia: PropTypes.object,
    playlist: PropTypes.object,
    user: PropTypes.object,
    userInWaitlist: PropTypes.bool,
    userIsDJ: PropTypes.bool,
    showSkip: PropTypes.bool,
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
    onSkipTurn: PropTypes.func.isRequired,
    onFavorite: PropTypes.func,
    onUpvote: PropTypes.func,
    onDownvote: PropTypes.func
  };

  static contextTypes = {
    muiTheme: PropTypes.object
  };

  renderSkipButton() {
    if (!this.props.showSkip) {
      return null;
    }
    return (
      <div className="FooterBar-skip">
        <IconButton
          tooltip="Skip your turn"
          tooltipPosition="top-center"
          style={fullSize}
          onClick={this.props.onSkipTurn}
        >
          <SkipIcon />
        </IconButton>
      </div>
    );
  }

  render() {
    const { rawTheme } = this.context.muiTheme;
    const {
      openLoginDialog, openRegisterDialog,
      togglePlaylistManager, toggleSettings,
      joinWaitlist, leaveWaitlist,
      onFavorite, onUpvote, onDownvote
    } = this.props;
    const {
      user, userInWaitlist, userIsDJ,
      playlist, nextMedia, showSkip,
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
              userIsDJ={userIsDJ}
              eta={eta}
              onClick={togglePlaylistManager}
            />
          </div>
          <div
            className={cx(
              'FooterBar-responses',
              !showSkip && 'FooterBar-responses--spaced'
            )}
          >
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
          {this.renderSkipButton()}
          <FlatButton
            backgroundColor={rawTheme.palette.primary1Color}
            hoverColor={rawTheme.palette.primary2Color}
            rippleColor={rawTheme.palette.primary3Color}
            className="FooterBar-join"
            onClick={() => waitlistAction(user)}
          >
            {waitlistText}
          </FlatButton>
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
