import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleButton from 'react-google-button';
import { loginWithGoogle } from '../../../actions/LoginActionCreators';

const enhance = connect(null, {
  onGoogleClick: loginWithGoogle
});

const SocialLogin = ({ onGoogleClick }) => (
  <GoogleButton
    style={{ width: '100%' }}
    onClick={onGoogleClick}
  />
);

SocialLogin.propTypes = {
  onGoogleClick: PropTypes.func.isRequired
};

export default enhance(SocialLogin);
