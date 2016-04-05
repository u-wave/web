import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import LockedIcon from 'material-ui/lib/svg-icons/action/lock';
import SkipIcon from 'material-ui/lib/svg-icons/av/skip-next';

import NextMedia from './NextMedia';
import UserInfo from './UserInfo';
import ResponseBar from './Responses/Bar';

const fullSize = {
  height: '100%',
  width: '100%'
};

const inlineIconStyle = {
  width: '1em',
  height: '1em'
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
  }

  handleLeaveWaitlist() {
    if (this.props.userIsDJ) {
      return this.props.onSkipTurn({ remove: true });
    } else if (this.props.user) {
      return this.props.leaveWaitlist(this.props.user);
    }
  }

  renderSkipButton() {
    if (!this.props.showSkip) {
      return null;
    }
    let message = 'Skip your turn';
    if (!this.props.userIsDJ) {
      message = `Skip ${this.props.currentDJ.username}'s turn`;
    }

    return (
      <div className="FooterBar-skip">
        <IconButton
          tooltip={message}
          tooltipPosition="top-center"
          style={fullSize}
          onClick={this.handleSkipTurn}
        >
          <SkipIcon />
        </IconButton>
      </div>
    );
  }

  renderWaitlistButton() {
    const { muiTheme } = this.context;
    const { rawTheme } = muiTheme;
    const { userInWaitlist, waitlistIsLocked } = this.props;

    let icon;
    if (waitlistIsLocked) {
      const iconColor =
        // The user can still leave the waitlist, if it's locked…
        userInWaitlist ? muiTheme.flatButton.textColor :
        // …but cannot join the waitlist.
        muiTheme.flatButton.disabledTextColor;
      icon = (
        <LockedIcon
          style={inlineIconStyle}
          color={iconColor}
        />
      );
    }

    return (
      <FlatButton
        className={cx('FooterBar-join', waitlistIsLocked && 'FooterBar-join--locked')}
        disabled={waitlistIsLocked && !userInWaitlist}
        onClick={userInWaitlist ? this.handleLeaveWaitlist : this.handleJoinWaitlist}
        backgroundColor={rawTheme.palette.primary1Color}
        hoverColor={rawTheme.palette.primary2Color}
        rippleColor={rawTheme.palette.primary3Color}
      >
        {icon}
        {waitlistIsLocked && ' '}
        {userInWaitlist ? 'Leave Waitlist' : 'Join Waitlist'}
      </FlatButton>
    );
  }

  render() {
    const {
      openLoginDialog, openRegisterDialog,
      togglePlaylistManager, toggleSettings,
      onFavorite, onUpvote, onDownvote
    } = this.props;
    const {
      user, userIsDJ,
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
          {this.renderSkipButton()}
          {this.renderWaitlistButton()}
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
