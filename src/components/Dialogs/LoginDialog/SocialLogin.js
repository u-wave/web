import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import GoogleButton from 'react-google-button';
import { loginWithGoogle } from '../../../actions/LoginActionCreators';

const enhance = compose(
  connect(null, {
    onGoogleClick: loginWithGoogle,
  }),
  translate(),
);

const SocialLogin = ({ t, onGoogleClick }) => (
  <GoogleButton
    style={{ width: '100%' }}
    label={t('login.social.loginWithGoogle')}
    onClick={onGoogleClick}
  />
);

SocialLogin.propTypes = {
  t: PropTypes.func.isRequired,
  onGoogleClick: PropTypes.func.isRequired,
};

export default enhance(SocialLogin);
