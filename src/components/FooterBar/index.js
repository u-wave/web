import cx from 'classnames';
import findIndex from 'array-findindex';
import React from 'react';
import { openLoginModal, openRegisterModal } from '../../actions/LoginActionCreators';
import { togglePlaylistManager } from '../../actions/OverlayActionCreators';
import { joinWaitlist, leaveWaitlist } from '../../actions/WaitlistActionCreators';
import CurrentMediaStore from '../../stores/CurrentMediaStore';
import LoginStore from '../../stores/LoginStore';
import PlaylistStore from '../../stores/PlaylistStore';
import WaitlistStore from '../../stores/WaitlistStore';
import listen from '../../utils/listen';
import NextMedia from './NextMedia';
import UserInfo from './UserInfo';

function getState() {
  return {
    playlist: PlaylistStore.getActivePlaylist(),
    nextMedia: PlaylistStore.getNextMedia(),
    user: LoginStore.getUser(),
    current: CurrentMediaStore.getMedia(),
    currentStartTime: CurrentMediaStore.getStartTime(),
    waitlist: WaitlistStore.getUsers(),
    inWaitlist: WaitlistStore.isInWaitlist(LoginStore.getUser())
  };
}

function getRemaining(current, startTime) {
  const duration = current.end - current.start; // seconds
  const elapsed = (Date.now() - startTime) / 1000; // ms → seconds
  return duration - elapsed;
}

function getEta(current, startTime, waitlist, user) {
  const averagePlayDuration = 4 * 60;
  let position = user ? findIndex(waitlist, waiting => waiting._id === user._id) : -1;
  if (position === -1) {
    position = waitlist.length;
  }
  return position * averagePlayDuration + (current ? getRemaining(current, startTime) : 0);
}

@listen(CurrentMediaStore, PlaylistStore, LoginStore, WaitlistStore)
export default class FooterBar extends React.Component {
  static propTypes = {
    className: React.PropTypes.string
  };

  state = getState();

  onChange() {
    this.setState(getState());
  }

  render() {
    const { current, currentStartTime, user, playlist, nextMedia, inWaitlist, waitlist } = this.state;
    const className = cx('FooterBar', this.props.className);

    const waitlistAction = inWaitlist ? leaveWaitlist : joinWaitlist;
    const waitlistText = inWaitlist ? 'Leave Waitlist' : 'Join Waitlist';
    const eta = getEta(current, currentStartTime, waitlist, user);

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
            onClick={waitlistAction}
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
          onClick={openLoginModal}
        >
          SIGN IN
        </button>
        <button
          className="FooterAuthButton FooterAuthButton--register"
          onClick={openRegisterModal}
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
