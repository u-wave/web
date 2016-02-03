import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { closeAll } from '../actions/OverlayActionCreators';
import { selectPanel } from '../actions/PanelSelectActionCreators';
import { inputMessage } from '../actions/ChatActionCreators';

import { sizeSelector, positionSelector } from '../selectors/waitlistSelectors';
import { currentUserSelector } from '../selectors/userSelectors';
import { settingsSelector, muiThemeSelector } from '../selectors/settingSelectors';
import App from '../components/App';
import MuiTheme from '../components/MuiTheme';

const mapStateToProps = createStructuredSelector({
  activeOverlay: state => state.activeOverlay,
  selectedPanel: state => state.selectedPanel,
  settings: settingsSelector,
  user: currentUserSelector,
  theme: muiThemeSelector,
  waitlistPosition: positionSelector,
  waitlistSize: sizeSelector
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPanel,
    sendChatMessage: inputMessage,
    onCloseOverlay: closeAll
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends Component {
  static propTypes = {
    theme: PropTypes.object
  };

  render() {
    return (
      <MuiTheme theme={this.props.theme}>
        <App {...this.props} />
      </MuiTheme>
    );
  }
}
