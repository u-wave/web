import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import nest from 'recompose/nest';
import {
  set as setSetting,
  setLanguage
} from '../actions/SettingsActionCreators';
import { doChangeUsername } from '../actions/UserActionCreators';
import { logout } from '../actions/LoginActionCreators';
import { currentUserSelector } from '../selectors/userSelectors';
import { settingsSelector } from '../selectors/settingSelectors';
import Overlay from '../components/Overlay';
import SettingsManager from '../components/SettingsManager';

const mapStateToProps = createStructuredSelector({
  settings: settingsSelector,
  user: currentUserSelector
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onSettingChange: setSetting,
  onChangeUsername: doChangeUsername,
  onChangeLanguage: setLanguage,
  onLogout: logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(nest(Overlay, SettingsManager));
