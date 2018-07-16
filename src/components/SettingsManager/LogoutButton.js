import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Button from '@material-ui/core/Button';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import ConfirmDialog from '../Dialogs/ConfirmDialog';
import FormGroup from '../Form/Group';

const enhance = translate();

class LogoutButton extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
  };

  state = {
    showDialog: false,
  };

  handleOpen = () => {
    this.setState({ showDialog: true });
  };

  handleClose = () => {
    this.closeDialog();
  };

  handleConfirm = () => {
    const { onLogout } = this.props;

    onLogout();
    this.closeDialog();
  };

  closeDialog() {
    this.setState({ showDialog: false });
  }

  render() {
    const { t } = this.props;
    const { showDialog } = this.state;

    return (
      <React.Fragment>
        <Button className="LogoutButton" onClick={this.handleOpen}>
          <LogoutIcon className="LogoutButton-icon" />
          {t('settings.logout')}
        </Button>
        {showDialog && (
          <ConfirmDialog
            title={t('dialogs.logout.title')}
            confirmLabel={t('dialogs.logout.action')}
            onConfirm={this.handleConfirm}
            onCancel={this.handleClose}
          >
            <FormGroup>{t('dialogs.logout.confirm')}</FormGroup>
          </ConfirmDialog>
        )}
      </React.Fragment>
    );
  }
}

export default enhance(LogoutButton);
