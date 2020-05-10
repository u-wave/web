import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  set as setSetting,
  setLanguage,
} from '../actions/SettingsActionCreators';
import { changeLanguage } from '../actions/LocaleActionCreators';
import { doChangeUsername } from '../actions/UserActionCreators';
import { logout } from '../actions/LoginActionCreators';
import { currentUserSelector } from '../selectors/userSelectors';
import { settingsSelector } from '../selectors/settingSelectors';
import createLazyOverlay from '../components/LazyOverlay';

const {
  useCallback,
} = React;

const SettingsManager = createLazyOverlay({
  loader: () => import('../components/SettingsManager' /* webpackChunkName: "settings" */),
  title: (t) => t('settings.title'),
});

function SettingsManagerContainer() {
  const settings = useSelector(settingsSelector);
  const user = useSelector(currentUserSelector);
  const dispatch = useDispatch();

  const onSettingChange = useCallback((name, value) => dispatch(setSetting(name, value)), []);
  const onChangeUsername = useCallback((username) => dispatch(doChangeUsername(username)), []);
  const onChangeLanguage = useCallback((language) => (
    Promise.resolve(dispatch(changeLanguage(language))).then(() => {
      dispatch(setLanguage(language));
    })
  ), []);
  const onLogout = useCallback(() => dispatch(logout()), []);

  return (
    <SettingsManager
      settings={settings}
      user={user}
      onSettingChange={onSettingChange}
      onChangeUsername={onChangeUsername}
      onChangeLanguage={onChangeLanguage}
      onLogout={onLogout}
    />
  );
}

export default SettingsManagerContainer;
