import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, register } from '../actions/LoginActionCreators';

import LoginDialog from '../components/Dialogs/LoginDialog';

const mapStateToProps = ({ dialogs, auth }) => ({
  ...dialogs.login.payload,
  error: auth.error,
  open: dialogs.login.open
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
