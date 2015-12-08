import findIndex from 'array-findindex';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { openLoginModal, openRegisterModal } from '../../actions/LoginActionCreators';
import { togglePlaylistManager } from '../../actions/OverlayActionCreators';
import { joinWaitlist, leaveWaitlist } from '../../actions/WaitlistActionCreators';

import FooterBar from './';

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

function mapStateToProps({ auth, booth, playlists, waitlist }) {
  return {
    eta: booth.media && auth.user
      ? getEta(booth.media, booth.startTime, waitlist.waitlist, auth.user)
      : 0,
    playlist: playlists.playlists[playlists.activePlaylistID],
    nextMedia: playlists.activeMedia[0],
    user: auth.user,
    userInWaitlist: waitlist.waitlist.some(wl => wl._id === auth.user._id)
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
