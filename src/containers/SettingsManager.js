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

const mapStateToProps = createStructuredSelector({
  settings: settingsSelector,
  user: currentUserSelector,
});

const mapDispatchToProps = {
  onSettingChange: setSetting,
  onChangeUsername: doChangeUsername,
  onChangeLanguage: (...args) => d => Promise.all([
    d(setLanguage(...args)),
    d(changeLanguage(...args)),
  ]),
  onLogout: logout,
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

const SettingsManager = createLazyOverlay({
  loader: () => import('../components/SettingsManager' /* webpackChunkName: "settings" */),
  title: t => t('settings.title'),
});

export default enhance(SettingsManager);
