import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { set as setSetting } from '../actions/SettingsActionCreators';
import { doChangeUsername } from '../actions/UserActionCreators';
import { logout } from '../actions/LoginActionCreators';

import { currentUserSelector } from '../selectors/userSelectors';
import { settingsSelector } from '../selectors/settingSelectors';

import SettingsManager from '../components/SettingsManager';

const mapStateToProps = createStructuredSelector({
  settings: settingsSelector,
  user: currentUserSelector
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onSettingChange: setSetting,
  onChangeUsername: doChangeUsername,
  onLogout: logout
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingsManagerContainer extends Component {
  render() {
    return <SettingsManager {...this.props} />;
  }
}
