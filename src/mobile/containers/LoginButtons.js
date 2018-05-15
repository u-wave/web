import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Button from '@material-ui/core/Button';

import {
  openLoginDialog,
  openRegisterDialog,
} from '../../actions/DialogActionCreators';

const mapDispatchToProps = dispatch => bindActionCreators({
  onLogin: openLoginDialog,
  onRegister: openRegisterDialog,
}, dispatch);

const enhance = compose(
  translate(),
  connect(undefined, mapDispatchToProps),
);

const buttonStyle = {
  height: '100%',
  fontSize: '11pt',
  textTransform: 'uppercase',
  width: '50%',
};

const LoginButtons = ({
  t,
  onLogin,
  onRegister,
}) => (
  <span style={{ display: 'flex', justifyContent: 'stretch', height: '100%' }}>
    <Button
      variant="raised"
      color="primary"
      onClick={onLogin}
      style={buttonStyle}
    >
      {t('login.login')}
    </Button>
    <Button
      onClick={onRegister}
      style={buttonStyle}
    >
      {t('login.register')}
    </Button>
  </span>
);

LoginButtons.propTypes = {
  t: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default enhance(LoginButtons);
