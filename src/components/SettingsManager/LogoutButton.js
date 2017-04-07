import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import FlatButton from 'material-ui/FlatButton';
import LogoutIcon from 'material-ui/svg-icons/action/power-settings-new';
import ConfirmDialog from '../Dialogs/ConfirmDialog';
import FormGroup from '../Form/Group';

class LogoutButton extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
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
    const { t } = this.props;
    return (
      <FlatButton
        label={t('settings.logout')}
        labelPosition="after"
        icon={<LogoutIcon />}
        onClick={this.handleOpen}
      >
        {this.state.loggingOut && (
          <ConfirmDialog
            title={t('dialogs.logout.title')}
            confirmLabel={t('dialogs.logout.action')}
            onConfirm={this.handleConfirm}
            onCancel={this.handleClose}
          >
            <FormGroup>{t('dialogs.logout.confirm')}</FormGroup>
          </ConfirmDialog>
        )}
      </FlatButton>
    );
  }
}

export default translate()(LogoutButton);
