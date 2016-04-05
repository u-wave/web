import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import EditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';

import Avatar from '../Avatar';

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

export default class Profile extends Component {
  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired,

    onChangeUsername: PropTypes.func.isRequired
  };

  handleNameChange = () => {
    const newName = prompt('Name?');
    if (newName) {
      this.props.onChangeUsername(newName);
    }
  };

  render() {
    const { className, user } = this.props;
    return (
      <div className={cx('SettingsPanelProfile', className)}>
        <Avatar
          className="SettingsPanelProfile-avatar"
          user={user}
        />
        <h2 className="SettingsPanelProfile-username">
          {user.username}
          <IconButton
            style={changeNameButtonStyle}
            iconStyle={changeNameIconStyle}
            onClick={this.handleNameChange}
          >
            <EditIcon
              color="#777"
              hoverColor="#fff"
            />
          </IconButton>
        </h2>
      </div>
    );
  }
}
