import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Button from '@material-ui/core/Button';
import SettingsButton from './SettingsButton';
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
    const {
      showSkip, userIsDJ, onModSkip, onSkipTurn,
    } = this.props;

    if (!showSkip) {
      return null;
    }
    if (!userIsDJ) {
      return onModSkip(reason);
    }
    return onSkipTurn({ remove: false });
  }

  handleJoinWaitlist = () => {
    const { user, joinWaitlist } = this.props;

    if (user) {
      return joinWaitlist(user);
    }
    return null;
  }

  handleLeaveWaitlist = () => {
    const {
      user, userIsDJ, onSkipTurn, leaveWaitlist,
    } = this.props;

    if (userIsDJ) {
      return onSkipTurn({ remove: true });
    }
    if (user) {
      return leaveWaitlist(user);
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
      currentDJ, waitlistIsLocked,
      playlist, nextMedia, showSkip,
      baseEta, mediaEndTime,
      voteStats,
      className,
    } = this.props;

    if (user && !user.isGuest) {
      const canVote = !userIsDJ && !!currentDJ;
      return (
        <div className={cx('FooterBar', className)}>
          <div className="FooterBar-user">
            <UserInfo
              user={user}
              onClick={toggleSettings}
            />
          </div>
          <button
            type="button"
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
          {showSkip && (
            <div className="FooterBar-skip">
              <SkipButton
                userIsDJ={userIsDJ}
                currentDJ={currentDJ}
                onSkip={this.handleSkipTurn}
              />
            </div>
          )}
          <div className="FooterBar-join">
            <WaitlistButton
              isLocked={waitlistIsLocked}
              userInWaitlist={userInWaitlist}
              onClick={userInWaitlist ? this.handleLeaveWaitlist : this.handleJoinWaitlist}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={cx('FooterBar', className)}>
        <SettingsButton onClick={toggleSettings} />
        <div className="FooterBar-guest">
          {t('login.message')}
        </div>
        <Button
          variant="raised"
          color="primary"
          className="FooterAuthButton FooterAuthButton--login"
          onClick={openLoginDialog}
        >
          {t('login.login').toUpperCase()}
        </Button>
        <Button
          variant="raised"
          color="primary"
          className="FooterAuthButton FooterAuthButton--register"
          onClick={openRegisterDialog}
        >
          {t('login.register').toUpperCase()}
        </Button>
      </div>
    );
  }
}

export default enhance(FooterBar);
