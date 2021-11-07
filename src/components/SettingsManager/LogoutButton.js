import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/PowerSettingsNew';
import ConfirmDialog from '../Dialogs/ConfirmDialog';
import FormGroup from '../Form/Group';

const enhance = translate();

class LogoutButton extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
  }

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
      <>
        <Button color="inherit" className="LogoutButton" onClick={this.handleOpen}>
          <LogoutIcon className="LogoutButton-icon" />
          {t('settings.logout')}
        </Button>
        {showDialog && (
          <ConfirmDialog
            title=""
            confirmLabel={t('dialogs.logout.action')}
            onConfirm={this.handleConfirm}
            onCancel={this.handleClose}
          >
            <FormGroup>{t('dialogs.logout.confirm')}</FormGroup>
          </ConfirmDialog>
        )}
      </>
    );
  }
}

export default enhance(LogoutButton);
