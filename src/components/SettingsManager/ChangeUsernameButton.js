import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import PromptDialog from '../Dialogs/PromptDialog';
import DialogCloseAnimation from '../DialogCloseAnimation';

const changeNameButtonStyle = {
  padding: 2,
  height: 28,
  width: 28,
  marginLeft: 5,
  verticalAlign: 'bottom'
};

const changeNameIconStyle = {
  width: 24,
  height: 24,
  padding: 2
};

class ChangeUsernameButton extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onChangeUsername: PropTypes.func.isRequired,
    initialUsername: PropTypes.string
  };

  state = {
    changingUsername: false
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
      <span>
        <IconButton
          style={changeNameButtonStyle}
          iconStyle={changeNameIconStyle}
          onClick={this.handleOpen}
        >
          <EditIcon
            color="#777"
            hoverColor="#fff"
          />
        </IconButton>
        <DialogCloseAnimation delay={450}>
          {this.state.changingUsername && (
            <PromptDialog
              title={t('settings.profile.username.change')}
              submitLabel={t('settings.profile.username.save')}
              icon={<EditIcon color="#777" />}
              value={initialUsername}
              onSubmit={this.handleSubmit}
              onCancel={this.handleClose}
            />
          )}
        </DialogCloseAnimation>
      </span>
    );
  }
}

export default translate()(ChangeUsernameButton);
