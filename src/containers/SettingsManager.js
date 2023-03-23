import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
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
  onChangeUsername: doChangeUsername,
  onChangeLanguage: changeAndSaveLanguage,
  onLogout: logout,
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

const SettingsManager = createLazyOverlay({
  Component: React.lazy(() => import('../components/SettingsManager')),
  title: (t) => t('settings.title'),
});

export default enhance(SettingsManager);
