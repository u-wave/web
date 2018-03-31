import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import IconButton from 'material-ui-next/IconButton'; // eslint-disable-line
import EditIcon from 'material-ui-icons/ModeEdit';
import PromptDialog from '../Dialogs/PromptDialog';
import DialogCloseAnimation from '../DialogCloseAnimation';

const changeNameIconStyle = {
  width: 24,
  height: 24,
  padding: 2,
};

const enhance = translate();

class ChangeUsernameButton extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onChangeUsername: PropTypes.func.isRequired,
    initialUsername: PropTypes.string,
  };

  state = {
    changingUsername: false,
  };

  closeDialog() {
    this.setState({ changingUsername: false });
  }

  handleOpen = () => {
    this.setState({ changingUsername: true });
  };

  handleClose = () => {
    this.closeDialog();
  };

  handleSubmit = (name) => {
    if (name === this.props.initialUsername) {
      this.closeDialog();
      return null;
    }
    return this.props.onChangeUsername(name)
      .then(this.closeDialog.bind(this));
  };

  render() {
    const { t, initialUsername } = this.props;
    return (
      <React.Fragment>
        <IconButton
          className="ChangeUsernameButton"
          iconStyle={changeNameIconStyle}
          onClick={this.handleOpen}
        >
          <EditIcon className="ChangeUsernameButton-icon" />
        </IconButton>
        <DialogCloseAnimation delay={450}>
          {this.state.changingUsername && (
            <PromptDialog
              title={t('settings.profile.username.change')}
              submitLabel={t('settings.profile.username.save')}
              icon={<EditIcon nativeColor="#777" />}
              value={initialUsername}
              onSubmit={this.handleSubmit}
              onCancel={this.handleClose}
            />
          )}
        </DialogCloseAnimation>
      </React.Fragment>
    );
  }
}

export default enhance(ChangeUsernameButton);
