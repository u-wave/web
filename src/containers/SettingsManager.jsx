import { lazy, useCallback } from 'react';
import { changeLanguage } from '../actions/LocaleActionCreators';
import { logout } from '../actions/LoginActionCreators';
import { changeUsername } from '../reducers/auth';
import { useDispatch } from '../hooks/useRedux';
import createLazyOverlay from '../components/LazyOverlay';

const SettingsManager = createLazyOverlay({
  Component: lazy(() => import('../components/SettingsManager')),
  title: (t) => t('settings.title'),
});

function SettingsManagerContainer() {
  const dispatch = useDispatch();
  const onChangeUsername = useCallback(
    (name) => dispatch(changeUsername(name)),
    [dispatch],
  );
  const onChangeLanguage = useCallback(
    (language) => dispatch(changeLanguage(language)),
    [dispatch],
  );
  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <SettingsManager
      onChangeUsername={onChangeUsername}
      onChangeLanguage={onChangeLanguage}
      onLogout={onLogout}
    />
  );
}

export default SettingsManagerContainer;
