import * as React from 'react';
import Snackbar from 'material-ui/lib/snackbar';

const snackbarStyle = {
  // Allow multiline snackbars.
  height: 'auto',
  lineHeight: '24px',
  padding: '12px 24px'
};

export default class ErrorArea extends React.Component {
  static propTypes = {
    error: React.PropTypes.string,
    onDismiss: React.PropTypes.func.isRequired
  };

  onDismiss = (...args) => {
    this.props.onDismiss(...args);
  };

  render() {
    const { error } = this.props;

    return (
      <div className="ErrorArea">
        <Snackbar
          bodyStyle={snackbarStyle}
          open={!!error}
          message={error}
          onRequestClose={this.onDismiss}
        />
      </div>
    );
  }
}
