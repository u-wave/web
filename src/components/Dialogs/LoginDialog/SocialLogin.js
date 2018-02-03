import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// TODO Remove the /lib part—see https://github.com/prescottprue/react-google-button/pull/11
import GoogleButton from 'react-google-button/lib';
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
