import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AvatarDialog from '../AvatarDialog';
import DialogCloseAnimation from '../DialogCloseAnimation';

class ChangeAvatarButton extends React.Component {
  static propTypes = {
    onChangeAvatar: PropTypes.func.isRequired,
    user: PropTypes.string,
  };

  state = {
    changingAvatar: false,
  };

  handleOpen = () => {
    this.setState({ changingAvatar: true });
  };

  handleChange = (user, avatar) => {
    const { onChangeAvatar } = this.props;

    onChangeAvatar(user, avatar);
  };

  handleClose = () => {
    this.setState({ changingAvatar: false });
  };

  render() {
    const { user } = this.props;
    const { changingAvatar } = this.state;

    return (
      <React.Fragment>
        <IconButton className="ChangeAvatarButton" onClick={this.handleOpen}>
          <EditIcon className="ChangeAvatarButton-icon" />
        </IconButton>
        <DialogCloseAnimation delay={450}>
          {changingAvatar ? (
            <AvatarDialog
              open
              user={user}
              onChangeAvatar={this.handleChange}
              onClose={this.handleClose}
            />
          ) : null}
        </DialogCloseAnimation>
      </React.Fragment>
    );
  }
}

export default ChangeAvatarButton;
