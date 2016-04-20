/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { closeAll } from '../actions/OverlayActionCreators';
import { inputMessage } from '../actions/ChatActionCreators';

import { currentUserSelector } from '../selectors/userSelectors';
import { settingsSelector, muiThemeSelector } from '../selectors/settingSelectors';
import App from '../components/App';
import MuiTheme from '../components/MuiTheme';

const mapStateToProps = createStructuredSelector({
  activeOverlay: state => state.activeOverlay,
  settings: settingsSelector,
  user: currentUserSelector,
  theme: muiThemeSelector
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
/* eslint-enable react/prefer-stateless-function */
