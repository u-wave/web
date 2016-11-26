import * as React from 'react';
import { translate } from 'react-i18next';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import PromptDialog from '../Dialogs/PromptDialog';

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
    t: React.PropTypes.func.isRequired,
    onChangeUsername: React.PropTypes.func.isRequired,
    initialUsername: React.PropTypes.string
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

  handleSubmit = name =>
    this.props.onChangeUsername(name)
      .then(this.closeDialog.bind(this));

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
      </span>
    );
  }
}

export default translate()(ChangeUsernameButton);
