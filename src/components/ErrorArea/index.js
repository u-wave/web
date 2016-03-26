import * as React from 'react';
import Snackbar from 'material-ui/lib/snackbar';
import muiThemeable from 'material-ui/lib/muiThemeable';
import { createSelector } from 'reselect';

const wrapperStyle = {
  // Prevent clicks from hitting the overlay. Ensures the chat input can be
  // focused even if a snackbar is open.
  pointerEvents: 'none'
};
const snackbarStyle = {
  // Allow multiline snackbars.
  height: 'auto',
  lineHeight: '24px',
  padding: '12px 24px',
  // Allow clicks on snackbars themselves.
  pointerEvents: 'initial'
};

// Create a material-ui theme with the error notification theme applied.
// Using a selector for memoization.
const errorThemeSelector = createSelector(
  props => props.muiTheme,
  muiTheme => {
    const notifyTheme = muiTheme.rawTheme.palette.notifications;
    return {
      muiTheme: {
        ...muiTheme,
        snackbar: {
          ...muiTheme.snackbar,
          textColor: notifyTheme.errorTextColor,
          backgroundColor: notifyTheme.errorBackgroundColor
        }
      }
    };
  }
);

@muiThemeable
export default class ErrorArea extends React.Component {
  static propTypes = {
    error: React.PropTypes.string,
    onDismiss: React.PropTypes.func.isRequired,
    muiTheme: React.PropTypes.object.isRequired
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  getChildContext() {
    return errorThemeSelector(this.props);
  }

  onDismiss = (...args) => {
    this.props.onDismiss(...args);
  };

  render() {
    const { error } = this.props;

    return (
      <div className="ErrorArea">
        <Snackbar
          style={wrapperStyle}
          bodyStyle={snackbarStyle}
          open={!!error}
          message={error || ''}
          onRequestClose={this.onDismiss}
        />
      </div>
    );
  }
}
