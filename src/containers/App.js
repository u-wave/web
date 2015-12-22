import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

import { closeAll } from '../actions/OverlayActionCreators';
import { selectPanel } from '../actions/PanelSelectActionCreators';
import { sendChat } from '../actions/ChatActionCreators';
import { set as setSetting } from '../actions/SettingsActionCreators';

import { sizeSelector, positionSelector } from '../selectors/waitlistSelectors';
import { currentUserSelector } from '../selectors/userSelectors';
import { settingsSelector } from '../selectors/settingSelectors';
import MuiTheme from '../MuiTheme';
import App from '../components/App';

const mapStateToProps = createStructuredSelector({
  activeOverlay: state => state.activeOverlay,
  selectedPanel: state => state.selectedPanel,
  settings: settingsSelector,
  user: currentUserSelector,
  waitlistPosition: positionSelector,
  waitlistSize: sizeSelector
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPanel,
    sendChatMessage: sendChat,
    onCloseOverlay: closeAll,
    onSettingChange: setSetting
  }, dispatch);
}

@ThemeDecorator(ThemeManager.getMuiTheme(MuiTheme))
@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends Component {
  static propTypes = {
    activeOverlay: PropTypes.string,
    selectedPanel: PropTypes.string,
    settings: PropTypes.object,
    user: PropTypes.object,

    onCloseOverlay: PropTypes.func,
    onSettingChange: setSetting,
    selectPanel: PropTypes.func,
    sendChatMessage: PropTypes.func
  };

  render() {
    return <App {...this.props} />;
  }
}
