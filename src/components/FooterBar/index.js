import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

import NextMedia from './NextMedia';
import UserInfo from './UserInfo';
import SkipButton from './SkipButton';
import WaitlistButton from './WaitlistButton';
import ResponseBar from './Responses/Bar';

export default class FooterBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    eta: PropTypes.number,
    nextMedia: PropTypes.object,
    playlist: PropTypes.object,
    user: PropTypes.object,
    userInWaitlist: PropTypes.bool,
    userIsDJ: PropTypes.bool,
    currentDJ: PropTypes.object,
    showSkip: PropTypes.bool,
    waitlistIsLocked: PropTypes.bool,
    voteStats: PropTypes.object,

    openLoginDialog: PropTypes.func,
    openRegisterDialog: PropTypes.func,
    togglePlaylistManager: PropTypes.func,
    toggleSettings: PropTypes.func,
    joinWaitlist: PropTypes.func,
    leaveWaitlist: PropTypes.func,
    onSkipTurn: PropTypes.func.isRequired,
    onModSkip: PropTypes.func.isRequired,
    onFavorite: PropTypes.func,
    onUpvote: PropTypes.func,
    onDownvote: PropTypes.func
  };

  static contextTypes = {
    muiTheme: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.handleSkipTurn = this.handleSkipTurn.bind(this);
    this.handleJoinWaitlist = this.handleJoinWaitlist.bind(this);
    this.handleLeaveWaitlist = this.handleLeaveWaitlist.bind(this);
  }

  handleSkipTurn() {
    if (!this.props.showSkip) {
      return null;
    }
    if (!this.props.userIsDJ) {
      return this.props.onModSkip();
    }
    return this.props.onSkipTurn({ remove: false });
  }

  handleJoinWaitlist() {
    if (this.props.user) {
      return this.props.joinWaitlist(this.props.user);
    }
    return null;
  }

  handleLeaveWaitlist() {
    if (this.props.userIsDJ) {
      return this.props.onSkipTurn({ remove: true });
    } else if (this.props.user) {
      return this.props.leaveWaitlist(this.props.user);
    }
    return null;
  }

  render() {
    const {
      openLoginDialog, openRegisterDialog,
      togglePlaylistManager, toggleSettings,
      onFavorite, onUpvote, onDownvote
    } = this.props;
    const {
      user, userIsDJ, userInWaitlist,
      playlist, nextMedia, showSkip,
      eta,
      voteStats
    } = this.props;
    const className = cx('FooterBar', this.props.className);

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
              {...voteStats}
            />
          </div>
          {this.props.showSkip && (
            <div className="FooterBar-skip">
              <SkipButton
                userIsDJ={userIsDJ}
                currentDJ={this.props.currentDJ}
                onClick={this.handleSkipTurn}
              />
            </div>
          )}
          <WaitlistButton
            isLocked={this.props.waitlistIsLocked}
            userInWaitlist={userInWaitlist}
            onClick={userInWaitlist ? this.handleLeaveWaitlist : this.handleJoinWaitlist}
          />
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
