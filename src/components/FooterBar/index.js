import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import NextMedia from './NextMedia';
import UserInfo from './UserInfo';

export default class FooterBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    eta: PropTypes.number,
    nextMedia: PropTypes.object,
    playlist: PropTypes.object,
    user: PropTypes.object,
    userInWaitlist: PropTypes.bool,

    openLoginDialog: PropTypes.func,
    openRegisterDialog: PropTypes.func,
    togglePlaylistManager: PropTypes.func,
    joinWaitlist: PropTypes.func,
    leaveWaitlist: PropTypes.func
  };

  render() {
    const {
      openLoginDialog, openRegisterDialog,
      togglePlaylistManager,
      joinWaitlist, leaveWaitlist
    } = this.props;
    const {
      user, userInWaitlist,
      playlist, nextMedia,
      eta
    } = this.props;
    const className = cx('FooterBar', this.props.className);

    const waitlistAction = userInWaitlist ? leaveWaitlist : joinWaitlist;
    const waitlistText = userInWaitlist ? 'Leave Waitlist' : 'Join Waitlist';

    if (user && !user.isGuest) {
      return (
        <div className={className}>
          <div className="FooterBar-user">
            <UserInfo user={user} />
          </div>
          <div className="FooterBar-next">
            <NextMedia
              playlist={playlist}
              nextMedia={nextMedia}
              eta={eta}
              onClick={togglePlaylistManager}
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
