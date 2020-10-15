import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslator } from '@u-wave/react-translate';
import { loginWithGoogle } from '../../../actions/LoginActionCreators';

const GoogleButton = React.lazy(() => (
  import('react-google-button')
));
const loadingGoogleButton = <div style={{ height: 50 }} />;

function SocialLogin() {
  const { t } = useTranslator();
  const dispatch = useDispatch();

  return (
    <React.Suspense fallback={loadingGoogleButton}>
      <GoogleButton
        style={{ width: '100%' }}
        label={t('login.social.loginWithGoogle')}
        onClick={() => dispatch(loginWithGoogle())}
      />
    </React.Suspense>
  );
}

export default React.memo(SocialLogin);
