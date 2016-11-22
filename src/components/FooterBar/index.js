import cx from 'classnames';
import * as React from 'react';
import { translate } from 'react-i18next';

import NextMedia from './NextMedia';
import UserInfo from './UserInfo';
import SkipButton from './SkipButton';
import WaitlistButton from './WaitlistButton';
import ResponseBar from './Responses/Bar';

@translate()
export default class FooterBar extends React.Component {
  static propTypes = {
    t: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    baseEta: React.PropTypes.number,
    mediaEndTime: React.PropTypes.number,
    nextMedia: React.PropTypes.object,
    playlist: React.PropTypes.object,
    user: React.PropTypes.object,
    userInWaitlist: React.PropTypes.bool.isRequired,
    userIsDJ: React.PropTypes.bool.isRequired,
    currentDJ: React.PropTypes.object,
    showSkip: React.PropTypes.bool,
    waitlistIsLocked: React.PropTypes.bool.isRequired,
    voteStats: React.PropTypes.object,

    openLoginDialog: React.PropTypes.func,
    openRegisterDialog: React.PropTypes.func,
    togglePlaylistManager: React.PropTypes.func,
    toggleSettings: React.PropTypes.func,
    joinWaitlist: React.PropTypes.func,
    leaveWaitlist: React.PropTypes.func,
    onSkipTurn: React.PropTypes.func.isRequired,
    onModSkip: React.PropTypes.func.isRequired,
    onFavorite: React.PropTypes.func,
    onUpvote: React.PropTypes.func,
    onDownvote: React.PropTypes.func
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.handleSkipTurn = this.handleSkipTurn.bind(this);
    this.handleJoinWaitlist = this.handleJoinWaitlist.bind(this);
    this.handleLeaveWaitlist = this.handleLeaveWaitlist.bind(this);
  }

  handleSkipTurn(reason) {
    if (!this.props.showSkip) {
      return null;
    }
    if (!this.props.userIsDJ) {
      return this.props.onModSkip(reason);
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
      t,
      openLoginDialog, openRegisterDialog,
      togglePlaylistManager, toggleSettings,
      onFavorite, onUpvote, onDownvote
    } = this.props;
    const {
      user, userIsDJ, userInWaitlist,
      playlist, nextMedia, showSkip,
      baseEta, mediaEndTime,
      voteStats
    } = this.props;
    const className = cx('FooterBar', this.props.className);

    if (user && !user.isGuest) {
      const canVote = !userIsDJ && !!this.props.currentDJ;
      return (
        <div className={className}>
          <div className="FooterBar-user">
            <UserInfo
              user={user}
              onClick={toggleSettings}
            />
          </div>
          <button
            className="FooterBar-next"
            onClick={togglePlaylistManager}
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
              !showSkip && 'FooterBar-responses--spaced'
            )}
          >
            <ResponseBar
              disabled={!canVote}
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
                onSkip={this.handleSkipTurn}
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
          {t('login.login').toUpperCase()}
        </button>
        <button
          className="FooterAuthButton FooterAuthButton--register"
          onClick={openRegisterDialog}
        >
          {t('login.register').toUpperCase()}
        </button>
        <div className="FooterBar-guest">
          You have to log in if you want to play!
        </div>
      </div>
    );
  }
}
