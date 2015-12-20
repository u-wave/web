import findIndex from 'array-findindex';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { openLoginModal, openRegisterModal } from '../../actions/LoginActionCreators';
import { togglePlaylistManager } from '../../actions/OverlayActionCreators';
import { joinWaitlist, leaveWaitlist } from '../../actions/WaitlistActionCreators';

import FooterBar from './';

function getRemaining(current, currentTime, startTime) {
  const duration = current.end - current.start; // seconds
  const elapsed = (currentTime - startTime) / 1000; // ms → seconds
  return duration - elapsed;
}

function getEta(current, currentTime, startTime, waitlist, user) {
  const averagePlayDuration = 4 * 60;
  let position = user ? findIndex(waitlist, wlId => wlId === user._id) : -1;
  if (position === -1) {
    position = waitlist.length;
  }
  return position * averagePlayDuration + (current ? getRemaining(current, currentTime, startTime) : 0);
}

function mapStateToProps({ auth, booth, playlists, time, waitlist }) {
  const user = auth.user;
  return {
    eta: booth.media && auth.user
      ? getEta(booth.media, time, booth.startTime, waitlist.waitlist, user)
      : 0,
    playlist: playlists.playlists[playlists.activePlaylistID],
    nextMedia: playlists.activeMedia[0],
    user,
    userInWaitlist: user
      ? waitlist.waitlist.some(wlId => wlId === user._id) ||
        !!booth.djID && booth.djID === user._id
      : false
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    joinWaitlist, leaveWaitlist,
    openLoginModal, openRegisterModal,
    togglePlaylistManager
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class FooterBarContainer extends React.Component {
  render() {
    return <FooterBar {...this.props} />;
  }
}
