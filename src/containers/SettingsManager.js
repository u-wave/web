import React from 'react';
import { connect } from 'react-redux';
import { changeLanguage } from '../actions/LocaleActionCreators';
import { logout } from '../actions/LoginActionCreators';
import { changeUsername } from '../reducers/auth';
import createLazyOverlay from '../components/LazyOverlay';

function changeAndSaveLanguage(language) {
  return (dispatch) => {
    Promise.resolve(dispatch(changeLanguage(language)));
  };
}

const mapDispatchToProps = {
  onChangeUsername: changeUsername,
  onChangeLanguage: changeAndSaveLanguage,
  onLogout: logout,
};

const enhance = connect(mapDispatchToProps);

const SettingsManager = createLazyOverlay({
  Component: React.lazy(() => import('../components/SettingsManager')),
  title: (t) => t('settings.title'),
});

export default enhance(SettingsManager);
