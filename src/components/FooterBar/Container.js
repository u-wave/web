import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openLoginModal, openRegisterModal } from '../../actions/LoginActionCreators';
import { togglePlaylistManager } from '../../actions/OverlayActionCreators';
import { joinWaitlist, leaveWaitlist } from '../../actions/WaitlistActionCreators';

import FooterBar from './';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    openLoginModal, openRegisterModal,
    joinWaitlist, leaveWaitlist,
    ...bindActionCreators({
      togglePlaylistManager
    }, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class FooterBarContainer extends React.Component {
  render() {
    return <FooterBar {...this.props} />;
  }
}
