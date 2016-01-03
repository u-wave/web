import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { openLoginModal, openRegisterModal } from '../actions/LoginActionCreators';
import { togglePlaylistManager } from '../actions/OverlayActionCreators';
import { joinWaitlist, leaveWaitlist } from '../actions/WaitlistActionCreators';

import { activePlaylistSelector, nextMediaSelector } from '../selectors/playlistSelectors';
import { currentUserSelector } from '../selectors/userSelectors';
import { etaSelector, userInWaitlistSelector } from '../selectors/waitlistSelectors';
import FooterBar from '../components/FooterBar';

const mapStateToProps = createStructuredSelector({
  eta: etaSelector,
  playlist: activePlaylistSelector,
  nextMedia: nextMediaSelector,
  user: currentUserSelector,
  userInWaitlist: userInWaitlistSelector
});

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
