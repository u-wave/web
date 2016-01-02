import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, register } from '../actions/LoginActionCreators';

import LoginModal from '../components/LoginModal';

const mapStateToProps = state => ({
  error: state.auth.error,
  open: state.auth.modal.open,
  show: state.auth.modal.show
});
const mapDispatchToProps = dispatch => bindActionCreators({
  onLogin: login,
  onRegister: register
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginModalContainer extends Component {
  render() {
    return <LoginModal {...this.props} />;
  }
}
