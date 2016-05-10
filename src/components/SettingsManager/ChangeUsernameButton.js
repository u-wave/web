import * as React from 'react';
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

export default class ChangeUsernameButton extends React.Component {
  static propTypes = {
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
    return (
      <IconButton
        style={changeNameButtonStyle}
        iconStyle={changeNameIconStyle}
        onClick={this.handleOpen}
      >
        <EditIcon
          color="#777"
          hoverColor="#fff"
        />
        {this.state.changingUsername && (
          <PromptDialog
            title="Change Username"
            submitLabel="Save"
            icon={<EditIcon color="#777" />}
            value={this.props.initialUsername}
            onSubmit={this.handleSubmit}
            onCancel={this.handleClose}
          />
        )}
      </IconButton>
    );
  }
}
