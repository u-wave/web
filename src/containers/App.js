/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { closeAll } from '../actions/OverlayActionCreators';
import { inputMessage } from '../actions/ChatActionCreators';

import { currentUserSelector } from '../selectors/userSelectors';
import { settingsSelector, muiThemeSelector } from '../selectors/settingSelectors';
import App from '../components/App';

const mapStateToProps = createStructuredSelector({
  activeOverlay: state => state.activeOverlay,
  settings: settingsSelector,
  user: currentUserSelector,
  muiTheme: muiThemeSelector
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendChatMessage: inputMessage,
    onCloseOverlay: closeAll
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends Component {
  static propTypes = {
    muiTheme: PropTypes.object
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <App {...this.props} />
      </MuiThemeProvider>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
