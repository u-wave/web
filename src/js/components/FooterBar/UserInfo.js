import cx from 'classnames';
import React from 'react';
import Avatar from '../Avatar';

export default class UserInfo extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    user: React.PropTypes.object
  };

  render() {
    return (
      <div className={cx('UserInfo', this.props.className)}>
        <Avatar
          className="UserInfo-avatar"
          user={this.props.user}
        />
      </div>
    );
  }
}
