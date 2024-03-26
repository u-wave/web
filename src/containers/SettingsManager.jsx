import PropTypes from 'prop-types';
import { lazy, useCallback } from 'react';
import { changeLanguage } from '../actions/LocaleActionCreators';
import { changeUsername, logout } from '../reducers/auth';
import { useDispatch } from '../hooks/useRedux';
import createLazyOverlay from '../components/LazyOverlay';

const SettingsManager = createLazyOverlay({
  Component: lazy(() => import('../components/SettingsManager')),
  title: (t) => t('settings.title'),
});

function SettingsManagerContainer({ onCloseOverlay }) {
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
      onCloseOverlay={onCloseOverlay}
      onChangeUsername={onChangeUsername}
      onChangeLanguage={onChangeLanguage}
      onLogout={onLogout}
    />
  );
}

SettingsManagerContainer.propTypes = {
  onCloseOverlay: PropTypes.func.isRequired,
};

export default SettingsManagerContainer;
