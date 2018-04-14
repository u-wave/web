import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  set as setSetting,
  setLanguage,
} from '../actions/SettingsActionCreators';
import { doChangeUsername } from '../actions/UserActionCreators';
import { logout } from '../actions/LoginActionCreators';
import { currentUserSelector } from '../selectors/userSelectors';
import { settingsSelector } from '../selectors/settingSelectors';
import createLazyOverlay from '../components/LazyOverlay';

const mapStateToProps = createStructuredSelector({
  settings: settingsSelector,
  user: currentUserSelector,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onSettingChange: setSetting,
  onChangeUsername: doChangeUsername,
  onChangeLanguage: setLanguage,
  onLogout: logout,
}, dispatch);

const enhance = connect(mapStateToProps, mapDispatchToProps);

const SettingsManager = createLazyOverlay({
  loader: () => import('../components/SettingsManager' /* webpackChunkName: "settings" */),
  title: t => t('settings.title'),
});

export default enhance(SettingsManager);
