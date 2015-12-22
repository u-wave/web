import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

import Avatar from '../Avatar';

export default class Profile extends Component {
  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired
  };
  render() {
    const { className, user } = this.props;
    return (
      <div className={cx('SettingsPanelProfile', className)}>
        <Avatar
          className="SettingsPanelProfile-avatar"
          user={user}
        />
      </div>
    );
  }
}
