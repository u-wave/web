import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import LogoutIcon from 'material-ui/svg-icons/action/power-settings-new';

import ConfirmDialog from '../Dialogs/ConfirmDialog';
import FormGroup from '../Form/Group';

export default class LogoutButton extends React.Component {
  static propTypes = {
    onLogout: React.PropTypes.func.isRequired
  };

  state = {
    loggingOut: false
  };

  closeDialog() {
    this.setState({ loggingOut: false });
  }

  handleOpen = () => {
    this.setState({ loggingOut: true });
  };

  handleClose = () => {
    this.closeDialog();
  };

  handleConfirm = () =>
    this.props.onLogout()
      .then(this.closeDialog.bind(this));

  render() {
    return (
      <FlatButton
        label="Sign out"
        labelPosition="after"
        icon={<LogoutIcon />}
        onClick={this.handleOpen}
      >
        {this.state.loggingOut && (
          <ConfirmDialog
            confirmLabel="Sign Out"
            onConfirm={this.handleConfirm}
            onCancel={this.handleClose}
          >
            <FormGroup>Are you sure you want to sign out?</FormGroup>
          </ConfirmDialog>
        )}
      </FlatButton>
    );
  }
}
