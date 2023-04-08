import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  set as setSetting,
  setLanguage,
} from '../reducers/settings';
import { changeLanguage } from '../actions/LocaleActionCreators';
import { logout } from '../actions/LoginActionCreators';
import { changeUsername } from '../reducers/auth';
import { currentUserSelector } from '../selectors/userSelectors';
import { settingsSelector } from '../selectors/settingSelectors';
import createLazyOverlay from '../components/LazyOverlay';

function changeAndSaveLanguage(language) {
  return (dispatch) => {
    Promise.resolve(dispatch(changeLanguage(language)))
      .then(() => {
        dispatch(setLanguage(language));
      });
  };
}

const mapStateToProps = createStructuredSelector({
  settings: settingsSelector,
  user: currentUserSelector,
});

const mapDispatchToProps = {
  onSettingChange: setSetting,
  onChangeUsername: changeUsername,
  onChangeLanguage: changeAndSaveLanguage,
  onLogout: logout,
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

const SettingsManager = createLazyOverlay({
  Component: React.lazy(() => import('../components/SettingsManager')),
  title: (t) => t('settings.title'),
});

export default enhance(SettingsManager);
