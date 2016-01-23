import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import EditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';

import Avatar from '../Avatar';

export default class Profile extends Component {
  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired,

    onChangeUsername: PropTypes.func.isRequired
  };

  handleNameChange() {
    const newName = prompt('Name?');
    if (newName) {
      this.props.onChangeUsername(newName);
    }
  }

  render() {
    const { className, user } = this.props;
    return (
      <div className={cx('SettingsPanelProfile', className)}>
        <Avatar
          className="SettingsPanelProfile-avatar"
          user={user}
        />
        <h2>
          {user.username}
          <IconButton
            onClick={::this.handleNameChange}
          >
            <EditIcon />
          </IconButton>
        </h2>
      </div>
    );
  }
}
