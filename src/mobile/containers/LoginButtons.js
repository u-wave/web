import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import FlatButton from 'material-ui/FlatButton';

import {
  openLoginDialog,
  openRegisterDialog,
} from '../../actions/DialogActionCreators';

const buttonStyle = {
  height: '100%',
  fontSize: '11pt',
  textTransform: 'uppercase',
  width: '50%',
};

const LoginButtons = ({
  muiTheme,
  t,
  onLogin,
  onRegister,
}) => (
  <span style={{ display: 'flex', justifyContent: 'stretch', height: '100%' }}>
    <FlatButton
      onClick={onLogin}
      backgroundColor={muiTheme.palette.primary1Color}
      hoverColor={muiTheme.palette.primary2Color}
      rippleColor={muiTheme.palette.primary3Color}
      style={buttonStyle}
    >
      {t('login.login')}
    </FlatButton>
    <FlatButton
      onClick={onRegister}
      style={buttonStyle}
    >
      {t('login.register')}
    </FlatButton>
  </span>
);

LoginButtons.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  onLogin: openLoginDialog,
  onRegister: openRegisterDialog,
}, dispatch);

export default compose(
  muiThemeable(),
  translate(),
  connect(undefined, mapDispatchToProps),
)(LoginButtons);
