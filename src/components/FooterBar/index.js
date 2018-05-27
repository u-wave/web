import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import NextMedia from './NextMedia';
import UserInfo from './UserInfo';
import SkipButton from './SkipButton';
import WaitlistButton from './WaitlistButton';
import ResponseBar from './Responses/Bar';

const enhance = translate();

class FooterBar extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    className: PropTypes.string,
    baseEta: PropTypes.number,
    mediaEndTime: PropTypes.number,
    nextMedia: PropTypes.object,
    playlist: PropTypes.object,
    user: PropTypes.object,
    userInWaitlist: PropTypes.bool.isRequired,
    userIsDJ: PropTypes.bool.isRequired,
    currentDJ: PropTypes.object,
    showSkip: PropTypes.bool,
    waitlistIsLocked: PropTypes.bool.isRequired,
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
    onDownvote: PropTypes.func,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  handleSkipTurn = (reason) => {
    if (!this.props.showSkip) {
      return null;
    }
    if (!this.props.userIsDJ) {
      return this.props.onModSkip(reason);
    }
    return this.props.onSkipTurn({ remove: false });
  }

  handleJoinWaitlist = () => {
    if (this.props.user) {
      return this.props.joinWaitlist(this.props.user);
    }
    return null;
  }

  handleLeaveWaitlist = () => {
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
      onFavorite, onUpvote, onDownvote,
    } = this.props;
    const {
      user, userIsDJ, userInWaitlist,
      playlist, nextMedia, showSkip,
      baseEta, mediaEndTime,
      voteStats,
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
              !showSkip && 'FooterBar-responses--spaced',
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

export default enhance(FooterBar);
