import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from '@u-wave/react-translate';
import compose from 'recompose/compose';
import { loginWithGoogle } from '../../../actions/LoginActionCreators';

const enhance = compose(
  connect(null, {
    onGoogleClick: loginWithGoogle,
  }),
  translate(),
);

const GoogleButton = React.lazy(() => (
  import('react-google-button' /* webpackChunkName: "googleButton" */)
));
const loadingGoogleButton = <div style={{ height: 50 }} />;

const SocialLogin = ({ t, onGoogleClick }) => (
  <React.Suspense fallback={loadingGoogleButton}>
    <GoogleButton
      style={{ width: '100%' }}
      label={t('login.social.loginWithGoogle')}
      onClick={onGoogleClick}
    />
  </React.Suspense>
);

SocialLogin.propTypes = {
  t: PropTypes.func.isRequired,
  onGoogleClick: PropTypes.func.isRequired,
};

export default enhance(SocialLogin);
