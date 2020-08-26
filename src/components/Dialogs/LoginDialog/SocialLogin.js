import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslator } from '@u-wave/react-translate';
import { loginWithGoogle } from '../../../actions/LoginActionCreators';

const GoogleButton = React.lazy(() => (
  import('react-google-button' /* webpackChunkName: "googleButton" */)
));
const loadingGoogleButton = <div style={{ height: 50 }} />;

function SocialLogin() {
  const { t } = useTranslator();
  const dispatch = useDispatch();

  const googleName = t('login.social.services.google');

  return (
    <React.Suspense fallback={loadingGoogleButton}>
      <GoogleButton
        style={{ width: '100%' }}
        label={t('login.social.loginWith', { service: googleName })}
        onClick={() => dispatch(loginWithGoogle())}
      />
    </React.Suspense>
  );
}

export default React.memo(SocialLogin);
