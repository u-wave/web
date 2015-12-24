import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, register } from '../actions/LoginActionCreators';

import LoginDialog from '../components/Dialogs/LoginDialog';

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
export default class LoginDialogContainer extends Component {
  render() {
    return <LoginDialog {...this.props} />;
  }
}
