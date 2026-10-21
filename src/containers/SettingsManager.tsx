import { lazy, useCallback } from 'react';
import createLazyOverlay from '../components/LazyOverlay';
import { useDispatch } from '../hooks/useRedux';
import { changeUsername, logout } from '../reducers/auth';

const SettingsManager = createLazyOverlay({
  Component: lazy(() => import('../components/SettingsManager')),
  title: (t) => t('settings.title'),
});

type SettingsManagerContainerProps = {
  onCloseOverlay: () => void,
};
function SettingsManagerContainer({ onCloseOverlay }: SettingsManagerContainerProps) {
  const dispatch = useDispatch();
  const onChangeUsername = useCallback(
    async (name: string) => {
      await dispatch(changeUsername(name));
    },
    [dispatch],
  );
  const onLogout = useCallback(async () => {
    await dispatch(logout());
  }, [dispatch]);

  return (
    <SettingsManager
      onCloseOverlay={onCloseOverlay}
      onChangeUsername={onChangeUsername}
      onLogout={onLogout}
    />
  );
}

export default SettingsManagerContainer;
