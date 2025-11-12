import { lazy, Suspense } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import { useDispatch } from '../../../hooks/useRedux';
import { loginWithGoogle } from '../../../actions/LoginActionCreators';

const GoogleButton = lazy(() => import('react-google-button'));
const loadingGoogleButton = <div style={{ height: 50 }} />;

function SocialLogin() {
  const { t } = useTranslator();
  const dispatch = useDispatch();

  return (
    <Suspense fallback={loadingGoogleButton}>
      <GoogleButton
        style={{ width: '100%' }}
        label={t('login.social.loginWithGoogle')}
        onClick={() => dispatch(loginWithGoogle())}
      />
    </Suspense>
  );
}

export default SocialLogin;
